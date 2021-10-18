'use strict';

const express = require('express');
const authRouter = express.Router();
const basicAuth = require('./middleware/basic')
const bearer = require('./middleware/bearer');
const {signupHandler,signInHandler,signOutHandler,updateUserPasswordHandler} = require('./controllers/authController')
const {sendVerificationCodeHandler,verifyUserHandler,sendMessageHandler} = require('./controllers/verification')

const googleAuth = require('./oauth/google-oauth');

authRouter.use(googleAuth); // calling google oauth

authRouter.post('/signup',signupHandler);
authRouter.post('/signin',basicAuth,signInHandler);
authRouter.post('/signout',bearer,signOutHandler);
authRouter.post('/user/verification',bearer,sendVerificationCodeHandler);
authRouter.post('/user/verify',bearer,verifyUserHandler);
authRouter.post('/user/send/message',sendMessageHandler);
authRouter.put('/user/password',bearer,updateUserPasswordHandler);



module.exports = authRouter;