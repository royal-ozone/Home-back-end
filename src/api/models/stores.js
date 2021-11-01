'use strict';
const client = require('../../db')


const getAllStoreRequests = async () => {

    try {

        let SQL = `SELECT * FROM STORE_REQUEST;`;

        let result = await client.query(SQL);
        return result.rows;

    } catch (error) {
        throw new Error(error.message);
    }

};

const requestStore = async (data, profileId) => {

    try {
        let { store_name, city, address, mobile, caption, about } = data;

        let SQL = `INSERT INTO STORE_REQUEST (profile_id,store_name,city,address,mobile,caption,about) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *;`;
        let safeValues = [profileId, store_name, city, address, mobile, caption, about];

        let result = client.query(SQL, safeValues);
        return result;

    } catch (error) {
        throw new Error(error.message);
    }

};


const getStoreRequestByStoreName = async (storeName) => {

    try {

        let SQL = `SELECT * FROM STORE_REQUEST WHERE store_name=$1;`;
        let safeValues = [storeName];

        let result = client.query(SQL, safeValues);
        return result;

    } catch (error) {
        throw new Error(error.message);
    }

};

const getStoreRequestByProfileId = async (profileId) => {

    try {

        let SQL = `SELECT * FROM STORE_REQUEST WHERE profile_id=$1;`;
        let safeValues = [profileId];

        let result = client.query(SQL, safeValues);
        return result;

    } catch (error) {
        throw new Error(error.message);
    }

};

const deleteStoreRequestByProfileId = async (profileId) => {

    try {

        let SQL = `DELETE FROM STORE_REQUEST WHERE profile_id=$1;`;
        let safeValues = [profileId];

        client.query(SQL, safeValues);

    } catch (error) {
        throw new Error(error.message);
    }

};


const getAllStores = async () => {

    try {

        let SQL = `SELECT * FROM STORE;`;

        let result = await client.query(SQL);
        return result.rows;

    } catch (error) {
        throw new Error(error.message);
    }

};

const createStore = async (storeName) => {

    try {
        let profile = await getStoreRequestByStoreName(storeName);
        if (profile.rows[0]) {
            let { profile_id, city, address, mobile, caption, about } = profile.rows[0];

            let SQL = `INSERT INTO STORE (profile_id,store_name,city,address,mobile,caption,about) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *;`;
            let safeValues = [profile_id, storeName, city, address, mobile, caption, about];

            let result = client.query(SQL, safeValues);

            await deleteStoreRequestByProfileId(profile_id);
            return result;
        }

        else {
            return 0;
        }

    } catch (error) {
        throw new Error(error.message);
    }

};



const updateStore = async (data, profileId) => {

    try {
        let { store_name, city, address, mobile, caption, about } = data;

        let SQL = `UPDATE STORE SET store_name=$1,city=$2,address=$3,mobile=$4,caption=$5,about=$6 WHERE profile_id=$7;`;
        let safeValues = [store_name, city, address, mobile, caption, about, profileId];

        let result = client.query(SQL, safeValues);
        return result;

    } catch (error) {
        throw new Error(error.message);
    }

};

const deleteStore = async (storeName) => {

    try {

        let SQL = `DELETE FROM STORE WHERE store_name=$1`;
        let safeValues = [storeName];

        let result = client.query(SQL, safeValues);
        return result;

    } catch (error) {
        throw new Error(error.message);
    }

};

module.exports = { getAllStoreRequests, requestStore, getAllStores, createStore, updateStore, deleteStore };