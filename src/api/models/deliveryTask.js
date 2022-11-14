const client = require('../../db');


const addDeliveryTask = async data => {
    try {
        let { order_id } = data;
        let SQL = 'INSERT INTO delivery_task (order_id) VALUES ($1) RETURNING *;';
        let safeValues = [order_id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const getUnassignedDeliveryTasks = async ({ offset = 0, limit = 10 }) => {
    try {
        let SQL = `SELECT  dt.*,a.first_name,a.last_name, a.country, a.city,a.street_name,a.building_number,a.apartment_number,a.region, a.mobile, concat(p.first_name, ' ', p.last_name) as courier_name, neo.delivery_date FROM delivery_task dt inner join new_order neo on neo.id = dt.order_id inner join address a on a.id=neo.address_id left join courier c on c.id = dt.courier_id left join profile p on p.id =c.profile_id  where dt.status = $1 offset $2 limit $3`
        let SQL2 = 'SELECT count(*) FROM delivery_task where status = $1'
        let safeValues = ['unassigned', offset, limit]
        let { rows } = await client.query(SQL, safeValues)
        let { rows: rows2 } = await client.query(SQL2, ['unassigned'])
        return { data: rows, count: Number(rows2[0].count) ?? 0 }
    } catch (error) {
        throw new Error(error)
    }
}

const getAllDeliveryTasks = async () => {
    try {
        let SQL = 'SELECT * FROM delivery_task;';
        let result = await client.query(SQL)
        return result.rows
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateDeliveryTaskCompanyId = async (company_id, id) => {
    try {
        // let { id } = data;
        let SQL = 'UPDATE delivery_task SET company_id=$1, status=$2, updated=$4 WHERE id=$3 RETURNING*;';
        let safeValues = [company_id, 'assigned', id, new Date()];
        let result = await client.query(SQL, safeValues);
        return result.rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateDeliveryTaskCourierId = async (data) => {
    try {
        let { courier_id, id } = data;
        let SQL = 'UPDATE delivery_task SET courier_id=$1 WHERE id=$2 RETURNING*;';
        let safeValues = [courier_id, id]
        let result = await client.query(SQL, safeValues);
        return result.rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const getDeliveryTaskById = async id => {
    try {
        let SQL = 'SELECT * FROM delivery_task WHERE id=$1 OR courier_id=$1 OR company_id=$1;';
        let result = await client.query(SQL, [id]);
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const getCompanyUnassignedTasks = async ({ id, limit = 10, offset = 0 }) => {
    try {
        let SQL = 'SELECT  dt.*,a.first_name,a.last_name, a.country, a.city,a.street_name,a.building_number,a.apartment_number,a.region, a.mobile, neo.delivery_date FROM delivery_task dt inner join new_order neo on neo.id = dt.order_id inner join address a on a.id=neo.address_id  where dt.company_id =$1 and dt.courier_id isnull LIMIT $2 OFFSET $3;'
        let SQL2 = 'select count(*) from delivery_task where company_id =$1 and courier_id isnull;'
        let { rows } = await client.query(SQL, [id, limit, offset])
        let { rows: rows2 } = await client.query(SQL2, [id])
        return { data: rows, count: Number(rows2[0].count) ?? 0 }
    } catch (error) {
        throw new Error(error)
    }
}

const getOverviewTasks = async ({ id, limit = 10, offset = 0, status, taskStatus, from, to }) => {
    try {
        let safeValues = [id, limit, offset,status??'pending']
        let safeValues2 =[id, status]
        // taskStatus && safeValues.push(taskStatus) && safeValues2.push(taskStatus) 
        let SQL = `SELECT  dt.*,a.first_name,a.last_name, concat(a.first_name, ' ', a.last_name) as customer_name,concat(p.first_name, ' ', p.last_name) as courier_name, a.country, a.city,a.street_name,a.building_number,a.apartment_number,a.region, a.mobile, neo.delivery_date, ct.status as courier_task_status FROM delivery_task dt inner join new_order neo on neo.id = dt.order_id inner join address a on a.id=neo.address_id left join courier c on c.id = dt.courier_id left join profile p on p.id = c.profile_id left join courier_task ct on ct.task_id = dt.id where dt.company_id =$1 and dt.courier_id is not null and ct.status = $4  ${taskStatus ?  `and dt.status = $${safeValues.push(taskStatus)}`: ''} ${from && to ? `and neo.delivery_date between $${safeValues.push(from)} and $${safeValues.push(to)}`: ''} LIMIT $2 OFFSET $3;`
        let SQL2 = `select count(*) from delivery_task dt inner join courier_task ct on ct.task_id = dt.id inner join new_order neo on neo.id= dt.order_id where dt.company_id =$1 and dt.courier_id is not null and ct.status=$2 ${taskStatus ?  `and dt.status = $${safeValues2.push(taskStatus) }`: ''} ${from && to ? `and neo.delivery_date between $${safeValues2.push(from)} and $${safeValues2.push(to)}`: ''}  ;`
        let { rows } = await client.query(SQL, safeValues)
        let { rows: rows2 } = await client.query(SQL2, safeValues2)
        return { data: rows, count: Number(rows2[0].count) ?? 0 }
    } catch (error) {
        throw new Error(error)
    }
}

const bulkReassignCourier =  async data => {
    try {
        const {tasks, courier_id} = data
        let values= tasks.map((task, i) => `$${i+3}`).join(',')
        let SQL = `update courier_task set status=$1, updated_at= $2 where task_id in (${values}) returning *`
        let SQL2 = `update delivery_task set courier_id=$1, updated_at= $2 where id in (${values}) returning *`
        let safeValues = ['canceled',new Date(),...tasks]
        let { rows} = await client.query(SQL,safeValues)
        let {rows: rows2} = await client.query(SQL2, [courier_id,new Date(), ...tasks])
        let courierTasks = rows2.map((t,i) => `($1,$${i+2})`).join(',')
        let SQL3 = `insert into courier_task (courier_id, task_id) values ${courierTasks}`
        let tasksData = rows2.map(d => d.id)
        let { rows: rows3 } = await client.query(SQL3,[courier_id,...tasksData])
        return rows2
    } catch (error) {
        throw new Error(error) 
    }
}
const bulkUpdateDeliveryTaskStatus = async ({tasks, status}) => {
    try {   
        let values= tasks.map((task, i) => `$${i+2}`).join(',')
        // let SQL = `update delivery_task set status=$1 where id in (${values}) returning *`
        let SQL2 = `update courier_task set status=$1 where task_id in (${values}) returning *`
        // let { rows} = await client.query(SQL, [status,...tasks])
        let { rows: rows2} = await client.query(SQL2, [status,...tasks])
        return { courierTasks: rows2}
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    addDeliveryTask,
    getAllDeliveryTasks,
    updateDeliveryTaskCompanyId,
    updateDeliveryTaskCourierId,
    getDeliveryTaskById,
    getUnassignedDeliveryTasks,
    getCompanyUnassignedTasks,
    getOverviewTasks,
    bulkReassignCourier,
    bulkUpdateDeliveryTaskStatus
};