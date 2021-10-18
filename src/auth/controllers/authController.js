'use strict';

const { signup, getUserById, getUserByEmail, getUserByMobile, getUserIdFromToken, createProfile } = require('../models/user')
const { createToken, deleteToken } = require('../models/jwt')
const { validateEmail, validatePassword, checkPassword } = require('./helpers');


const signupHandler = async (req, res, next) => {
    try {
        let { email, password, country_code, mobile, country, city, first_name, last_name } = req.body;

        if (!email || !password || !country_code || !mobile || !country || !city || !first_name || !last_name) {
            const error = new Error('Missing parameters, please fill all the required fields!');
            error.statusCode = 403;
            throw error;
        }

        if (!validateEmail(email)) {
            const error = new Error('The email is not valid');
            error.statusCode = 403;
            throw error;
        }

        if (!validatePassword(password)) {
            const error = new Error('Invalid password format, password should at least have 1 Capital letter, 1 small letter, 1 special character and a number, ex:Ax@123');
            error.statusCode = 403;
            throw error;
        }

        let emailCheck = await getUserByEmail(email);

        if(emailCheck){
            const error = new Error('This email is already in use, please write a different email address!');
            error.statusCode = 403;
            throw error;
        }

        let mobileCheck = await getUserByMobile(mobile);

        if(mobileCheck){
            const error = new Error('This mobile is already in use, please write a different mobile number!');
            error.statusCode = 403;
            throw error;
        }

        let result = await signup(req.body)
        await createProfile(result);
        let userTokens = await createToken(result.id)
        res.status(200).json({ accessToken: userTokens.access_token, refreshToken: userTokens.refresh_token})
    } catch (error) {
        res.send(error.message)
    }
};


// This handler is to return user access and refresh tokens on signin request:

const signInHandler = async (req, res, next) => {
    try {
        delete req.tokens.created_at;
        res.status(200).json(req.tokens);
    } catch (error) {
        res.send(error.message)
    }
};

// This handler is to delete the user's access and refresh tokens on sign out request:

const signOutHandler = async (req, res, next) => {
    try {
        await deleteToken(req.user.id);
        res.status(200).json({
            status: 200,
            message: 'successfully signed out',
        });
    } catch (error) {
        res.send(error.message)
    }
};



module.exports = { signupHandler, signInHandler, signOutHandler }