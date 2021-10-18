'use strict';

const client = require('../../db')

const bcrypt = require('bcrypt')

const signup = async data => {
    try {
        const { email, password, mobile, country, city, first_name, last_name, country_code } = data;
        let SQL = `INSERT INTO users(email,user_password,mobile,country,city,first_name,last_name,country_code) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;`;
        let userPassword = await bcrypt.hash(password, 10)

        let email2 = email.toLowerCase().trim();
        let safeValues = [email2, userPassword, mobile, country, city, first_name, last_name, country_code];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

const signupGoogle = async data => {
    try {
        const { email, user_password, country_code, mobile, country, city, first_name, last_name, google_id, verified } = data;
        let SQL = `INSERT INTO users(email,user_password,country_code,mobile,country,city,first_name,last_name,google_id,verified) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *;`;
        let userPassword = await bcrypt.hash(user_password, 10)

        let correctEmail = email.toLowerCase().trim();
        let safeValues = [correctEmail, userPassword, country_code, mobile, country, city, first_name, last_name, google_id, verified];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};


const createProfile = async data => {
    try {
        let mobileAllData = '+' + data.country_code + data.mobile.split('').splice(1, data.mobile.length).join('');
        let SQL = 'INSERT INTO profiles(user_id,first_name,last_name,city,country,mobile)VALUES($1,$2,$3,$4,$5,$6) RETURNING *;';
        let { id, first_name, last_name, city, country } = data;
        let safeValue = [id, first_name, last_name, city, country, mobileAllData];

        let result = await client.query(SQL, safeValue);
        return result.rows[0];

    } catch (error) {
        throw new Error(error.message);
    }
}

const getUserByEmail = async email => {
    try {
        let SQL = `SELECT * FROM users WHERE email=$1;`;
        let safeValue = [email];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];

    } catch (error) {
        throw new Error(error.message);
    }
};

const getUserById = async id => {
    try {
        let SQL = `SELECT * FROM users WHERE id=$1;`;
        let safeValue = [id];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];
    } catch (error) {
        console.log(error)
    }
};

const getUserByGoogleId = async google_id => {
    try {
        let SQL = `SELECT * FROM users WHERE google_id=$1;`;
        let safeValue = [google_id];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];
    } catch (error) {
        console.log(error)
    }
};

const getUserByMobile = async mobile => {
    try {
        let SQL = `SELECT * FROM users WHERE mobile=$1;`;
        let safeValue = [mobile];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];
    } catch (error) {
        console.log(error)
    }
};

const updateUserVerification = async id => {
    try {
        let SQL = `UPDATE users SET verified = true WHERE id =$1 RETURNING *;`;
        let safeValue = [id];
        let result = await client.query(SQL, safeValue);
        return result.rows[0].id;
    } catch (error) {
        return error.message;
    }
}

async function updateUserPassword(user_id, password) {
    try {
        const user_password = await bcrypt.hash(password, 10);
        const SQL = `UPDATE USERS SET user_password = $1 WHERE id = $2 RETURNING *;`;

        const safeValues = [user_password, user_id];
        const result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (e) {
        throw new Error(e.message);
    }
}

async function updateUserEmail(user_id, email) {
    try {
        const SQL = `UPDATE USERS SET email = $1 WHERE id = $2 RETURNING *;`;

        const safeValues = [email, user_id];
        const result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (e) {
        throw new Error(e.message);
    }
}

async function updateUserMobile(user_id, mobile) {
    try {
        const SQL = `UPDATE USERS SET mobile = $1 WHERE id = $2 RETURNING *;`;

        const safeValues = [mobile, user_id];
        const result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (e) {
        throw new Error(e.message);
    }
}
const getUserIdFromToken = async token => {
    try {
        let SQL = 'SELECT user_id FROM jwt WHERE access_token =$1;';
        let safeValue = [token];
        let result = await client.query(SQL, safeValue);
        return result.rows[0].user_id;
    } catch (error) {
        return error.message;
    }
}

const getMobileById = async id => {
    try {
        let SQL = 'SELECT * FROM users WHERE id=$1;';
        let safeValue = [id];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];
    } catch (error) {
        return error.message;
    }
}

const getProfileByUserId = async id => {
    try {
        let SQL = 'SELECT * FROM profiles WHERE user_id = $1;';
        let safeValue = [id];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];

    } catch (error) {
        throw new Error(error.message);
    }
}



module.exports = {
    signup,
    signupGoogle,
    createProfile,
    getUserById,
    getUserByGoogleId,
    getUserByEmail,
    getUserByMobile,
    updateUserVerification,
    updateUserPassword,
    updateUserEmail,
    updateUserMobile,
    getUserIdFromToken,
    getMobileById, getProfileByUserId
}