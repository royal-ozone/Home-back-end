const { addDeliveryTask,
    getAllDeliveryTasks,
    updateDeliveryTaskCompanyId,
    updateDeliveryTaskCourierId,
    getDeliveryTaskById,
    getUnassignedDeliveryTasks,
    getCompanyUnassignedTasks
} = require('../models/deliveryTask');

const {addCourierTask} = require('../models/courierTask')
const addDeliveryTaskHandler = async (req, res) => {
    try {
        let result = await addDeliveryTask(req.body);
        res.status(200).json({
            message: 'Delivery Task has been added successfully',
            ...result
        });
    } catch (error) {
        res.send({ message: error.message, status: 403 })
    }
}

const getUnassignedDeliveryTasksHandler = async (req, res) => {
    try {
        let { data, count } = await getUnassignedDeliveryTasks(req.query)
        if (data) {
            res.send({ status: 200, data: data, count: count })
        } else {
            res.send({ status: 403, message: 'something went wrong' })
        }
    } catch (error) {
        res.send({ status: 403, message: error })
    }
}
const getAllDeliveryTasksHandler = async (req, res) => {
    try {
        let result = await getAllDeliveryTasks();
        res.status(200).json(result);
    } catch (error) {
        res.send({ message: error.message, status: 403 })
    }
}

const updateDeliveryTaskCompanyIdHandler = async (req, res) => {
    try {
        let result = await updateDeliveryTaskCompanyId(req.user.courier_company_id, req.body.id);

        res.json({
            status: 200,
            message: 'Company Id has been updated successfully',
            data: result
        });
    } catch (error) {
        res.send({ message: error.message, status: 403 })
    }
}

const updateDeliveryTaskCourierIdHandler = async (req, res, next) => {
    try {
        let result = await updateDeliveryTaskCourierId(req.body);
        // res.status(200).json({
        //     message: 'Courier Id has been updated successfully',
        //     ...result
        // })
        if(result) {
            await addCourierTask({...result,courier_id:req.body.courier_id, task_id: result.id, })
            res.send({status: 200, data: result })
        } else {
            res.send({status:403, message:result})
        }
        // req.body = { ...req.body, ...result };
        // next()
    } catch (error) {
        res.send({ message: error.message, status: 403 })
    }
}

const getDeliveryTaskByIdHandler = async (req, res) => {
    try {
        let id = req.user.courier_company_id || req.user.courier_id;
        let result = await getDeliveryTaskById(id);
        res.status(200).json(result);
    } catch (error) {
        res.send({ message: error.message, status: 403 })
    }
}

const getCompanyUnassignedTasksHandler = async (req, res) => {
    try {
        let result = await getCompanyUnassignedTasks({id:req.user.courier_company_id, ...req.query})
        if (result) {
            res.send({ status: 200, data: result })
        } else {
            res.send({ message: result, status: 403 })
        }
    } catch (error) {
        res.send({ message: error.message, status: 403 })
    }
}

const routes = [
    {
        path: '/deliveryTask/unassigned',
        auth: true,
        method: 'get',
        type: 'courierCompany',
        fn: getUnassignedDeliveryTasksHandler,
        courierCompanyStatus: true,
    },
    {
        path: '/deliveryTask/companyId',
        auth: true,
        method: 'put',
        type: 'courierCompany',
        fn: updateDeliveryTaskCompanyIdHandler,
        courierCompanyStatus: true,
    },
    {
        path: '/deliveryTask/companyUnassigned',
        auth: true,
        method: 'get',
        type: 'courierCompany',
        fn: getCompanyUnassignedTasksHandler,
        courierCompanyStatus: true,
    },


]

module.exports = {
    addDeliveryTaskHandler,
    getAllDeliveryTasksHandler,
    updateDeliveryTaskCompanyIdHandler,
    updateDeliveryTaskCourierIdHandler,
    getDeliveryTaskByIdHandler,
    getUnassignedDeliveryTasksHandler,
    routes
}

