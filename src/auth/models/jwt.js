'use strict';

const client = require('../../db');
const jwt = require('jsonwebtoken');
const {getToken} = require('./helpers');


let createToken = async user_id =>{
    try {
        const accessToken = getToken(user_id);
        const refreshToken = getToken(user_id, 'refresh');
        let SQL = `INSERT INTO JWT (access_token, refresh_token, user_id) VALUES ($1,$2,$3) RETURNING *;`;
        let safeValues = [accessToken, refreshToken, user_id];
        let tokenQuery = await client.query(SQL, safeValues);
        return tokenQuery.rows[0]
        
    } catch (error) {
        throw new Error(error.message);
    }
}

let getTokenRecord = async (token,tokenType = 'access') =>{

    try {
        let SQL = 'SELECT * FROM JWT WHERE access_token = $1;';
        if(tokenType ==='refresh') {
            SQL = 'SELECT * FROM JWT WHERE refresh_token=$1;';
        }
        let safeValue = [token];
        let result = await client.query(SQL,safeValue);
        return result.rows[0];
        
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


  const updateAccessToken = async (userId) => {
      try {
          let accessToken = await getToken(userId)
          let SQL = `UPDATE JWT SET access_token =$1 WHERE user_id=$2 RETURING *`;
          let result = await client.update(SQL, [accessToken,userId])
          return result.rows[0]
      } catch (error) {
          throw new Error(error.message)
      }
  }
  


module.exports = {createToken,deleteToken,getTokenRecord}


