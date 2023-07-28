'use strict';

const client = require('../../db');
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

let getTokenRecord = async (token, session_id,tokenType = 'access') =>{

    try {
        let SQL = 'SELECT * FROM JWT WHERE access_token = $1 AND session_id = $2;';
        if(tokenType ==='refresh') {
            SQL = 'SELECT * FROM JWT WHERE refresh_token=$1 AND session_id = $2;';
        }
        let safeValue = [token,session_id];
        let result = await client.query(SQL,safeValue);
        return result.rows[0];
        
    } catch (error) {
        throw new Error(error.message);
    }
}


// This function is used for deleting tokens for users:

async function deleteToken(session_id) {
    try {
      let SQL = `DELETE FROM JWT WHERE session_id=$1;`;
      let removeToken = [session_id];
      let tokenQuery = await client.query(SQL, removeToken);
      return tokenQuery;
    } catch (e) {
      throw new Error(e);
    }
  }


  const updateTokens = async (userId, session_id) => {
      try {
          const accessToken = await getToken(userId);
          const refreshToken = await getToken(userId, 'refresh');
          let SQL = `UPDATE JWT SET access_token=$1, refresh_token=$3 WHERE session_id=$2 RETURNING *;`;
          let result = await client.query(SQL, [accessToken,session_id,refreshToken ])
          return result.rows[0]
      } catch (error) {
          throw new Error(error.message)
      }
  }
  



module.exports = {createToken,deleteToken,getTokenRecord,updateTokens}



