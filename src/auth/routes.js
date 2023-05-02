'use strict';

const multer = require('multer');
let upload = multer()
const express = require('express');
const authRouter = express.Router();
const basicAuth = require('./middleware/basic')
const { checkAdmin, checkMod, checkAuth, checkBan, checkActive } = require('./middleware/acl')
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
    getAllUsersHandler,
    getProfileHandler,
    updateProfilers,
    deactivateAccountHandler,
    codePasswordHandler,
    getAllBannedUsersHandler,
    updateNotification_cityHandler,
    refreshAccessToken,
    updateResetTokenHandler,
    resetPasswordByTokenHandler,
    validateResetToken
} = require('./controllers/authController')

const { sendVerificationCodeHandler, verifyUserHandler, sendMessageHandler } = require('./controllers/verification')
const {
    updateNotification_allHandler,
    updateNotification_storeHandler,
} = require('./controllers/authController');

const googleAuth = require('./oauth/google-oauth');
const facebookAuth = require('./oauth/facebook/facebook-oauth')
const { uploadS3 } = require('../api/middleware/uploader');
const sendEmail = require('../api/middleware/sendEmail');
authRouter.use(googleAuth); // calling google oauth
authRouter.use(facebookAuth);


authRouter.post('/signup', uploadS3.single('image'), signupHandler);
authRouter.post('/signin', basicAuth, upload.none(), checkActive, checkBan, signInHandler);
authRouter.post('/signout', bearer, upload.none(), signOutHandler);
authRouter.post('/user/verification/550005', bearer, upload.none(), sendVerificationCodeHandler);
authRouter.post('/user/verify', bearer, upload.none(), verifyUserHandler);
authRouter.post('/user/send/message', upload.none(), sendMessageHandler);
authRouter.post('/refresh', upload.none(), refreshHandler);
authRouter.put('/deactivate', bearer, upload.none(), deactivateAccountHandler);


authRouter.put('/user/password', bearer, upload.none(), updateUserPasswordHandler);
authRouter.post('/user/password/generateToken', upload.none(), updateResetTokenHandler, sendEmail)
authRouter.post('/user/password/resetByToken', upload.none(), resetPasswordByTokenHandler)
authRouter.post('/user/password/validateToken', upload.none(), validateResetToken)
authRouter.post('/user/password/reset/mobile/55555', upload.none(), resetPasswordHandler);
authRouter.post('/user/password/reset/code', upload.none(), codePasswordHandler);
authRouter.put('/user/password/change', upload.none(), updateUserResetPasswordHandler);

authRouter.put('/user/email', bearer, upload.none(), updateUserEmailHandler);
authRouter.put('/user/mobile', bearer, upload.none(), updateUserMobileHandler);
authRouter.get('/user', bearer, checkAuth, upload.none(), getAllUsersHandler);
authRouter.get('/profile', bearer, upload.none(), getProfileHandler);

authRouter.put('/update/profile', bearer, upload.none(), updateProfilers);
authRouter.put('/update/notification_all', bearer, upload.none(), updateNotification_allHandler);
authRouter.put('/update/notification_store', bearer, upload.none(), updateNotification_storeHandler);
authRouter.put('/update/notification_city', bearer, upload.none(), updateNotification_cityHandler);

authRouter.post('/admin/add', bearer, checkAdmin, upload.none(), addAdminHandler);

authRouter.post('/mod/add', bearer, checkAdmin, upload.none(), addModHandler); //tested
authRouter.delete('/mod/remove', bearer, checkAdmin, upload.none(), removeModHandler); //tested

authRouter.post('/user/ban', bearer, checkAuth, upload.none(), banUserHandler); //tested
authRouter.get('/user/ban', bearer, checkAuth, upload.none(), getAllBannedUsersHandler);
authRouter.delete('/user/ban', bearer, checkAuth, upload.none(), removeBanUserHandler); //tested


module.exports = authRouter;