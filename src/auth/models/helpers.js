'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserById, getUserByEmail ,getUserByMobile } = require('./user');
require('dotenv').config();

// BASIC AUTH

async function authenticateBasic(email, password) {
    try {
        
        let user = await getUserByEmail(email)||await getUserByMobile(email);
        
        const valid = await bcrypt.compare(password, user.user_password);
        if (valid) {
            return user;
        }
        const error = new Error('Invalid User');
        error.statusCode = 403;
        throw error;
    } catch (error) {
        throw new Error(error.message);
    }
}

let getToken = (userId, tokenType = 'access') => {

    try {

        let payload = {
            userId: userId,
            tokenType: tokenType
        };

        let expireDate = 3600;

        if (tokenType === 'refresh') {
            expireDate = 86400;
        }

        return jwt.sign(payload, process.env.SECRET, { expiresIn: expireDate });
    } catch (error) {
        throw new Error(error.message);
    }



}

let authenticateWithToken = async (token,tokenType='access')=>{
    try {
        let parsedToken = jwt.verify(token,process.env.SECRET);

        if(parsedToken.tokenType !== tokenType) {
            return null;
        }
         const user = await getUserById(parsedToken.userId);
         if(user) return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { getToken,authenticateBasic,authenticateWithToken};
