'use strict';

const express = require('express');
const authRouter = express.Router();
const {signupHandler} = require('./controllers/authController')
const {sendVerificationCodeHandler,verifyUserHandler,sendMessageHandler} = require('./controllers/verification')
const bearer = require('./middleware/bearer');



authRouter.post('/signup', signupHandler );
authRouter.post('/user/verification',bearer,sendVerificationCodeHandler);
authRouter.post('/user/verify',verifyUserHandler);
authRouter.post('/user/send/message',sendMessageHandler);




module.exports = authRouter;