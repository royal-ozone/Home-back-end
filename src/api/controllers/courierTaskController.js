const {addCourierTask,getAllCourierTasks, getCourierTaskById, updateCourierTaskStatus, updateCourierTaskCourierId } = require('../models/courierTask');

const addCourierTaskHandler = async (req, res) => {
    try {
        let courierId = req.body.courier_id || req.user.courier_id
        let result = await addCourierTask({courier_id: courierId, task_id: req.body.id,...req.body})
        res.status(201).json({
            message: 'task has been added successfully',
            ...result
        })
    } catch (error) {
        res.send(error.message)
    }
}

const getAllCourierTasksHandler = async (req, res) => {
    try {
        let result = await getAllCourierTasks();
        res.status(200).json(result)
    } catch (error) {
        res.send(error.message)
    }
}

const  getCourierTaskByIdHandler = async (req, res) => {
    try {
        let id = req.body.id || req.user.courier_id;
        let result = await getCourierTaskById(id);
        res.status(200).json(result)
    } catch (error) {
        res.send(error.message)
    }
}

const updateCourierTaskStatusHandler = async (req, res) => {
    try {
        let result = await updateCourierTaskStatus(req.body);
        res.status(200).json({
            message: 'status has been updated successfully',
            ...result
        })
    } catch (error) {
        res.send(error.message)
    }
}

const updateCourierTaskCourierIdHandler = async (req, res) => {
    try {
        let result = await updateCourierTaskCourierId(req.body)
        res.status(200).json({
            message: 'courier has been updated successfully',
            ...result
        })
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = {addCourierTaskHandler,getAllCourierTasksHandler,getCourierTaskByIdHandler,updateCourierTaskStatusHandler,updateCourierTaskCourierIdHandler}