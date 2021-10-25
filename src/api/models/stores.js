'use strict';
const client = require('../../db')


const createStore = async (data, profileId) => {

    try {
        let { store_name, city, address, mobile, caption, about } = data;

        let SQL = `INSERT INTO STORES (profile_id,store_name,city,address,mobile,caption,about) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *;`;
        let safeValues=[profileId,store_name,city,address,mobile,caption,about];

        let result = client.query(SQL,safeValues);
        return result.rows[0];

    } catch (error) {
        throw new Error(error.message);
    }

};

const updateStore = async (data,profileId) => {

    try {
        let { store_name, city, address, mobile, caption, about } = data;

        let SQL = `UPDATE STORES SET store_name=$1,city=$2,address=$3,mobile=$4,caption=$5,about=$6 WHERE profile_id=$7;`;
        let safeValues=[store_name,city,address,mobile,caption,about,profileId];

        let result = client.query(SQL,safeValues);
        return result;

    } catch (error) {
        throw new Error(error.message);
    }

};

module.exports = {createStore,updateStore};