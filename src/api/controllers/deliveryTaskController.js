const {addDeliveryTask,getAllDeliveryTasks, updateDeliveryTaskCompanyId,updateDeliveryTaskCourierId, getDeliveryTaskById} = require('../models/deliveryTask');


const addDeliveryTaskHandler = async (req, res) =>{
    try {
        let result = await addDeliveryTask(req.body);
        res.status(200).json({
            message: 'Delivery Task has been added successfully',
            ...result});
    } catch (error) {
        res.send(error.message)
    }
}

const getAllDeliveryTasksHandler = async (req, res) => { 
    try {
        let result = await getAllDeliveryTasks();
        res.status(200).json(result);
    } catch (error) {
        res.send(error.message)
    }
}

const updateDeliveryTaskCompanyIdHandler = async (req, res) => {
    try {
        let result = await updateDeliveryTaskCompanyId(req.user.courier_company_id, req.body);
        res.status(200).json({
            message: 'Company Id has been updated successfully',
            ...result});
    } catch (error) {
        res.send(error.message)
    }
}

const updateDeliveryTaskCourierIdHandler = async (req, res) => { 
    try {
        let result = await updateDeliveryTaskCourierId(req.body);
        res.status(200).json({
            message: 'Courier Id has been updated successfully',
            ...result
        })
    } catch (error) {
        res.send(error.message)
    }
}

const getDeliveryTaskByIdHandler = async (req, res) => {
    try {
        let id = req.user.courier_company_id || req.user.courier_company_id;
        let result = await getDeliveryTaskById(id);
        res.status(200).json(result);
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {addDeliveryTaskHandler,getAllDeliveryTasksHandler,updateDeliveryTaskCompanyIdHandler,updateDeliveryTaskCourierIdHandler,getDeliveryTaskByIdHandler}

