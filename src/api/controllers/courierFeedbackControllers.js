'use strict';

const { addCourierFeedbackModel,
    removeCourierFeedbackModel,
    updateCourierFeedbackModel,
    getCourierFeedbackModel,
    getAllCouriersFeedbackModel,
} = require('../models/courierFeedback')

const addCourierFeedback = async (req, res,next) => {
    try {
        let courier_id=req.query.courierId; 
        let result = await addCourierFeedbackModel(courier_id,req.body);
        let response = {
            message: "Successfully add courier feedback",
            feedbackData: result
        }
        res.status(200).send(response)
    } catch (error) {
        next(error);
    }
}
const removeCourierFeedback = async (req, res,next) => {
    try {
        let id = req.params.id;
        let result = await removeCourierFeedbackModel(id);
        let response = {
            message: "Successfully delete courier ",
        }
        res.status(200).send(response)
    } catch (error) {
        next(error);
    }
}
const updateCourierFeedback = async (req, res,next)=> {
    try {
        let id = req.params.id;
        let result = await updateCourierFeedbackModel(id);
        let response = {
            message: "Successfully update courier",
            updateData: result,
        }
        res.status(200).send(response)
    } catch (error) {
        next(error);
    }
}
const getCourierFeedback = async (req, res,next) => {
    try {
        let id = req.params.id;
        let result = await getCourierFeedbackModel(id);
        let response ={
            message: "Successfully get my courier feedback",
            getData:result,
        }
        res.status(200).send(response)
    } catch (error) {
        next(error);
    }
}
const getAllCouriersFeedback = async (req, res,next) => {
    try {
        let result = await getAllCouriersFeedbackModel();
        let response = {
            message: "Successfully get all courier feedback",
            getAllData:result,
        }
        res.status(200).send(response)
    } catch (error) {
        next(error);
    }
}
module.exports = {
    addCourierFeedback,
    removeCourierFeedback,
    updateCourierFeedback,
    getCourierFeedback,
    getAllCouriersFeedback,
} ;

