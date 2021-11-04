'use strict';

const client = require('../../db')

const bcrypt = require('bcrypt')

const signup = async data => {
    try {
        const { email, password, mobile, country, city, first_name, last_name, country_code } = data;
        let SQL = `INSERT INTO CLIENT(email,user_password,mobile,country,city,first_name,last_name,country_code) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;`;
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
        let SQL = `INSERT INTO CLIENT(email,user_password,country_code,mobile,country,city,first_name,last_name,google_id,verified) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *;`;
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
        let SQL = `INSERT INTO CLIENT(email,user_password,country_code,mobile,country,city,first_name,last_name,facebook_id,verified) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *;`;
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
        let SQL = 'INSERT INTO PROFILE(user_id,first_name,last_name,city,country,mobile)VALUES($1,$2,$3,$4,$5,$6) RETURNING *;';
        let { id, first_name, last_name, city, country } = data;
        let safeValue = [id, first_name, last_name, city, country, mobileAllData];

        let result = await client.query(SQL, safeValue);
        return result.rows[0];

    } catch (error) {
        throw new Error(error.message);
    }
}
const updateProfilersModel = async (data,id) =>{
   try {
       let SQL = 'UPDATE PROFILE SET first_name = $1,last_name = $2,city = $3,country = $4 WHERE user_id =$5 RETURNING *;'
       const {first_name,last_name,city,country,mobile} = data;
       let safeValue = [first_name,last_name,city,country,id];
       let result = await client.query(SQL,safeValue);
       return result.rows[0];
   } catch (error) {
       throw new Error(error.message);
   } 
}

const updateUserModel = async (data,id)=>{

    try {
        let SQL = 'UPDATE CLIENT SET first_name = $1,last_name = $2,city = $3,country = $4 WHERE id =$5 RETURNING * ;';
        const {first_name,last_name,city,country,mobile} = data;
       let safeValue = [first_name,last_name,city,country,id];
       let result = await client.query(SQL,safeValue);
       return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

const getUserByEmail = async email => {
    try {
        let SQL = `SELECT * FROM CLIENT WHERE email=$1;`;
        let safeValue = [email];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];

    } catch (error) {
        throw new Error(error.message);
    }
};

const getUserById = async id => {
    try {
        let SQL = `SELECT * FROM CLIENT WHERE id=$1;`;
        let safeValue = [id];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];
    } catch (error) {
        console.log(error)
    }
};

const getUserByGoogleId = async google_id => {
    try {
        let SQL = `SELECT * FROM CLIENT WHERE google_id=$1;`;
        let safeValue = [google_id];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];
    } catch (error) {
        console.log(error)
    }
};


const getUserByFacebookId = async facebook_id =>{
    try {
        let SQL = `SELECT * FROM CLIENT WHERE google_id=$1;`;
        let safeValue = [facebook_id];
        let result = await client.query(SQL,safeValue);
        return result.rows[0];
    } catch (error) {
        console.log(error)
    }
};

const getUserByMobile = async mobile =>{
    try {
        let SQL = `SELECT * FROM CLIENT WHERE mobile=$1;`;
        let safeValue = [mobile];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];
    } catch (error) {
        console.log(error)
    }
};

