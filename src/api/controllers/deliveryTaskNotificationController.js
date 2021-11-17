const {addDeliveryTaskNotification,getDeliveryTaskNotificationById,updateDeliveryTask} = require('../models/taskDeliveryNotification');


const addDeliveryTaskNotificationHandler = async (req, res) =>{
    try {
        let result = await addDeliveryTaskNotification(req.body);
        res.status(201).json({
            message: 'Notification has been created successfully',
            ...result})
        } catch (error) {
        res.status(400).send(error.message)
    }
}


const getDeliveryTaskNotificationByIdHandler = async (req, res) =>{
    try {
        let id = req.user.company_id || req.user.courier_id
        let result = await getDeliveryTaskNotificationById(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updateDeliveryTaskHandler = async (req, res) =>{
    try {
        let result = await updateDeliveryTask(req.body.id)
        res.status(200).json({
            message: 'Update Delivery Task successfully to seen',
            ...result})
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {addDeliveryTaskNotificationHandler, getDeliveryTaskNotificationByIdHandler, updateDeliveryTaskHandler}