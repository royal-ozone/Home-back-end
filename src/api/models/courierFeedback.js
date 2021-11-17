"use strict";
const client = require("../../db");

const addCourierFeedbackModel = async (courier_id,data) => {
    try {
        const {rate,review}= data;
       let SQL = 'INSERT INTO courier_feedback(courier_id,rate,review) VALUES($1,$2,$3) RETURNING *;';
       let safeValue = [courier_id,rate,review];
       let response = await client.query(SQL,safeValue);
       return response.rows[0];
    } catch (error) {
        return error;
    }
}
const removeCourierFeedbackModel = async id => {
    try {
        let SQL = 'DELETE FROM courier_feedback WHERE id = $1;';
        let safeValue = [id];
        let response = await client.query(SQL,safeValue);
        return response.rows[0];
    } catch (error) {
        next(error);
    }
}
const updateCourierFeedbackModel = async (id,data,oldData) => {
    try {
        const {rate,review} =oldData;
        const {newRate,newReview} =data;
        let SQL = 'UPDATE courier_feedback SET rate=$1,review=$2 WHERE id = $3 RETURNING *;';
        let safeValues = [newRate?newRate:rate,newReview?newReview:review,id];
        let response = await client.query(SQL,safeValues);
        return response.rows[0];
    } catch (error) {
        next(error);
    }
}
const getCourierFeedbackModel = async (id) => {
    try {
        let SQL = 'SELECT * FROM courier_feedback WHERE courier_id=$1;';
        let safeValues = [id];
        let result = await client.query(SQL,safeValues);
        return result.rows[0];
    } catch (error) {
        next(error);
    }
}
const getAllCouriersFeedbackModel = async () => {
    try {
        let SQL = 'SELECT * FROM courier_feedback ;';
        let result = await client.query(SQL);
        return result.rows;
    } catch (error) {
        next(error);
    }
}
module.exports = {
  addCourierFeedbackModel,
  removeCourierFeedbackModel,
  updateCourierFeedbackModel,
  getCourierFeedbackModel,
  getAllCouriersFeedbackModel,
};


