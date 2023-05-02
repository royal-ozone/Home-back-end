const { addCourierTask,
     getAllCourierTasks, 
     getCourierTaskById, 
     updateCourierTaskStatus, 
     updateCourierTaskCourierId,
     getPendingTasks,
     getOverviewTasks
     } = require('../models/courierTask');

const addCourierTaskHandler = async (req, res) => {
    try {
        let courierId = req.body.courier_id || req.user.courier_id
        let result = await addCourierTask({ courier_id: courierId, task_id: req.body.id, ...req.body })
        res.status(201).json({
            message: 'task has been added successfully',
            ...result
        })
    } catch (error) {
        res.send({message:error.message, status: 403})
    }
}

const getAllCourierTasksHandler = async (req, res) => {
    try {
        let result = await getAllCourierTasks();
        res.status(200).json(result)
    } catch (error) {
        res.send({message:error.message, status: 403})
    }
}

const getCourierTaskByIdHandler = async (req, res) => {
    try {
        let id = req.body.id || req.user.courier_id;
        let result = await getCourierTaskById(id);
        res.status(200).json(result)
    } catch (error) {
        res.send({message:error.message, status: 403})
    }
}

const updateCourierTaskStatusHandler = async (req, res) => {
    try {
        let result = await updateCourierTaskStatus(req.body);
        if(result) {
            res.json({
                message: 'status has been updated successfully',
                status: 200,
                data: result
            })
        } else {
            req.send({status: 403, message:'something went wrong'})
        }
    } catch (error) {
        res.send({message:error.message, status: 403})
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
        res.send({message:error.message, status: 403})
    }
}

const getTasksHandlerByStatus = async (req,res) =>{
    try {
        let result = await getPendingTasks({id: req.user.courier_id, ...req.query, status: req.params.status})
        if(result.data) {
            res.send({status: 200, data: result})
        } else res.send({status: 403, message: result})
    } catch (error) {
        res.send({message:error.message, status: 403})
    }
}
const getOverviewTasksHandler = async (req,res) => {  
    try {
        let result = await getOverviewTasks({id: req.user.courier_id,...req.query})
        if(result.data) {
            res.send({status:200, data: result})
        } else res.send({status: 403, message: result})
    } catch (error) {
        res.send({message:error, status: 403})
    }
}

const routes = [
    {
        fn: updateCourierTaskStatusHandler,
        auth: true,
        path: '/courierTask/status',
        method: 'put',
        type: 'courier',
        courierStatus: true
    },
    {
        fn: getOverviewTasksHandler,
        auth: true,
        path: '/courierTask/overview',
        method: 'get',
        type: 'courier',
        courierStatus: true
    },
    {
        fn: getTasksHandlerByStatus,
        auth: true,
        path: '/courierTask/:status',
        method: 'get',
        type: 'courier',
        courierStatus: true
    },
]

module.exports = {
    addCourierTaskHandler,
    getAllCourierTasksHandler,
    getCourierTaskByIdHandler,
    updateCourierTaskStatusHandler,
    updateCourierTaskCourierIdHandler,
    routes
}