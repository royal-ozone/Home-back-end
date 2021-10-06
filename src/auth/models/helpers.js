'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
let getToken = (userId , tokenType = 'access') =>{

    try {
        
        let payload = {
        userId: userId,
        tokenType: tokenType
        };
    
        let expireDate = 3600;
    
        if(tokenType === 'refresh') {
            expireDate = 86400;
        }
    
        return jwt.sign(payload, process.env.SECRET, {expiresIn: expireDate});
    } catch (error) {
        throw new Error(error.message);
    }



}

module.exports = {getToken};