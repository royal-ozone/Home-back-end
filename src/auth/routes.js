'use strict';

const express = require('express');
const authRouter = express.Router();
const {signupHandler} = require('./controllers/authController')

authRouter.post('/signup', signupHandler )


module.exports = authRouter;