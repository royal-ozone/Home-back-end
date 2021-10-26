'use strict';

const client = require('../../db')

const bcrypt = require('bcrypt')

const signup = async data => {
    try {
        const { email, password, mobile, country, city, first_name, last_name, country_code } = data;
        let SQL = `INSERT INTO users(email,user_password,mobile,country,city,first_name,last_name,country_code) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;`;
        let userPassword = await bcrypt.hash(password, 10)

        let email2 = email.toLowerCase().trim();
        let mobile2 = mobile.trim();
        let safeValues = [email2, userPassword, mobile2, country, city, first_name, last_name, country_code];
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

const signupFacebook =  async data =>{
    try {
        const {email,user_password,country_code,mobile,country,city,first_name,last_name,facebook_id,verified} = data;
        let SQL = `INSERT INTO users(email,user_password,country_code,mobile,country,city,first_name,last_name,facebook_id,verified) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *;`;
        let userPassword = await bcrypt.hash(user_password, 10)
        
        let correctEmail = email.toLowerCase().trim();
        let safeValues = [correctEmail,userPassword,country_code,mobile,country,city,first_name,last_name,facebook_id,verified];
        let result = await client.query(SQL,safeValues);
        return result.rows[0];
    } catch (error) {
       throw new Error (error.message);
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


const getUserByFacebookId = async facebook_id =>{
    try {
        let SQL = `SELECT * FROM users WHERE google_id=$1;`;
        let safeValue = [facebook_id];
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

async function updateUserMobile(user_id, country_code, mobile) {
    try {
        const SQL = `UPDATE USERS SET mobile = $1, country_code=$2 WHERE id = $3 RETURNING *;`;

        const safeValues = [mobile, country_code, user_id];
        const result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (e) {
        throw new Error(e.message);
    }
}

const getAllUsers = async token => {
    try {
        let SQL = 'SELECT * FROM USERS;';
        let result = await client.query(SQL);
        return {users:result.rows};
    } catch (error) {
        return error.message;
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

const addAdmin = async userId => {
    try {
        let SQL = `INSERT INTO ADMINS(user_id) VALUES ($1) RETURNING *;`;

        let safeValues = [userId];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

const addMod = async mobile => {
    try {
        let SQL = `SELECT * FROM USERS WHERE mobile=$1;`;
        
        let safeValues = [mobile];
        let result = await client.query(SQL, safeValues);
        let userId = result.rows[0].id;

        SQL = `SELECT * FROM ADMINS WHERE user_id=$1;`;
        safeValues = [userId];
        result = await client.query(SQL, safeValues);
        
        if(result.rows[0]){
            const error = new Error('This is an admin user!');
            error.statusCode = 403;
            throw error;
        }

        SQL = `INSERT INTO mods(user_id) VALUES ($1) RETURNING *;`;
        result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

const removeMod = async (mobile) => {
    try {
        let SQL = `SELECT * FROM USERS WHERE mobile=$1;`;
        
        let safeValues = [mobile];
        let result = await client.query(SQL, safeValues);

        let userId = result.rows[0].id;
        SQL = `DELETE FROM MODS WHERE user_id=$1;`;
        safeValues = [userId];
        result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

const banUser = async (mobile) => {
    try {
        let SQL = `SELECT * FROM USERS WHERE mobile=$1;`;
        
        let safeValues = [mobile];
        let result = await client.query(SQL, safeValues);
        let userId = result.rows[0].id;

        SQL = `SELECT * FROM ADMINS WHERE user_id=$1;`;
        safeValues = [userId];
        result = await client.query(SQL, safeValues);
        
        if(result.rows[0]){
            const error = new Error('This is an admin user!');
            error.statusCode = 403;
            throw error;
        }

        SQL = `INSERT INTO banned_users(user_id) VALUES ($1) RETURNING *;`;
        result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

const unbanUser = async (mobile) => {
    try {
        let SQL = `SELECT * FROM USERS WHERE mobile=$1;`;
        
        let safeValues = [mobile];
        let result = await client.query(SQL, safeValues);

        let userId = result.rows[0].id;
        SQL = `DELETE FROM banned_users WHERE user_id=$1;`;
        safeValues = [userId];
        result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    signup,
    signupGoogle,
    signupFacebook,
    createProfile,
    getUserById,
    getUserByGoogleId,
    getUserByFacebookId,
    getUserByEmail,
    getUserByMobile,
    getAllUsers,
    updateUserVerification,
    updateUserPassword,
    updateUserEmail,
    updateUserMobile,
    getUserIdFromToken,
    getMobileById, 
    getProfileByUserId,
    addAdmin,
    addMod,
    removeMod,
    banUser,
    unbanUser
}

