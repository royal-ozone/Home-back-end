const client = require("../../db");


const addOfferNotification = async data =>{
    try {
        let {receiver_id,message,store_id,offer_id} = data;
        let SQL = "INSERT INTO offer_notification (receiver_id,message,store_id,offer_id) VALUES ($1,$2,$3,$4) RETURNING *;";
        let safeValues = [receiver_id,message,store_id,offer_id];
        let response = await client.query(SQL,safeValues);
        return response.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const getOfferNotificationByStoreId = async id =>{
    try {
        let SQL = "SELECT * FROM offer_notification WHERE store_id=$1;";
        let safeValue = [id]
        let result = await client.query(SQL,safeValue);
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const getAllOfferNotifications = async () =>{
    try {
        let SQL = "SELECT * FROM offer_notification;"
        let result = await client.query(SQL)
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports = {addOfferNotification,getOfferNotificationByStoreId,getAllOfferNotifications}