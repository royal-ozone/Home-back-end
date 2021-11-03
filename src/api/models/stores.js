'use strict';
const client = require('../../db')


const createStore = async data =>{
    try {
        let {profile_id, store_name, city, address, mobile, caption, about} = data;
        let SQL = 'INSERT INTO store (profile_id, store_name, city, address, mobile,caption, about) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;';
        let safeValues = [profile_id, store_name, city, address, mobile, caption, about]
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
} 

const deleteStore = async id =>{
    try {
        let SQL = 'DELETE FROM store WHERE profile_id=$1 RETURNING *;';
        let safeValue = [id];
        let result = await client.query(SQL, safeValue)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateStore = async (id,data) =>{
    try {
        let {city, address, mobile, caption, about} = data;
        let SQL = 'UPDATE store SET city=$1, address=$2, mobile=$3, caption=$4,about=$5 WHERE profile_id=$6 RETURNING *;';
        let safeValues = [city, address, mobile, caption, about,id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateStoreName = async (id,data) =>{
    try {
        let {store_name} = data;
        let SQL = 'UPDATE store SET store_name=$1 WHERE profile_id=$2 RETURNING *;';
        let safeValues = [store_name,id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];

    } catch (error) {
        throw new Error(error.message)
    }
}

const getStore =async (id) =>{
    try {
        let SQL = 'SELECT * FROM store WHERE profile_id=$1;';
        let safeValues = [id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateStoreStatus =async (id, data) =>{
    try {
        let {status, rejected_reason} = data;
        let SQL = 'UPDATE store SET status=$1, rejected_reason=$2 WHERE profile_id=$3 RETURNING *;';
        let safeValues = [status,rejected_reason,id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const getStoreByStatus =async (data) =>{
    try {
       
        let SQL = 'SELECT * FROM store WHERE status=$1;'
        let safeValues = [data]
        let result = await client.query(SQL, safeValues);
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const getStoreByName = async (data) =>{
    try {
        let SQL = 'SELECT * FROM store WHERE store_name=$1;'
        let safeValues = [data];
        let result = await client.query(SQL, safeValues);
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const getAllStores = async () =>{
    try {
        let SQL = 'SELECT * FROM store;';
        let result = await client.query(SQL)
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateChangingName = async id =>{
    try {
        let SQL = 'UPDATE store SET name_is_changed=$1 WHERE profile_id=$2;'
        let safeValues = [true, id];
        let result = await client.query(SQL,safeValues)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const checkIfReviewd = async (profileId,storeId) =>{
    try {
        let SQL =  `SELECT * FROM STORE_REVIEW WHERE profile_id=$1 AND store_id=$2;`;
        let safeValues = [profileId,storeId];
        let result = await client.query(SQL,safeValues)
        return result;
    } catch (error) {
        throw new Error(error.message)
    }
}

const createStoreReview = async (profileId,data) =>{
    try {
        let {store_id,review,rate} = data;
        let check = await checkIfReviewd(profileId,store_id);
        if(check.rows[0]){
            return 0;
        }
        let SQL =  `INSERT INTO STORE_REVIEW (profile_id,store_id,review,rate) VALUES ($1,$2,$3,$4) RETURNING *;`;
        let safeValues = [profileId,store_id,review,rate];
        let result = await client.query(SQL,safeValues)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const getAllStoreReviews = async () =>{
    try {
        let SQL =  `SELECT * FROM STORE_REVIEW;`;
        let result = await client.query(SQL)
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const getStoreReviews = async (storeId) =>{
    try {
        let SQL =  `SELECT * FROM STORE_REVIEW WHERE store_id=$1;`;
        let safeValues = [storeId];
        let result = await client.query(SQL,safeValues)
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateStoreReview = async (profileId,storeId,data) =>{
    try {
        let {review, rate } = data;
        let check = await checkIfReviewd(profileId,storeId);
        if(!check.rows[0]){
            return 0;
        }
        let SQL = 'UPDATE STORE_REVIEW SET review=$1,rate=$2 WHERE store_id=$3 AND profile_id=$4;'
        let safeValues = [review,rate,storeId,profileId];
        let result = await client.query(SQL,safeValues)
        return result;
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
    updateStoreReview};