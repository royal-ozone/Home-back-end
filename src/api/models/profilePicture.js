const client = require('../../db')


const addProfilePicture = async data => {
    try {
        let {profile_id, profile_picture} = data;
        let SQL = 'INSERT INTO profile_picture (profile_id, profile_picture) VALUES ($1,$2) RETURNING *;';
        let safeValues = [profile_id, profile_picture];
        let result = await client.query(SQL, safeValues)
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
};

const getProfilePictureByProfileId = async id => {
    try {
        let SQL = 'SELECT * FROM profile_picture WHERE profile_id=$1;';
        let result = await client.query(SQL, [id])
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
};

const deleteProfilePicture = async id => {
    try {
        let SQL = 'DELETE FROM profile_picture WHERE profile_id=$1 RETURNING *;';
        let result = await client.query(SQL, [id])
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
};

const updateProfilePicture = async data => {
    try {
        const {profile_id, profile_picture} = data
        let SQL = 'UPDATE profile_picture SET profile_picture=$2 WHERE profile_id=$1;';
        let result = await client.query(SQL, [profile_id, profile_picture])
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
};

module.exports = {addProfilePicture, updateProfilePicture,deleteProfilePicture,getProfilePictureByProfileId};