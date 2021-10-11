'use strict';

const client = require('../../db')

const bcrypt = require('bcrypt')

const signup =  async data =>{
    try {
        const {email,password,mobile,country,city,first_name,last_name,country_code} = data;
        console.log("🚀 ~ file: user.js ~ line 10 ~ data", data)
        let SQL = `INSERT INTO users(email,user_password,mobile,country,city,first_name,last_name,country_code) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;`;
        let userPassword = await bcrypt.hash(password, 10)
        
        let email2 = email.toLowerCase().trim();
        let safeValues = [email2,userPassword,mobile,country,city,first_name,last_name,country_code];
        let result = await client.query(SQL,safeValues);
        return result.rows[0];
    } catch (error) {
       throw new Error (error.message);
    }
};

const getUserByEmail = async email =>{
    try {
        let SQL = `SELECT * FROM users WHERE email=$1;`;
        let safeValue = [email];
        let result = await client.query(SQL,safeValue);
        return result.rows[0];

    } catch (error) {
        throw new Error (error.message);
    }
};

const getUserById = async id =>{
    try {
        let SQL = `SELECT * FROM users WHERE id=$1;`;
        let safeValue = [id];
        let result = await client.query(SQL,safeValue);
        return result.rows[0];
    } catch (error) {
        console.log(error)
    }
};

const getUserByMobile = async mobile =>{
    try {
        let SQL = `SELECT * FROM users WHERE mobile=$1;`;
        let safeValue = [mobile];
        let result = await client.query(SQL,safeValue);
        return result.rows[0];
    } catch (error) {
        console.log(error)
    }
};

const updateUserVerification = async id =>{
    try {
        let SQL = `UPDATE users SET verified = true WHERE id =$1 RETURNING *;`;
        let safeValue =[id];
        let result = await client.query(SQL,safeValue);
        return result.rows[0].id;
    } catch (error) {
        return error.message;
    }
}
const getUserIdFromToken = async token =>{
    try {
        let SQL = 'SELECT user_id FROM jwt WHERE access_token =$1;';
        let safeValue =[token];
        let result = await client.query(SQL,safeValue);
        console.log(result,'checkoooooooooooooooooooooooooooo');
        return result.rows[0].user_id;
    } catch (error) {
        return error.message;
    }
}

const getMobileById = async id =>{
    try {
        let SQL = 'SELECT * FROM users WHERE id=$1;';
        let safeValue = [id];
        let result = await client.query(SQL,safeValue);
        return result.rows[0];
    } catch (error) {
        return error.message;
    }
}

const getProfileByUserId = async id =>{
    try {
        let SQL = 'SELECT * FROM profiles WHERE user_id = $1;';
        let safeValue = [id];
        let result = await client.query(SQL,safeValue);
        return result.rows[0];
        
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports = { signup, getUserById, getUserByEmail, getUserByMobile ,updateUserVerification,getUserIdFromToken,getMobileById,getProfileByUserId}