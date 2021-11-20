'use strict';
const client = require('../../db')
const { deleteRemoteFile} = require('../middleware/uploader');
// store handlers ---------------------------------------------------------------------------------------------------

const createStore = async data => {
    try {
        let { profile_id, store_name, city, address, mobile, caption, about, store_picture } = data;
        let SQL = 'INSERT INTO STORE (profile_id, store_name, city, address, mobile,caption, about,store_picture) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;';
        let safeValues = [profile_id, store_name, city, address, mobile, caption, about, store_picture]
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
        let { city, address, mobile, caption, about } = data;
        let SQL = 'UPDATE STORE SET city=$1, address=$2, mobile=$3, caption=$4,about=$5 WHERE profile_id=$6 RETURNING *;';
        let safeValues = [city, address, mobile, caption, about, id];
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
        let SQL = 'SELECT * FROM STORE WHERE profile_id=$1;';
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

const checkIfReviewd = async (profileId, storeId) => {
    try {
        let SQL = `SELECT * FROM STORE_REVIEW WHERE profile_id=$1 AND store_id=$2;`;
        let safeValues = [profileId, storeId];
        let result = await client.query(SQL, safeValues)
        return result;
    } catch (error) {
        throw new Error(error.message)
    }
}

const createStoreReview = async (profileId, data) => {
    try {
        let { store_id, review, rate } = data;
        let check = await checkIfReviewd(profileId, store_id);
        if (check.rows[0]) {
            return 0;
        }
        let SQL = `INSERT INTO STORE_REVIEW (profile_id,store_id,review,rate) VALUES ($1,$2,$3,$4) RETURNING *;`;
        let safeValues = [profileId, store_id, review, rate];
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
        let result = await client.query(SQL, safeValues)
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateStoreReview = async (profileId, storeId, data) => {
    try {
        let { review, rate } = data;
        let check = await checkIfReviewd(profileId, storeId);
        if (!check.rows[0]) {
            return 0;
        }
        let SQL = 'UPDATE STORE_REVIEW SET review=$1,rate=$2 WHERE store_id=$3 AND profile_id=$4;'
        let safeValues = [review, rate, storeId, profileId];
        let result = await client.query(SQL, safeValues)
        return result;
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteStoreReview = async (profileId, storeId) => {
    try {
        let check = await checkIfReviewd(profileId, storeId);
        if (!check.rows[0]) {
            return 0;
        }
        let SQL = 'DELETE FROM STORE_REVIEW WHERE store_id=$1 AND profile_id=$2;'
        let safeValues = [storeId, profileId];
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
        return result;
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
        if (check.rows[0]) {
            let deleteFollower = await deleteStoreFollower(profileId, storeId);
            return 0;
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
        let SQL = 'DELETE FROM STORE_FOLLOWER WHERE store_id=$1 AND follower=$2;'
        let safeValues = [storeId, profileId];
        let result = await client.query(SQL, safeValues)
        return result;
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

const deleteStorePicture = async (id, storeId) => {
    try {
        let result = await getStore(id);
        await deleteRemoteFile(result.store_picture)
        let SQL = 'UPDATE STORE SET store_picture=$1 where id=$2 RETURNING *;'
        let safeValues = [process.env.DEFAULT_STORE_PICTURE,storeId];
        let result2 = await client.query(SQL, safeValues);
        return result2.rows[0];
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
    deleteStorePicture
};