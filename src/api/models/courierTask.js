const client = require('../../db')


const addCourierTask = async data => {
    try {
        let {courier_id, task_id} = data 
        let SQL = 'INSERT INTO courier_task (courier_id, task_id) VALUES ($1,$2) RETURNING *;';
        let safeValues = [courier_id, task_id];
        let result = await client.query(SQL, safeValues)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const getAllCourierTasks = async () => {
    try {
        let SQL = 'SELECT * FROM courier_task;'
        let result = await client.query(SQL);
        return result.rows
    } catch (error) {
        throw new Error(error.message)
    }
}

const getCourierTaskById = async id => {
    try {
        let SQL = 'SELECT * FROM courier_task WHERE id=$1 OR courier_id=$1 OR task_id=$1;'
        let result = await client.query(SQL, [id])
        return result.rows
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateCourierTaskStatus = async (data) => {
    try {
        let {id,status} = data;
        let SQL = 'UPDATE courier_task SET status=$1 WHERE id=$2 RETURNING *;';
        let safeValues = [status, id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateCourierTaskCourierId = async (data) => {
    try {
        let {courier_id, id} = data;
        let SQL = 'UPDATE courier_task SET courier_id=$1 WHERE id=$2 RETURNING*;';
        let safeValues = [courier_id,id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}




module.exports = {addCourierTask,getAllCourierTasks, getCourierTaskById, updateCourierTaskStatus, updateCourierTaskCourierId }