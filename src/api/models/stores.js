'use strict';
const client = require('../../db')

const requestStore = async (data, profileId) => {

    try {
        let { store_name, city, address, mobile, caption, about } = data;

        let SQL = `INSERT INTO _REQUEST (profile_id,store_name,city,address,mobile,caption,about) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *;`;
        let safeValues = [profileId, store_name, city, address, mobile, caption, about];

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


const createStore = async (profileId) => {

    try {
        let profile = await getStoreRequestByProfileId(profileId);
        if (profile.rows[0]) {
            let { store_name, city, address, mobile, caption, about } = profile.rows[0];

            let SQL = `INSERT INTO STORE_REQUEST (profile_id,store_name,city,address,mobile,caption,about) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *;`;
            let safeValues = [profileId, store_name, city, address, mobile, caption, about];

            let result = client.query(SQL, safeValues);

            await deleteStoreRequestByProfileId(profileId);
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

const deleteStore = async (storeId) => {

    try {

        let SQL = `DELETE FROM STORE WHERE id=$1`;
        let safeValues = [storeId];

        let result = client.query(SQL, safeValues);
        return result;

    } catch (error) {
        throw new Error(error.message);
    }

};

module.exports = { requestStore, createStore, updateStore, deleteStore };