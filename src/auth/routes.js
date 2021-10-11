'use strict';

const express = require('express');
const authRouter = express.Router();
const basicAuth = require('./middleware/basic')
const bearer = require('./middleware/bearer');
const {signupHandler,signInHandler,signOutHandler} = require('./controllers/authController')
const {sendVerificationCodeHandler,verifyUserHandler,sendMessageHandler} = require('./controllers/verification')



authRouter.post('/signup',signupHandler);
authRouter.post('/signin',basicAuth,signInHandler);
authRouter.post('/signout',signOutHandler);
authRouter.post('/user/verification',bearer,sendVerificationCodeHandler);
authRouter.post('/user/verify',verifyUserHandler);
authRouter.post('/user/send/message',sendMessageHandler);




module.exports = authRouter;