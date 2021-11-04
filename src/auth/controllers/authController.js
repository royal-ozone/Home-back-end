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
    removeMod,
    banUser,
    unbanUser,
    updateUserPassword,
    updateUserEmail,
    updateUserMobile, updateProfilersModel, updateUserModel, updateProfileMobile, getTokenByUserId, deactivateAccount,
} = require('../models/user')

const { authenticateWithToken, getToken } = require('../models/helpers')

const { createToken, deleteToken } = require('../models/jwt')
const { validateEmail, validatePassword, checkPassword } = require('./helpers');


const signupHandler = async (req, res, next) => {
    try {
        let { email, password, country_code, mobile, country, city, first_name, last_name } = req.body;
        let emailCheck = await getUserByEmail(email);
        let mobileCheck = await getUserByMobile(mobile);

        if (!email || !password || !country_code || !mobile || !country || !city || !first_name || !last_name) {
            res.status(403).json({
                status: 403,
                message: 'Missing parameters, please fill all the required fields!',
            });
        }

        else if (!validateEmail(email)) {
            res.status(403).json({
                status: 403,
                message: 'Invalid email format, please write a correct email!',
            });
        }

        else if (!validatePassword(password)) {
            res.status(403).json({
                status: 403,
                message: [`Invalid password format, password should have at least:`,
                    `1- One capital letter.`,
                    `2- One small letter.`,
                    `3- One special character.`,
                    `4- One number.`,
                    `5- Characters between 6-16.`,
                    `ex:Ax@123`]
            });
        }


        else if (emailCheck) {
            res.status(403).json({
                status: 403,
                message: 'This email is already in use, please write a different email address!',
            });
        }


        else if (mobileCheck) {
            res.status(403).json({
                status: 403,
                message: 'This mobile is already in use, please write a different mobile number!',
            });
        }
        else {
            let result = await signup(req.body)

            await createProfile(result);
            let userTokens = await createToken(result.id)
            res.status(200).json({ accessToken: userTokens.access_token, refreshToken: userTokens.refresh_token })
        }

    } catch (error) {
        next(error);
    }
};

