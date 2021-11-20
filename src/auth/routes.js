'use strict';

const multer = require('multer');
let upload = multer()
const express = require('express');
const authRouter = express.Router();
const basicAuth = require('./middleware/basic')
const {checkAdmin,checkMod,checkAuth,checkBan, checkActive} = require ('./middleware/acl')
const bearer = require('./middleware/bearer');
const {
    signupHandler,
    signInHandler,
    signOutHandler,
    addAdminHandler,
    addModHandler,
    removeModHandler,
    banUserHandler,
    removeBanUserHandler,
    updateUserPasswordHandler,
    resetPasswordHandler,
    updateUserResetPasswordHandler,
    updateUserEmailHandler,
    updateUserMobileHandler,
    refreshHandler,
    getAllUsersHandler,updateProfilers,deactivateAccountHandler } = require('./controllers/authController')
    
    const { sendVerificationCodeHandler, verifyUserHandler, sendMessageHandler } = require('./controllers/verification')


const googleAuth = require('./oauth/google-oauth');
const facebookAuth = require('./oauth/facebook/facebook-oauth')
const {uploadS3} = require('../api/middleware/uploader')
authRouter.use(googleAuth); // calling google oauth
authRouter.use(facebookAuth);

authRouter.post('/signup', uploadS3.single('image'), signupHandler);
authRouter.post('/signin', basicAuth,upload.none(), checkActive,checkBan, signInHandler);
authRouter.post('/signout', bearer,upload.none(), signOutHandler);
authRouter.post('/user/verification', bearer,upload.none(), sendVerificationCodeHandler);
authRouter.post('/user/verify', bearer, upload.none(),verifyUserHandler);
authRouter.post('/user/send/message',upload.none(),sendMessageHandler);
authRouter.post('/refresh', upload.none(),refreshHandler);
authRouter.post('/deactivate', bearer,upload.none(), deactivateAccountHandler)

authRouter.put('/user/password', bearer, upload.none(),updateUserPasswordHandler);
authRouter.put('/user/password/reset', bearer, upload.none(),resetPasswordHandler);
authRouter.put('/user/password/change', bearer,upload.none(), updateUserResetPasswordHandler);
authRouter.put('/user/email', bearer, upload.none(),updateUserEmailHandler);
authRouter.put('/user/mobile/:id', bearer, upload.none(),updateUserMobileHandler);
authRouter.get('/user/all',bearer, checkAuth,upload.none(),getAllUsersHandler);

authRouter.put('/update/profile/:id', bearer,upload.none(), updateProfilers);

authRouter.post('/admin/add', bearer,upload.none(), addAdminHandler);

authRouter.post('/mod/add',bearer, checkAdmin,upload.none(), addModHandler); //tested
authRouter.delete('/mod/remove',bearer, checkAdmin,upload.none(), removeModHandler); //tested

authRouter.post('/user/ban',bearer, checkAuth, upload.none(),banUserHandler); //tested
authRouter.delete('/user/ban/remove',bearer, checkAuth,upload.none(), removeBanUserHandler); //tested


module.exports = authRouter;