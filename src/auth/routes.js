'use strict';

const express = require('express');
const authRouter = express.Router();
const {signupHandler} = require('./controllers/authController')
const {sendVerificationCodeHandler,verifyUserHandler} = require('./controllers/verification')



authRouter.post('/signup', signupHandler );
authRouter.post('/user/verification',sendVerificationCodeHandler);
authRouter.post('/user/verify',verifyUserHandler);




module.exports = authRouter;