'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserById, getUserByEmail } = require('./user');
require('dotenv').config();

// BASIC AUTH

async function authenticateBasic(email, password) {
    try {
        let user = await getUserByEmail(email);
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

module.exports = { getToken,authenticateBasic};