const updateUserVerification = async id => {
    try {
        let SQL = `UPDATE CLIENT SET verified = true WHERE id =$1 RETURNING *;`;
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
        const SQL = `UPDATE CLIENT SET user_password = $1 WHERE id = $2 RETURNING *;`;

        const safeValues = [user_password, user_id];
        const result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (e) {
        throw new Error(e.message);
    }
}

async function updateUserEmail(user_id, email) {
    try {
        const SQL = `UPDATE CLIENT SET email = $1 WHERE id = $2 RETURNING *;`;

        const safeValues = [email, user_id];
        const result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (e) {
        throw new Error(e.message);
    }
}

async function updateUserMobile(user_id, country_code, mobile) {
    try {
        const SQL = `UPDATE CLIENT SET mobile = $1, country_code=$2 , verified=$3 WHERE id = $4 RETURNING *;`;

        const safeValues = [mobile, country_code,false, user_id];
        const result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (e) {
        throw new Error(e.message);
    }
}

const updateProfileMobile = async (user_id,mobile)=> {
    try {
        let SQL = `UPDATE PROFILE SET mobile = $1 WHERE user_id = $2 RETURNING *;`;
        let safeValue = [mobile,user_id];
        let result = await client.query(SQL,safeValue);
        return result.rows[0]
    } catch (error) {
        throw new Error(error.message);
    }

}
const getTokenByUserId = async (id) => {
    try {
        let SQL = 'SELECT access_token FROM jwt WHERE user_id =$1;';
        let safeValue = [id];
        let result = await client.query(SQL, safeValue);
        return result.rows[0]
    } catch (error) {
        throw new Error(error.message);
    }
}

const getAllUsers = async token => {
    try {
        let SQL = 'SELECT * FROM CLIENT;';
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
        let SQL = 'SELECT * FROM CLIENT WHERE id=$1;';
        let safeValue = [id];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];
    } catch (error) {
        return error.message;
    }
}

const getProfileByUserId = async id => {
    try {
        let SQL = 'SELECT * FROM PROFILE WHERE user_id = $1;';
        let safeValue = [id];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];

    } catch (error) {
        throw new Error(error.message);
    }
}

const getAddressByProfileId = async id =>{
    try {
        let SQL = 'SELECT * FROM address WHERE profile_id = $1;';
        let safeValue = [id];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

const addAdmin = async userId => {
    try {
        let SQL = `INSERT INTO ADMINISTRATOR(user_id) VALUES ($1) RETURNING *;`;

        let safeValues = [userId];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

const addMod = async mobile => {
    try {
        let SQL = `SELECT * FROM CLIENT WHERE mobile=$1;`;
        
        let safeValues = [mobile];
        let result = await client.query(SQL, safeValues);
        
        if(!result.rows[0]){
            return -1;
        }
        
        let userId = result.rows[0].id;
        SQL = `SELECT * FROM ADMINISTRATOR WHERE user_id=$1;`;
        safeValues = [userId];
        result = await client.query(SQL, safeValues);
        
        if(result.rows[0]){
            return 0;
        }

        SQL = `SELECT * FROM MODERATOR WHERE user_id=$1;`;
        result = await client.query(SQL, safeValues);

        if(result.rows[0]){
            return 1;
        }

        SQL = `INSERT INTO MODERATOR(user_id) VALUES ($1) RETURNING *;`;
        result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

const removeMod = async (mobile) => {
    try {
        let SQL = `SELECT * FROM CLIENT WHERE mobile=$1;`;
        
        let safeValues = [mobile];
        let result = await client.query(SQL, safeValues);
            if(!result.rows[0]){
               return (' you can not remove the mod ');
            }
        let userId = result.rows[0].id;
        SQL = `DELETE FROM MODERATOR WHERE user_id=$1;`;
        safeValues = [userId];
        result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

const banUser = async (mobile) => {
    try {
        let SQL = `SELECT * FROM CLIENT WHERE mobile=$1;`;
        
        let safeValues = [mobile];
        let result = await client.query(SQL, safeValues);
        let userId = result.rows[0].id;

        SQL = `SELECT * FROM ADMINISTRATOR WHERE user_id=$1;`;
        safeValues = [userId];
        result = await client.query(SQL, safeValues);
        
        if(result.rows[0]){
            return 0;
        }

        SQL = `INSERT INTO BANNED_USER(user_id) VALUES ($1) RETURNING *;`;
        result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

const unbanUser = async (mobile) => {
    try {
        let SQL = `SELECT * FROM CLIENT WHERE mobile=$1;`;
        
        let safeValues = [mobile];
        let result = await client.query(SQL, safeValues);

        let userId = result.rows[0].id;
        SQL = `DELETE FROM BANNED_USER WHERE user_id=$1;`;
        safeValues = [userId];
        result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

const getStoreIdByProfileId = async id =>{
    try {
        let SQL = 'SELECT * FROM STORE WHERE profile_id=$1;'
        let safeValues = [id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

const deactivateAccount = async id => {

    try {
        let SQL = 'UPDATE CLIENT SET status=$1 WHERE id=$2;'
        let safeValues = ['deactivated',id];
        let result = await client.query(SQL, safeValues);
        return 'deactivated';
    } catch (error) {
        throw new Error(error.message);
    }
}

const activateAccount = async id => {
    try {
        let SQL = 'UPDATE CLIENT SET status=$1 WHERE id=$2;'
        let safeValues = ['active',id];
        let result = await client.query(SQL, safeValues);
        return 'activated';
    } catch (error) {
        throw new Error(error.message);
    }
}

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
    unbanUser,
    updateProfilersModel,
    updateUserModel,
    updateProfileMobile,
    getTokenByUserId,
    getAddressByProfileId,
    getStoreIdByProfileId,
    deactivateAccount,
    activateAccount
}

