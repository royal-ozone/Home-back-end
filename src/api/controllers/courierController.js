const {createCourier, updateCourierStatus, deleteCourier,getAllCouriers, getCourierById} = require('../models/courier');


const createCourierHandler = async (req, res) =>{
    try {
        let company_id = req.user.courier_company_id? req.user.courier_company_id : null;
        let profile = req.body.profile_id? req.body.profile_id : req.user.profile_id;
        let result = await createCourier({company_id: company_id, profile_id: profile})
        res.status(201).json({
            message: 'courier has been added successfully',
            ...result
        })
    } catch (error) {
        res.send(error.message)
    }
}

const updateCourierStatusHandler = async (req, res) => {
    try {
        let id = req.user.courier_id? req.user.courier_id : req.body.courier_id;
        let result = await updateCourierStatus(id, req.body)
        res.status(200).json({
            message: 'courier status has been updated successfully', ...result 
        })
    } catch (error) {
        res.send(error.message)
    }
}

const deleteCourierHandler = async (req, res) => {
    try {
        let result = await deleteCourier(req.body.courier_id)
        res.status(200).json({
            message: 'courier has been removed successfully', ...result
        })
    } catch (error) {
        res.send(error.message)
    }
}

const getAllCouriersHandler = async (req, res) => {
    try {
        let result = await getAllCouriers();
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error.message)
    }
}

const getCourierByIdHandler = async (req, res) =>{
    try {
        let id = req.params.id? req.params.id : req.user.courier_id;
        let result = await getCourierById(id);
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports = {createCourierHandler,updateCourierStatusHandler,deleteCourierHandler,getAllCouriersHandler,getCourierByIdHandler}