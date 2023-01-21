const client = require('../../db')


const addCourierTask = async data => {
    try {
        let { courier_id, task_id } = data
        let SQL = 'INSERT INTO courier_task (courier_id, task_id) VALUES ($1,$2) RETURNING *;';
        let safeValues = [courier_id, task_id];
        let result = await client.query(SQL, safeValues)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const getAllCourierTasks = async () => {
    try {
        let SQL = 'SELECT * FROM courier_task;'
        let result = await client.query(SQL);
        return result.rows
    } catch (error) {
        throw new Error(error.message)
    }
}

const getCourierTaskById = async id => {
    try {
        let SQL = 'SELECT * FROM courier_task WHERE id=$1 OR courier_id=$1 OR task_id=$1;'
        let result = await client.query(SQL, [id])
        return result.rows
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateCourierTaskStatus = async (data) => {
    try {
        let { id, status } = data;
        let SQL = 'UPDATE courier_task SET status=$1,updated_at=$3 WHERE id=$2 RETURNING *;';
        let safeValues = [status, id, new Date()];
        let result = await client.query(SQL, safeValues);
        return result.rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateCourierTaskCourierId = async (data) => {
    try {
        let { courier_id, id } = data;
        let SQL = 'UPDATE courier_task SET courier_id=$1 WHERE id=$2 RETURNING*;';
        let safeValues = [courier_id, id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const getPendingTasks = async ({ id, limit = 10, offset = 0, status }) => {
    try {
        let SQL = `select ct.*,no2.delivery_date,  concat(a.first_name, ' ', a.last_name) as customer_name, a.country, a.city,a.street_name,a.building_number,a.apartment_number,a.region, a.mobile,a.lat,a.lng from courier_task ct inner join delivery_task dt on dt.id = ct.task_id inner join new_order no2 on dt.order_id =no2.id inner join address a on a.id=no2.address_id  where ct.status=$1 and ct.courier_id=$2 limit $3 offset $4`
        let SQL2 = 'select count(*) from courier_task where status=$1 and courier_id=$2'
        let safeValues = [status, id, limit, offset]
        let { rows } = await client.query(SQL, safeValues)
        let { rows: rows2 } = await client.query(SQL2, [status, id])
        return { data: rows, count: Number(rows2[0].count) ?? 0 }
    } catch (error) {
        throw new Error(error)
    }
}

const getOverviewTasks =async ({status,id, limit=10,offset=0}) => {
    try {
        let SQL = `select ct.*,no2.delivery_date,no2.customer_order_id,  concat(a.first_name, ' ', a.last_name) as customer_name, a.country, a.city,a.street_name,a.building_number,a.apartment_number,a.region, a.mobile,a.lat,a.lng from courier_task ct inner join delivery_task dt on dt.id = ct.task_id inner join new_order no2 on dt.order_id =no2.id inner join address a on a.id=no2.address_id  where ct.status = $1  and ct.courier_id=$2 limit $3 offset $4`
        let SQL2 = 'select count(*) from courier_task where status=$1 and courier_id=$2'
        let safeValues = [status?? 'accepted', id, limit,offset]
        let safeValues2 = [status?? 'accepted', id]
        let { rows } = await client.query(SQL, safeValues)
        let { rows: rows2 } = await client.query(SQL2, safeValues2)
        return { data: rows, count: Number(rows2[0].count) ?? 0 }
    } catch (error) {
        throw new Error(error) 
    }
}




module.exports = {
    addCourierTask,
    getAllCourierTasks,
    getCourierTaskById,
    updateCourierTaskStatus,
    updateCourierTaskCourierId,
    getPendingTasks,
    getOverviewTasks
}