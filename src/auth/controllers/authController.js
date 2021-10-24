'use strict';

const { signup,
    getUserById,
    getUserByEmail,
    getUserByMobile,
    getUserIdFromToken,
    getAllUsers,
    createProfile,
    addAdmin,
    addMod,
    banUser,
    unbanUser,
    updateUserPassword,
    updateUserEmail,
    updateUserMobile, } = require('../models/user')

const { authenticateWithToken } = require('../models/helpers')

const { createToken, deleteToken } = require('../models/jwt')
const { validateEmail, validatePassword, checkPassword } = require('./helpers');


const signupHandler = async (req, res, next) => {
    try {
        let { email, password, country_code, mobile, country, city, first_name, last_name } = req.body;

        if (!email || !password || !country_code || !mobile || !country || !city || !first_name || !last_name) {
            const error = new Error('Missing parameters, please fill all the required fields!');
            error.statusCode = 403;
            throw error;
        }

        if (!validateEmail(email)) {
            const error = new Error('The email is not valid');
            error.statusCode = 403;
            throw error;
        }

        if (!validatePassword(password)) {
            const error = new Error('Invalid password format, password should at least have 1 Capital letter, 1 small letter, 1 special character and a number, ex:Ax@123');
            error.statusCode = 403;
            throw error;
        }

        let emailCheck = await getUserByEmail(email);

        if (emailCheck) {
            const error = new Error('This email is already in use, please write a different email address!');
            error.statusCode = 403;
            throw error;
        }

        let mobileCheck = await getUserByMobile(mobile);

        if (mobileCheck) {
            const error = new Error('This mobile is already in use, please write a different mobile number!');
            error.statusCode = 403;
            throw error;
        }

        let result = await signup(req.body)
        await createProfile(result);
        let userTokens = await createToken(result.id)
        res.status(200).json({ accessToken: userTokens.access_token, refreshToken: userTokens.refresh_token })
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

// This function is for updating user password

const updateUserPasswordHandler = async (req, res, next) => {
    try {

        const oldPassword = req.body.old_password;
        const newPassword = req.body.new_password;
        const newPassword2 = req.body.new_password2;

        if (!oldPassword || !newPassword || !newPassword2) {
            const error = new Error('Missing parameters, please enter all required fields!');
            error.statusCode = 403;
            throw error;
        }

        if (newPassword !== newPassword2) {
            const error = new Error('New password mismatch! please write the same new password in both fields!');
            error.statusCode = 403;
            throw error;
        }

        if (!validatePassword(newPassword)) {
            const error = new Error('Invalid password format, password should at least have 1 Capital letter, 1 small letter, 1 special character and a number with no spaces, ex:Ax@123');
            error.statusCode = 403;
            throw error;
        }

        let user = await getUserById(req.user.id);

        const valid = await checkPassword(oldPassword, user.user_password);
        if (valid) {
            user = await updateUserPassword(user.id, newPassword);
            const response = {
                status: 200,
                message: 'Password updated successfully',
            };
            res.status(200).json(response);
        } else {
            const error = new Error('Old password is incorrect!');
            error.statusCode = 403;
            throw error;
        }
    } catch (e) {
        next(e);
    }
};

const updateUserResetPasswordHandler = async (req, res, next) => {
    try {

        const newPassword = req.body.new_password;
        const newPassword2 = req.body.new_password2;

        if (!newPassword || !newPassword2) {
            const error = new Error('Missing parameters, please enter all required fields!');
            error.statusCode = 403;
            throw error;
        }

        if (newPassword !== newPassword2) {
            const error = new Error('New password mismatch! please write the same new password in both fields!');
            error.statusCode = 403;
            throw error;
        }

        if (!validatePassword(newPassword)) {
            const error = new Error('Invalid password format, password should at least have 1 Capital letter, 1 small letter, 1 special character and a number with no spaces, ex:Ax@123');
            error.statusCode = 403;
            throw error;
        }

        let user = await getUserById(req.user.id);

        if (user) {
            user = await updateUserPassword(user.id, newPassword);
            const response = {
                status: 200,
                message: 'Password updated successfully',
            };
            res.status(200).json(response);
        } else {
            const error = new Error('Something went wrong!');
            error.statusCode = 403;
            throw error;
        }
    } catch (e) {
        next(e);
    }
};

const updateUserEmailHandler = async (req, res, next) => {
    try {

        const oldEmail = req.body.old_email;
        const newEmail = req.body.new_email;

        if (!oldEmail || !newEmail) {
            const error = new Error('Missing parameters, old email or new email');
            error.statusCode = 403;
            throw error;
        }

        let user = await getUserById(req.user.id);


        if (user) {

            let fixedEmailOld = oldEmail.toLowerCase().trim();
            let fixedEmailNew = newEmail.toLowerCase().trim();

            if (!validateEmail(fixedEmailNew)) {
                const error = new Error('Invalid email format, please write a correct email address!');
                error.statusCode = 403;
                throw error;
            }

            if (user.email !== fixedEmailOld) {
                const error = new Error('Old email entry does not match your own email!');
                error.statusCode = 403;
                throw error;
            }
            user = await updateUserEmail(req.user.id, fixedEmailNew);
            const response = {
                status: 200,
                message: 'Email updated successfully',
            };
            res.status(200).json(response);
        } else {
            const error = new Error('Something went wrong while getting user data!');
            error.statusCode = 403;
            throw error;
        }
    } catch (e) {
        next(e);
    }
};

const updateUserMobileHandler = async (req, res, next) => {
    try {

        const country = req.body.country_code;
        const oldMobile = req.body.old_mobile;
        const newMobile = req.body.new_mobile;

        if (!oldMobile || !newMobile || !country) {
            const error = new Error('Missing parameters, please fill all required fields!');
            error.statusCode = 403;
            throw error;
        }


        let user = await getUserById(req.user.id);

        if (user) {
            let fixedMobileOld = oldMobile.trim();
            let fixedMobileNew = newMobile.trim();

            if (user.mobile !== fixedMobileOld) {
                const error = new Error('Old mobile entry does not match your mobile number!');
                error.statusCode = 403;
                throw error;
            }

            user = await updateUserMobile(req.user.id, country, fixedMobileNew);
            const response = {
                status: 200,
                message: 'mobile updated successfully',
            };
            res.status(200).json(response);
        } else {
            const error = new Error('Old mobile is incorrect!');
            error.statusCode = 403;
            throw error;
        }
    } catch (e) {
        next(e);
    }
};

const resetPasswordHandler = async (req, res, next) => {
    try {
        let { email, password, code } = req.body;

        if (!code || !password) {
            const error = new Error('Missing parameters,code or password');
            error.statusCode = 403;
            throw error;
        }

        if (!validatePassword(password)) {
            const error = new Error('Invalid password format, password should at least have 1 Capital letter, 1 small letter, 1 special character and a number, ex:Ax@123');
            error.statusCode = 403;
            throw error;
        }


        const error = new Error('The code is not correct or has expired');
        error.statusCode = 403;
        throw error;
    } catch (e) {
        next(e);
    }
};

const refreshHandler = async (req, res, next) => {
    try {
        const user = await authenticateWithToken(req.body.refresh_token, 'refresh');
        if (user) {
            await deleteToken(user.id);
            const newTokens = await createToken(user.id);
            delete newTokens.id;
            delete newTokens.user_id;
            res.status(200).json(newTokens);
        } else {
            const error = new Error('Invalid token');
            error.statusCode = 403;
            throw error;
        }
    } catch (e) {
        next(e);
    }
};

const addAdminHandler = async (req, res, next) => {
    try {

        let admin = await addAdmin(req.user.id);
        if(admin){
            res.status(200).json('Adminstrator has been added!')
        
        } else {
            const error = new Error('Something went wrong!');
            error.statusCode = 403;
            throw error;
        }
    } catch (e) {
        next(e);
    }
};

const addModHandler = async (req, res, next) => {
    try {

        let mod = await addMod(req.user.id);
        if(mod){
            res.status(200).json('Moderator has been added!')
        
        } else {
            const error = new Error('Something went wrong!');
            error.statusCode = 403;
            throw error;
        }
    } catch (e) {
        next(e);
    }
};

const banUserHandler = async (req, res, next) => {
    try {

        let {mobile} = req.body;
        let banned = await banUser(mobile);
        if(banned){
            res.status(200).json('User has been banned!')
        
        } else {
            const error = new Error('Something went wrong!');
            error.statusCode = 403;
            throw error;
        }
    } catch (e) {
        next(e);
    }
};

const removeBanUserHandler = async (req, res, next) => {
    try {

        let {mobile} = req.body;
        let banned = await unbanUser(mobile);
        if(!banned){
            res.status(200).json('Ban has been removed from the user!')
        
        } else {
            const error = new Error('Something went wrong!');
            error.statusCode = 403;
            throw error;
        }
    } catch (e) {
        next(e);
    }
};

const getAllUsersHandler = async (req, res, next) => {
    try {

        let users = await getAllUsers();
        if(users){
            res.status(200).json(users)
        
        } else {
            const error = new Error('Something went wrong!');
            error.statusCode = 403;
            throw error;
        }
    } catch (e) {
        next(e);
    }
};

module.exports = {
    signupHandler,
    signInHandler,
    signOutHandler,
    addAdminHandler,
    addModHandler,
    banUserHandler,
    removeBanUserHandler,
    updateUserPasswordHandler,
    updateUserResetPasswordHandler,
    updateUserEmailHandler,
    updateUserMobileHandler,
    resetPasswordHandler,
    refreshHandler,
    getAllUsersHandler
}