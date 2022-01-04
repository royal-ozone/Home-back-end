'use strict';
const client = require('../../db')
const { deleteRemoteFile} = require('../middleware/uploader');
// store handlers ---------------------------------------------------------------------------------------------------

const createStore = async data => {
    try {
        let { profile_id, store_name, city, caption, about, store_picture } = data;
        let SQL = 'INSERT INTO STORE (profile_id, store_name, city,caption, about,store_picture) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;';
        let safeValues = [profile_id, store_name, city, caption, about, store_picture]
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteStore = async id => {
    try {
        let SQL = 'DELETE FROM STORE WHERE profile_id=$1 RETURNING *;';
        let safeValue = [id];
        let result = await client.query(SQL, safeValue)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateStore = async (id, data) => {
    try {
        let { city, caption, about } = data;
        let SQL = 'UPDATE STORE SET city=$1,caption=$2,about=$3 WHERE profile_id=$4 RETURNING *;';
        let safeValues = [city,caption, about, id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateStoreName = async (id, data) => {
    try {
        let { store_name } = data;
        let SQL = 'UPDATE STORE SET store_name=$1 WHERE profile_id=$2 RETURNING *;';
        let safeValues = [store_name, id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];

    } catch (error) {
        throw new Error(error.message)
    }
}

const getStore = async (id) => {
    try {
        let SQL = 'SELECT * FROM STORE WHERE profile_id=$1 OR id=$1;';
        let safeValues = [id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateStoreStatus = async ( data) => {
    try {
        let { status, rejected_reason , id} = data;
        let SQL = 'UPDATE STORE SET status=$1, rejected_reason=$2 WHERE id=$3 RETURNING *;';
        let safeValues = [status, rejected_reason, id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const getStoreByStatus = async (data) => {
    try {

        let SQL = 'SELECT * FROM STORE WHERE status=$1;'
        let safeValues = [data]
        let result = await client.query(SQL, safeValues);
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const getStoreByName = async (data) => {
    try {
        let SQL = 'SELECT * FROM STORE WHERE store_name=$1;'
        let safeValues = [data];
        let result = await client.query(SQL, safeValues);
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const getAllStores = async () => {
    try {
        let SQL = 'SELECT * FROM STORE;';
        let result = await client.query(SQL)
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateChangingName = async id => {
    try {
        let SQL = 'UPDATE STORE SET name_is_changed=$1 WHERE profile_id=$2;'
        let safeValues = [true, id];
        let result = await client.query(SQL, safeValues)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

// store reviews ---------------------------------------------------------------------------------------------------

const checkIfReviewed = async (profileId, storeId) => {
    try {
        let SQL = `SELECT * FROM STORE_REVIEW WHERE profile_id=$1 AND store_id=$2;`;
        let safeValues = [profileId, storeId];
        let result = await client.query(SQL, safeValues)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const createStoreReview = async (profile_id,data) => {
    try {
        let {store_id, review, rate } = data;
        let check = await checkIfReviewed(profile_id, store_id);
        if (check) {
            return 0;
        }
        let SQL = `INSERT INTO STORE_REVIEW (profile_id,store_id,review,rate) VALUES ($1,$2,$3,$4) RETURNING *;`;
        let safeValues = [profile_id, store_id, review, rate];
        let result = await client.query(SQL, safeValues)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const getAllStoreReviews = async () => {
    try {
        let SQL = `SELECT * FROM STORE_REVIEW;`;
        let result = await client.query(SQL)
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const getStoreReviews = async (storeId) => {
    try {
        let SQL = `SELECT * FROM STORE_REVIEW WHERE store_id=$1;`;
        let safeValues = [storeId];
        let result = await client.query(SQL, safeValues);
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateStoreReview = async (profile_id, store_id, data) => {
    try {
        let { review, rate } = data;
        console.log("🚀 ~ file: stores.js ~ line 174 ~ updateStoreReview ~ data", data)
        
        let SQL = 'UPDATE STORE_REVIEW SET review=$1,rate=$2 WHERE store_id=$3 AND profile_id=$4 RETURNING *;';
        let safeValues = [review, rate, store_id, profile_id];
        let result = await client.query(SQL, safeValues)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteStoreReview = async (data) => {
    try {
        let{profile_id, store_id}= data
        let check = await checkIfReviewed(profile_id, store_id);
        if (!check) {
            return 0;
        }
        let SQL = 'DELETE FROM STORE_REVIEW WHERE store_id=$1 AND profile_id=$2;'
        let safeValues = [store_id, profile_id];
        let result = await client.query(SQL, safeValues)
        return result;
    } catch (error) {
        throw new Error(error.message)
    }
}
// store reviews ---------------------------------------------------------------------------------------------------

const checkIfFollowed = async (profileId, storeId) => {
    try {
        let SQL = `SELECT * FROM STORE_FOLLOWER WHERE follower=$1 AND store_id=$2;`;
        let safeValues = [profileId, storeId];
        let result = await client.query(SQL, safeValues)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}



const getAllStoreFollowers = async () => {
    try {
        let SQL = `SELECT * FROM STORE_FOLLOWER;`;
        let result = await client.query(SQL)
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const getStoreFollowers = async (storeId) => {
    try {
        let SQL = `SELECT * FROM STORE_FOLLOWER WHERE store_id=$1;`;
        let safeValues = [storeId];
        let result = await client.query(SQL, safeValues)
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const createStoreFollower = async (profileId, storeId) => {
    try {
        let check = await checkIfFollowed(profileId, storeId);
        if (check) {
            let response = {
                number:0,
                data:check
            }
            // let deleteFollower = await deleteStoreFollower(profileId, storeId);
            return response;
        }
        else {
            let SQL = `INSERT INTO STORE_FOLLOWER(follower,store_id) VALUES ($1,$2) RETURNING *;`;
            let safeValues = [profileId, storeId];
            let result = await client.query(SQL, safeValues)
            return result.rows[0];
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteStoreFollower = async (profileId, storeId) => {
    try {
        let check = await checkIfFollowed(profileId, storeId);
        console.log("🚀 ~ file: stores.js ~ line 261 ~ deleteStoreFollower ~ check", check)
        let SQL = 'DELETE FROM store_follower WHERE store_id=$1 AND follower=$2 RETURNING * ;';
        let safeValues = [storeId, profileId];
        let result = await client.query(SQL, safeValues)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateStorePicture = async (id, data) => {
    try {
        let SQL = 'UPDATE STORE SET store_picture=$1 where id=$2 RETURNING *;'
        let safeValues = [data,id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
};

const deleteStorePicture = async (id) => {
    try {
        let result = await getStore(id);
        await deleteRemoteFile(result.store_picture)
        let SQL = 'UPDATE STORE SET store_picture=$1 where id=$2 RETURNING *;'
        let safeValues = [process.env.DEFAULT_STORE_PICTURE,id];
        let result2 = await client.query(SQL, safeValues);
        return result2.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}
const createNumberOfStoreFollower= async(store_id)=>{
    try {        
        let SQL = 'INSERT INTO store_follower_number(store_id) VALUES ($1) RETURNING *;';
        let safeValues = [store_id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}
const getNumberOfFollower= async(id)=>{
try {
    let SQL = 'SELECT * FROM store_follower_number WHERE store_id =$1 ;';
    let result = await client.query(SQL,[id]);
    return result.rows[0];
} catch (error) {
 throw new Error(error.message)   
}
}
const getALLNumbersOFFollowers= async()=>{
    try {
        let SQL ='SELECT * FROM store_follower_number;';
        let result = await client.query(SQL);
        return result.rows
    } catch (error) {
        throw new Error(error.message);
    }
}
const updateNumberOfFollowersMinus = async (store_id)=>{
    try {
        let data = await getNumberOfFollower(store_id);
        data.number_of_follower--;
        let SQL = "UPDATE store_follower_number SET number_of_follower=$1 WHERE store_id=$2  RETURNING *;";
        let safeValues = [data.number_of_follower,store_id]
        let result = await client.query(SQL,safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateNumberOfFollowersPlus = async (store_id)=>{
    try {
        let data = await getNumberOfFollower(store_id);
       data.number_of_follower++;
        let SQL = "UPDATE store_follower_number SET number_of_follower=$1 WHERE store_id=$2  RETURNING *;";
        let safeValues = [data.number_of_follower,store_id]
        let result = await client.query(SQL,safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const getALLStoreByProfileId = async (profile_id) => {
    try {
        let SQL ='SELECT * FROM store_follower WHERE follower=$1;';
        let result = await client.query(SQL, [profile_id]);
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports = {
    createStore,
    getStore,
    updateStore,
    deleteStore,
    updateStoreName,
    updateStoreStatus,
    getStoreByStatus,
    getStoreByName,
    getAllStores,
    updateChangingName,
    createStoreReview,
    getAllStoreReviews,
    getStoreReviews,
    updateStoreReview,
    deleteStoreReview,
    createStoreFollower,
    getAllStoreFollowers,
    getStoreFollowers,
    deleteStoreFollower,
    updateStorePicture,
    deleteStorePicture,
    checkIfFollowed,
    checkIfReviewed,
    updateNumberOfFollowersPlus,
    updateNumberOfFollowersMinus,
    createNumberOfStoreFollower,
    getNumberOfFollower,
    getALLNumbersOFFollowers,
    getALLStoreByProfileId,
};