const client = require('../../db');


const addDeliveryTask = async data => {
    try {
        let {order_id} = data;
        let SQL = 'INSERT INTO delivery_task (order_id) VALUES ($1) RETURNING *;';
        let safeValues = [order_id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
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

const updateDeliveryTaskCompanyId = async (data) => {
    try {
        let {company_id, id} = data;
        let SQL = 'UPDATE delivery_task SET company_id=$1, status=$2 WHERE id=$3 RETURNING*;';
        let safeValues = [company_id, 'assigned', id]
        let result = await client.query(SQL, safeValues);
        return result.rows[0]
    } catch (error) {
       throw new Error(error.message)
    }
}

const updateDeliveryTaskCourierId = async (data) => {
    try {
        let {courier_id, id} = data;
        let SQL = 'UPDATE delivery_task SET courier_id=$1 WHERE id=$2 RETURNING*;';
        let safeValues = [courier_id, id]
        let result = await client.query(SQL, safeValues);
        return result.rows[0]
    } catch (error) {
       throw new Error(error.message)
    }
}

const getDeliveryTaskById = async id =>{
    try {
        let SQL = 'SELECT * FROM delivery_task WHERE id=$1 OR courier_id=$1 OR company_id=$1;';
        let result = await client.query(SQL, [id]);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {addDeliveryTask,getAllDeliveryTasks, updateDeliveryTaskCompanyId,updateDeliveryTaskCourierId, getDeliveryTaskById};