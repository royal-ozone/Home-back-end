'use strict';

const { signup, getUserById, getUserByEmail, getUserByMobile, getUserIdFromToken } = require('../models/user')
const { createToken,deleteToken } = require('../models/jwt')

const signupHandler = async (req, res, next) => {
    try {
        let result = await signup(req.body)
        let userTokens = await createToken(result.id)
        res.status(200).json({ accessToken: userTokens.access_token, refreshToken: userTokens.refresh_token, result })
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



module.exports = { signupHandler, signInHandler, signOutHandler}