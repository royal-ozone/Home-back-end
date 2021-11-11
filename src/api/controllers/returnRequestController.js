const  {
    createReturnRequest,
    getAllReturnRequests,
    updateReturnRequestStatus
} = require('../models/returnedOrder')


const createReturnRequestHandler = async (req, res) => {
    try {
        let response = await createReturnRequest({profile_id: req.user.profile_id, ...req.body});
        res.status(201).json({
            message: 'return request has been created successfully',
            response
        });
    } catch (error) {
        res.status(403).send(error.message)
    }
}

const getAllReturnRequestsHandler = async (req, res) => {
    try {
        let response = await getAllReturnRequests()
        res.status(200).json(response)
    } catch (error) {
        res.status(403).send(error.message)
    }
}

const updateReturnRequestStatusHandler = async (req, res) => {
    try {
        let result = await updateReturnRequestStatus(req.body);
        res.status(200).json({
            message: 'return request has been updated successfully',
            result
        })
    } catch (error) {
        res.status(403).send(error.message)
    }
}

module.exports = {
    createReturnRequestHandler,
    getAllReturnRequestsHandler,
    updateReturnRequestStatusHandler
}