const updateProfilers = async (req, res, next) => {
    try {
        let id = req.params.id
        let dataProfile = await getUserById(req.user.id);

        let result = await updateProfilersModel(req.body, id)
        let resultFromProfile = await updateUserModel(req.body, id)
        let response = {
            profile: result,
            user: resultFromProfile
        }
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
}


// This handler is to return user access and refresh tokens on signin request:

const signInHandler = async (req, res, next) => {
    try {
        delete req.tokens.created_at;
        res.status(200).json(req.tokens);
    } catch (error) {
        next(error);
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
        next(error);
    }
};

// This function is for updating user password

const updateUserPasswordHandler = async (req, res, next) => {
    try {

        const oldPassword = req.body.old_password;
        const newPassword = req.body.new_password;
        const newPassword2 = req.body.new_password2;

        let user = await getUserById(req.user.id);
        const valid = await checkPassword(oldPassword, user.user_password);

        if (!oldPassword || !newPassword || !newPassword2) {
            res.status(403).json({
                status: 403,
                message: 'Missing parameters, please enter all required fields!',
            });
        }

        else if (newPassword !== newPassword2) {
            res.status(403).json({
                status: 403,
                message: 'New password mismatch! please write the same new password in both fields!',
            });
        }

        else if (!validatePassword(newPassword)) {
            res.status(403).json({
                status: 403,
                message: [`Invalid password format, password should have at least:`,
                    `1- One capital letter.`,
                    `2- One small letter.`,
                    `3- One special character.`,
                    `4- One number.`,
                    `5- Characters between 6-16.`,
                    `ex:Ax@123`]
            });
        }
        else if (valid) {
            user = await updateUserPassword(user.id, newPassword);
            const response = {
                status: 200,
                message: 'Password updated successfully',
            };
            res.status(200).json(response);
        } else {
            const response = {
                status: 403,
                message: 'Old password is incorrect!',
            };
            res.status(403).json(response);
        }
    } catch (e) {
        next(e);
    }
};

const updateUserResetPasswordHandler = async (req, res, next) => {
    try {

        const newPassword = req.body.new_password;
        const newPassword2 = req.body.new_password2;

        let user = await getUserById(req.user.id);

        if (!newPassword || !newPassword2) {
            res.status(403).json({
                status: 403,
                message: 'Missing parameters, please enter all required fields!',
            });
        }

        else if (newPassword !== newPassword2) {
            res.status(403).json({
                status: 403,
                message: 'New password mismatch! please write the same new password in both fields!',
            });
        }

        else if (!validatePassword(newPassword)) {
            res.status(403).json({
                status: 403,
                message: [`Invalid password format, password should have at least:`,
                    `1- One capital letter.`,
                    `2- One small letter.`,
                    `3- One special character.`,
                    `4- One number.`,
                    `5- Characters between 6-16.`,
                    `ex:Ax@123`]
            });
        }


        else if (user) {
            user = await updateUserPassword(user.id, newPassword);
            const response = {
                status: 200,
                message: 'Password updated successfully',
            };
            res.status(200).json(response);
        } else {
            res.status(403).json({
                status: 403,
                message: 'Something went wrong while changing your password!',
            });
        }
    } catch (e) {
        next(e);
    }
};

const updateUserEmailHandler = async (req, res, next) => {
    try {

        const oldEmail = req.body.old_email;
        const newEmail = req.body.new_email;

        let user = await getUserById(req.user.id);

        if (!oldEmail || !newEmail) {
            res.status(403).json({
                status: 403,
                message: 'Missing parameters, old email or new email',
            });
        }

        else if (user) {

            let fixedEmailOld = oldEmail.toLowerCase().trim();
            let fixedEmailNew = newEmail.toLowerCase().trim();

            if (!validateEmail(fixedEmailNew)) {
                res.status(403).json({
                    status: 403,
                    message: 'Invalid email format, please write a coorect email!',
                });
            }

            else if (user.email !== fixedEmailOld) {
                res.status(403).json({
                    status: 403,
                    message: 'Old email entry does not match your own email!',
                });
            }
            else {

                user = await updateUserEmail(req.user.id, fixedEmailNew);
                const response = {
                    status: 200,
                    message: 'Email updated successfully',
                };
                res.status(200).json(response);
            }
        }
        else {
            res.status(403).json({
                status: 403,
                message: 'Something went wrong while getting user data!',
            });
        }
    } catch (e) {
        next(e);
    }
};

const updateUserMobileHandler = async (req, res, next) => {
    try {
        let id = req.params.id
        const country = req.body.country_code;
        const oldMobile = req.body.old_mobile;
        const newMobile = req.body.new_mobile;

        let user = await getUserById(id);

        if (!oldMobile || !newMobile || !country) {
            res.status(403).json({
                status: 403,
                message: 'Missing parameters, please enter all required fields!',
            });
        }

        else if (user) {
            let fixedMobileOld = oldMobile.trim();
            let fixedMobileNew = newMobile.trim();

            if (user.mobile !== fixedMobileOld) {
                res.status(403).json({
                    status: 403,
                    message: 'Old mobile entry does not match your mobile number!',
                });
            }
            else {

                let result = await updateUserMobile(id, country, fixedMobileNew);
                let resultFromProfile = await updateProfileMobile(id, fixedMobileNew);
                let token = await getTokenByUserId(id)

                const response = {
                    status: 200,
                    message: 'mobile updated successfully please verify your mobile number!',
                    user: result,
                    profile: resultFromProfile,
                    token: token
                };
                res.status(200).send(response);
            }
        }
        else {
            res.status(403).json({
                status: 403,
                message: 'Old mobile is incorrect!',
            });
        }
    } catch (e) {
        next(e);
    }
};

const resetPasswordHandler = async (req, res, next) => {
    try {
        let { email, password, code } = req.body;

        if (!code || !password) {
            res.status(403).json({
                status: 403,
                message: 'Missing parameters,code or password',
            });
        }

        if (!validatePassword(password)) {
            res.status(403).json({
                status: 403,
                message: [`Invalid password format, password should have at least:`,
                    `1- One capital letter.`,
                    `2- One small letter.`,
                    `3- One special character.`,
                    `4- One number.`,
                    `5- Characters between 6-16.`,
                    `ex:Ax@123`]
            });
        }

        res.status(403).json({
            status: 403,
            message: 'The code is not correct or has expired',
        });
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
            res.status(403).json({
                status: 403,
                message: 'Invalid user refresh token!',
            });
        }
    } catch (e) {
        next(e);
    }
};

