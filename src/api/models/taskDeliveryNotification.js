const client = require('../../db')


const addDeliveryTaskNotification = async data => {
    try {
        let {task_id,company_id,courier_id, message} = data;
        let SQL = 'INSERT INTO delivery_task_notification (task_id,company_id,courier_id, message) VALUES ($1,$2,$3,$4) RETURNING *;';
        let safeValues = [task_id,company_id,courier_id, message];
        let response = await client.query(SQL, safeValues);
        return response.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const getDeliveryTaskNotificationById = async id => {
    try {
        let SQL = 'SELECT * FROM delivery_task_notification WHERE courier_id=$1 OR company_id=$1;'
        let response = await client.query(SQL, [id]);
        return response.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateDeliveryTask = async id =>{
    try {
        let SQL = 'UPDATE delivery_task_notification SET seen=$1 WHERE id=$2 RETURNING *;';
        let response = await client.query(SQL, [true,id])
        return response.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {addDeliveryTaskNotification,getDeliveryTaskNotificationById,updateDeliveryTask};