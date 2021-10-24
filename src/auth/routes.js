'use strict';

const express = require('express');
const authRouter = express.Router();
const basicAuth = require('./middleware/basic')
const {checkAdmin,checkMod,checkAuth,checkBan} = require ('./middleware/acl')
const bearer = require('./middleware/bearer');
const {
    signupHandler,
    signInHandler,
    signOutHandler,
    addAdminHandler,
    addModHandler,
    banUserHandler,
    updateUserPasswordHandler,
    resetPasswordHandler,
    updateUserResetPasswordHandler,
    updateUserEmailHandler,
    updateUserMobileHandler,
    refreshHandler,
    getAllUsersHandler } = require('./controllers/authController')

const { sendVerificationCodeHandler, verifyUserHandler, sendMessageHandler } = require('./controllers/verification')

const googleAuth = require('./oauth/google-oauth');
const facebookAuth = require('./oauth/facebook/facebook-oauth')

authRouter.use(googleAuth); // calling google oauth
authRouter.use(facebookAuth);

authRouter.post('/signup', signupHandler);
authRouter.post('/signin', basicAuth,checkBan, signInHandler);
authRouter.post('/signout', bearer, signOutHandler);
authRouter.post('/user/verification', bearer, sendVerificationCodeHandler);
authRouter.post('/user/verify', bearer, verifyUserHandler);
authRouter.post('/user/send/message', sendMessageHandler);
authRouter.post('/refresh', refreshHandler);

authRouter.put('/user/password', bearer, updateUserPasswordHandler);
authRouter.put('/user/password/reset', bearer, resetPasswordHandler);
authRouter.put('/user/password/change', bearer, updateUserResetPasswordHandler);
authRouter.put('/user/email', bearer, updateUserEmailHandler);
authRouter.put('/user/mobile', bearer, updateUserMobileHandler);
authRouter.get('/user/all', checkAuth, bearer, getAllUsersHandler);

authRouter.post('/admin/add', bearer, addAdminHandler);
authRouter.post('/mods/add', checkAdmin, bearer, addModHandler);
authRouter.post('/user/ban',bearer, checkAuth, banUserHandler);


module.exports = authRouter;