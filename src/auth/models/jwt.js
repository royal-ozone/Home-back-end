'use strict';

const client = require('../../db');
const jwt = require('jsonwebtoken');
const {getToken} = require('./helpers');


let createToken = async user_id =>{
    try {
        const accessToken = getToken(user_id);
        const refreshToken = getToken(user_id, 'refresh');
        let SQL = `INSERT INTO jwt (access_token, refresh_token, user_id) VALUES ($1,$2,$3) RETURNING *;`;
        let safeValues = [accessToken, refreshToken, user_id];
        let tokenQuery = await client.query(SQL, safeValues);
        return tokenQuery.rows[0]
        
    } catch (error) {
        throw new Error(error.message);
    }
}

// This function is used for deleting tokens for users:

async function deleteToken(user_id) {
    try {
      let SQL = `DELETE FROM JWT WHERE user_id=$1;`;
      let removeToken = [user_id];
      let tokenQuery = await client.query(SQL, removeToken);
      return tokenQuery;
    } catch (e) {
      throw new Error(e);
    }
  }
  


module.exports = {createToken,deleteToken}


