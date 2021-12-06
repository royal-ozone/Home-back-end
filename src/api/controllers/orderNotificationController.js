const {addOrderNotification,getOrderNotification,getOrderNotificationByStoreId} = require('../models/orderNotifications')
const events = require('../../socket/event');


const addOrderNotificationHandler = async (req, res) =>{
    try {
        let result = await addOrderNotification(req.body)
        events.emit('orderNotifications',result)
        res.status(201).send('notification has been created successfully')
    } catch (error) {
        res.status(403).send(error.message);
    }
}

const getOrderNotificationHandler = async (req, res) =>{
    try {
        let result = await getOrderNotification(req.params.id);
        res.status(200).json({
            status: 200,
            result: result,
        })
    } catch (error) {
        res.status(403).send(error.message);
    }
}


const getOrderNotificationByStoreIdHandler = async (req, res) =>{
    try {
        let result = await getOrderNotificationByStoreId(req.user.store_id);
        res.status(200).json({
            status: 200,
            result: result,
        })
    } catch (error) {
        res.status(403).send(error.message);
    }
}

module.exports = {addOrderNotificationHandler,getOrderNotificationHandler,getOrderNotificationByStoreIdHandler}
