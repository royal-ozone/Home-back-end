const {addOrderNotification,getOrderNotification,getOrderNotificationByOrderId} = require('../models/orderNotifications')


const addOrderNotificationHandler = async (req, res) =>{
    try {
        let result = await addOrderNotification(req.body)
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


const getOrderNotificationByOrderIdHandler = async (req, res) =>{
    try {
        let result = await getOrderNotificationByOrderId(req.params.orderId);
        res.status(200).json({
            status: 200,
            result: result,
        })
    } catch (error) {
        res.status(403).send(error.message);
    }
}

module.exports = {addOrderNotificationHandler,getOrderNotificationHandler,getOrderNotificationByOrderIdHandler}
