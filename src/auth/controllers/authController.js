'use strict';

const { signup,
    getUserById,
    getUserByEmail,
    getUserByMobile,
    getUserIdFromToken,
    createProfile,
    updateUserPassword,
    updateUserEmail,
    updateUserMobile, } = require('../models/user')

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

const updateUserPasswordHandler = async (req, res, next) => {
    try {
        const oldPassword = req.body.old_password;
        const newPassword = req.body.new_password;
        if (!oldPassword || !newPassword) {
            const error = new Error('Missing parameters, old password or new password');
            error.statusCode = 403;
            throw error;
        }

        if (!validatePassword(newPassword)) {
            const error = new Error('Invalid password format, password should at least have 1 Capital letter, 1 small letter, 1 special character and a number, ex:Ax@123');
            error.statusCode = 403;
            throw error;
        }

        // console.log('request:',req)

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

const UpdateUserEmailHandler = async (req, res, next) => {
    try {
        const oldEmail = req.body.old_email;
        const newEmail = req.body.new_email;
        if (!oldEmail || !newEmail) {
            const error = new Error('Missing parameters, old email or new email');
            error.statusCode = 403;
            throw error;
        }

        if (!validateEmail(newEmail)) {
            const error = new Error('The email is not valid');
            error.statusCode = 403;
            throw error;
        }

        let user = await getUserById(req.user.id);
        const check = await getUserByEmail(newEmail);
        if (!check) {
            user = await updateUserEmail(user.id, newPassword);
            const response = {
                status: 200,
                message: 'Email updated successfully',
            };
            res.status(200).json(response);
        } else {
            const error = new Error('Old Email is incorrect!');
            error.statusCode = 403;
            throw error;
        }
    } catch (e) {
        next(e);
    }
};

const UpdateUserMobileHandler = async (req, res, next) => {
    try {
        const oldMobile = req.body.old_mobile;
        const newMobile = req.body.new_mobile;
        if (!oldMobile || !newMobile) {
            const error = new Error('Missing parameters, old mobile or new mobile');
            error.statusCode = 403;
            throw error;
        }

        let user = await getUserById(req.user.id);
        const check = await getUserByMobile(newMobile);
        if (!check) {
            user = await updateUserEmail(user.id, newMobile);
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

module.exports = {
    signupHandler,
    signInHandler,
    signOutHandler,
    updateUserPasswordHandler,
    UpdateUserEmailHandler,
    UpdateUserMobileHandler,
    resetPasswordHandler,
    refreshHandler
}