const addAdminHandler = async (req, res, next) => {
    try {

        let admin = await addAdmin(req.user.id);

        if (admin) {
            res.status(200).json('Adminstrator has been added!')

        } else {
            res.status(403).json({
                status: 403,
                message: 'Something went wrong!',
            });
        }
    } catch (e) {
        next(e);
    }
};

const addModHandler = async (req, res, next) => {
    try {
        let { mobile } = req.body;
        let mod = await addMod(mobile);
        if (mod === 0) {
            res.status(403).json({
                status: 403,
                message: 'You can\'t add an admininstrator as a moderator!',
            });
        }

        if (mod === -1) {
            res.status(403).json({
                status: 403,
                message: 'This mobile number does not exist!',
            });
        }

        if (mod === 1) {
            res.status(403).json({
                status: 403,
                message: 'This user is already a moderator!',
            });
        }

        if (mod) {
            res.status(200).json('Moderator has been added!')

        }
        else {
            res.status(403).json({
                status: 403,
                message: 'Something went wrong!',
            });
        }
    } catch (e) {
        next(e);
    }
};

const removeModHandler = async (req, res, next) => {
    try {
        let { mobile } = req.body;
        let remove = await removeMod(mobile);
        if (!remove) {
            res.status(200).json('Moderator has been removed!')

        } else {

            res.status(403).json({
                status: 403,
                message: 'Something went wrong!',
            });

        }
    } catch (e) {
        next(e);
    }
};
const banUserHandler = async (req, res, next) => {
    try {

        let { mobile } = req.body;
        let banned = await banUser(mobile);
        if (banned) {
            res.status(200).json('User has been banned!')

        }
        if (banned === 0) {
            res.status(403).json({
                status: 403,
                message: 'You can\'t ban an admininstrator!',
            });
        }
        else {
            res.status(403).json({
                status: 403,
                message: 'Something went wrong!',
            });
        }
    } catch (e) {
        next(e);
    }
};

const removeBanUserHandler = async (req, res, next) => {
    try {

        let { mobile } = req.body;
        let banned = await unbanUser(mobile);
        if (!banned) {
            res.status(200).json('Ban has been lifted from the user!')

        } else {
            res.status(403).json({
                status: 403,
                message: 'Something went wrong!',
            });
        }
    } catch (e) {
        next(e);
    }
};

const getAllUsersHandler = async (req, res, next) => {
    try {

        let users = await getAllUsers();
        if (users) {
            res.status(200).json(users)

        } else {
            res.status(403).json({
                status: 403,
                message: 'Something went wrong!',
            });
        }
    } catch (e) {
        next(e);
    }
};


const deactivateAccountHandler = async (req, res, next) => {
    try {
        let resdd = await deactivateAccount(req.user.id)
        res.send('your account has been deactivated')
    } catch (error) {
        next(error);
    }
};

module.exports = {
    signupHandler,
    signInHandler,
    signOutHandler,
    addAdminHandler,
    addModHandler,
    removeModHandler,
    banUserHandler,
    removeBanUserHandler,
    updateUserPasswordHandler,
    updateUserResetPasswordHandler,
    updateUserEmailHandler,
    updateUserMobileHandler,
    resetPasswordHandler,
    refreshHandler,
    getAllUsersHandler,
    updateProfilers,
    deactivateAccountHandler
}