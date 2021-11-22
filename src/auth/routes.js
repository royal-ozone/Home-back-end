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
    getAllUsersHandler
    ,updateProfilers,
    deactivateAccountHandler,
    codePasswordHandler ,
    getAllBannedUsersHandler
    } = require('./controllers/authController')
    
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
authRouter.post('/deactivate', bearer,upload.none(), deactivateAccountHandler);

authRouter.put('/user/password', bearer, upload.none(),updateUserPasswordHandler);

authRouter.post('/user/password/reset/mobile/55555',upload.none(),resetPasswordHandler);
authRouter.post('/user/password/reset/code',upload.none(),codePasswordHandler);
authRouter.put('/user/password/change',upload.none(), updateUserResetPasswordHandler);

authRouter.put('/user/email', bearer, upload.none(),updateUserEmailHandler);
authRouter.put('/user/mobile', bearer, upload.none(),updateUserMobileHandler);
authRouter.get('/user/all',bearer, checkAuth,upload.none(),getAllUsersHandler);

authRouter.put('/update/profile', bearer,upload.none(), updateProfilers);

authRouter.post('/admin/add',bearer,checkAdmin,upload.none(), addAdminHandler);

authRouter.post('/mod/add',bearer, checkAdmin,upload.none(), addModHandler); //tested
authRouter.delete('/mod/remove',bearer, checkAdmin,upload.none(), removeModHandler); //tested

authRouter.post('/user/ban',bearer, checkAuth, upload.none(),banUserHandler); //tested
authRouter.get('/user/ban',bearer, checkAuth, upload.none(),getAllBannedUsersHandler);
authRouter.delete('/user/ban',bearer, checkAuth,upload.none(), removeBanUserHandler); //tested


module.exports = authRouter;