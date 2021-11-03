const client = require('../../db')


const addOrderNotification = async data => {
    try {
        let {receiver_id , order_id, message} = data;
        let SQL = 'INSERT INTO order_notification (receiver_id , order_id, message) VALUES ($1,$2,$3) RETURNING *;'
        let safeValues = [receiver_id , order_id, message];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const getOrderNotification = async id => {
    try {
        let SQL = 'SELECT * FROM order_notification WHERE id=$1;';
        let safeValue = [id]
        let result = await client.query(SQL, safeValue);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const getOrderNotificationByStoreId = async id => {
    try {
        let SQL = 'SELECT * FROM order_notification WHERE receiver_id=$1;';
        let safeValue = [id]
        let result = await client.query(SQL, safeValue);
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {addOrderNotification,getOrderNotification,getOrderNotificationByStoreId}