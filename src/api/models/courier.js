const client = require("../../db");

const createCourier = async data => {
    try {
        let {profile_id, company_id} = data;
        let SQL = 'INSERT INTO courier (profile_id, company_id) VALUES ($1,$2) RETURNING *;';
        let safeValue = [profile_id, company_id];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateCourierStatus = async (id,data) => {
    try {
        let {status} = data;
        let SQL = 'UPDATE courier SET status=$1 WHERE id=$2 RETURNING *;';
        let safeValues = [status, id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteCourier = async (id) => {
    try {
        let SQL = 'DELETE FROM courier WHERE id=$1 RETURNING *;'
        let result = await client.query(SQL, [id]);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
};

const getAllCouriers = async () => {
    try {
        let SQL = 'SELECT * FROM courier;';
        let result = await client.query(SQL);
        return result.rows
    } catch (error) {
        throw new Error(error.message)
    }
}

const getCourierById = async (id) =>{
    try {
        let SQL = 'SELECT * FROM courier WHERE id=$1 OR profile_id=$1;';
        let result = await client.query(SQL, [id]);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {createCourier, updateCourierStatus, deleteCourier,getAllCouriers, getCourierById}