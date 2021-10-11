'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {getUserById} =require('./user');
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

let authenticateWithToken = async (token,tokenType='access')=>{
    try {
        let parsedToken = jwt.verify(token,process.env.SECRET);

        if(parsedToken.tokenType !== tokenType) {
            throw new Error('Invalid token');
        }
        
         const user = await getUserById(parsedToken.userId);
         if(user) return user;
         next();
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {getToken,authenticateWithToken};