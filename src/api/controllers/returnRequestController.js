const  {
    createReturnRequest,
    getAllReturnRequests,
    updateReturnRequestStatus,
    getReturnOrderById
} = require('../models/returnedOrder')

const {updateOrderItemStatusModel} = require('../models/order')
const createReturnRequestHandler = async (req, res) => {
    try {
        let response = await createReturnRequest({profile_id: req.user.profile_id, ...req.body});
        if(response.id){
            await updateOrderItemStatusModel({...req.body, status:'returned'})        
            res.status(201).json({
                message: 'return request has been created successfully',
                response
            });
        } else res.status(403).send(' something went wrong while creating the return request')
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
        if(result.id){
            res.status(200).json({
                message: 'return request has been updated successfully',
                result
            })
        } else res.status(403).send('something went wrong while updating return request')
    } catch (error) {
        res.status(403).send(error.message)
    }
}

const getReturnOrderByIdHandler = async (req, res) => {
    try {
        let result = await getReturnOrderById({id: req.params.id, profile_id: req.params.id? null:req.user.profile_id})
        if(result[0].id){
            res.status(200).json(result)
        } else res.status(403).send('something went wrong while retrieving return request')
    } catch (error) {
        res.status(403).send(error.message)
    }
}

module.exports = {
    createReturnRequestHandler,
    getAllReturnRequestsHandler,
    updateReturnRequestStatusHandler,
    getReturnOrderByIdHandler
}