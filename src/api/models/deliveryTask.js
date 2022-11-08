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

const getUnassignedDeliveryTasks = async ({ offset=0, limit=10 }) => {
    try {
        let SQL = `SELECT  dt.*,a.first_name,a.last_name, a.country, a.city,a.street_name,a.building_number,a.apartment_number,a.region, a.mobile, concat(p.first_name, ' ', p.last_name) as courier_name FROM delivery_task dt inner join new_order neo on neo.id = dt.order_id inner join address a on a.id=neo.address_id left join courier c on c.id = dt.courier_id inner join profile p on p.id =c.profile_id  where dt.status = $1 offset $2 limit $3`
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

const getCompanyUnassignedTasks = async ({id, limit=10, offset=0}) => {
    try {
        let SQL = 'SELECT  dt.*,a.first_name,a.last_name, a.country, a.city,a.street_name,a.building_number,a.apartment_number,a.region, a.mobile FROM delivery_task dt inner join new_order neo on neo.id = dt.order_id inner join address a on a.id=neo.address_id  where dt.company_id =$1 and dt.courier_id isnull LIMIT $2 OFFSET $3;'
        let SQL2 = 'select count(*) from delivery_task where company_id =$1 and courier_id isnull;'
        let { rows} = await client.query(SQL, [id, limit, offset])
        let {rows: rows2} = await client.query(SQL2, [id])
        return {data: rows, count: Number(rows2[0].count)?? 0}
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
    getCompanyUnassignedTasks
};