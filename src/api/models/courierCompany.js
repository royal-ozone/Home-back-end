const client = require('../../db')


const createCourierCompany = async data => {
    try {
        let {profile_id, company_name}  = data;
        let SQL = 'INSERT INTO courier_company (profile_id, company_name) VALUES ($1,$2) RETURNING *;';
        let safeValues = [profile_id, company_name];
        let result = await client.query(SQL, safeValues);
        return result.rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateCourierCompanyName = async (data) => {
    try {
        let {id,company_name} = data;
        let SQL = 'UPDATE courier_company SET company_name=$1 WHERE id=$2 RETURNING *;'
        let safeValues = [company_name, id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const getAllCourierCompanies = async () =>{
    try {
        let SQL = 'SELECT * FROM courier_company;';
        let result = await client.query(SQL);
        return result.rows
    } catch (error) {
        throw new Error(error.message)
    }
}

const getCourierCompanyByCompanyId = async id => {
    try {
        let SQL = 'SELECT * FROM courier_company WHERE id=$1;';
        let safeValue = [id];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateCourierCompanyStatus = async (data) => {
    try {
        let {id,status, rejected_reason} = data;
        let SQL = 'UPDATE courier_company SET status=$1, rejected_reason=$2 WHERE id=$3 RETURNING *;';
        let safeValues = [status, rejected_reason,id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateChangingName = async (id) => {
    try {
        let SQL = 'UPDATE courier_company SET name_is_changed=$1 WHERE id=$2 RETURNING *;'
        let safeValues = [true, id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)        
    }
}

module.exports = {createCourierCompany, updateCourierCompanyName, getAllCourierCompanies, getCourierCompanyByCompanyId,updateCourierCompanyStatus,updateChangingName}