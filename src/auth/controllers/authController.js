'use strict';
const os = require('os');
const clientForVerification = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const { signup,
    getUserById,
    getUserByEmail,
    getUserByMobile,
    getUserIdFromToken,
    getAllUsers,
    getProfileById,
    getProfilePictureByProfileId,
    createProfile,
    addAdmin,
    addMod,
    removeMod,
    banUser,
    unbanUser,
    updateUserPassword,
    updateUserEmail,
    updateUserMobile,
    updateProfilersModel,
    updateUserModel,
    updateProfileMobile,
    getTokenByUserId,
    deactivateAccount,
    getAllBannedUsers,
    updateProfileEmail,
    updateNotification_store,
    updateNotification_all,
    updateNotification_city,
} = require('../models/user');
const { addCartModel } = require('../../api/models/cart')
const { authenticateWithToken, getToken } = require('../models/helpers')
const { addProfilePicture } = require('../../api/models/profilePicture')
const { createToken, deleteToken, updateTokens, getTokenRecord } = require('../models/jwt')
const { validateEmail, validatePassword, checkPassword } = require('./helpers');


const signupHandler = async (req, res, next) => {
  try {
    let {
      email,
      password,
      country_code,
      mobile,
      country,
      city,
      first_name,
      last_name,
    } = req.body;
    let emailCheck = await getUserByEmail(email);
    let mobileCheck = await getUserByMobile(mobile);

    if (
      !email ||
      !password ||
      !country_code ||
      !mobile ||
      !country ||
      !city ||
      !first_name ||
      !last_name
    ) {
      res.json({
        status: 403,
        message: "Missing parameters, please fill all the required fields!",
      });
    } else if (!validateEmail(email)) {
      res.json({
        status: 403,
        message: "Invalid email format, please write a correct email!",
      });
    } else if (!validatePassword(password)) {
      res.json({
        status: 403,
        message: [
          `Invalid password format, password should have at least:`,
          `1- One capital letter.`,
          `2- One small letter.`,
          `3- One special character.`,
          `4- One number.`,
          `5- Characters between 6-16.`,
          `ex:Ax@123`,
        ],
      });
    } else if (emailCheck) {
      res.json({
        status: 403,
        message:
          "This email is already in use, please write a different email address!",
      });
    } else if (mobileCheck) {
      res.json({
        status: 403,
        message:
          "This mobile is already in use, please write a different mobile number!",
      });
    } else {
      let result = await signup(req.body);

      let result2 = await createProfile(result);
      if (req.file) {
        await addProfilePicture({
          profile_id: result2.id,
          profile_picture: req.file.location,
        });
      } else {
        await addProfilePicture({
          profile_id: result2.id,
          profile_picture: process.env.DEFAULT_PROFILE_PICTURE,
        });
      }

      await addCartModel(result2.id);
      let userTokens = await createToken(result.id);
      res.json({
        status: 200,
        accessToken: userTokens.access_token,
        refreshToken: userTokens.refresh_token,
      });
    }
  } catch (error) {
    next(error);
  }
};
const getProfileHandler = async (req, res, next) => {
  try {
    let id = req.user.profile_id;
    let user = await getProfileById(id);
    if (user) {
      delete user.id;
      delete user.user_id;
      delete user.profile_picture;
    }
    let picture = await getProfilePictureByProfileId(id);
    if (picture) {
      delete picture.id;
      delete picture.profile_id;
    }
    if (user) {
      res.json({ status: 200, ...user, ...picture });
    } else {
      res.json({
        status: 403,
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    res.json({
      status: 403,
      message: "Invalid token!",
      error: error.message,
    });
    // next(error);
  }
};

const updateProfilers = async (req, res, next) => {
  try {
    let id = req.user.id;
    let profile_id = req.user.profile_id;
    let dataProfile = await getUserById(req.user.id);
    let result = await updateProfilersModel(
      { ...dataProfile, ...req.body },
      id
    );
    if(result){
      delete result.id;
      delete result.user_id;
      delete result.profile_picture;
    }
    let resultFromProfile = await updateUserModel(
      { ...dataProfile, ...req.body },
      id
    );
    // let picture = await getProfilePictureByProfileId(profile_id);
    // if (picture) {
    //   delete picture.id;
    //   delete picture.profile_id;
    // }
    let response = {
      status: 200,
       ...result,
      // picture: picture.profile_picture
      // user: resultFromProfile,
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
};

// This handler is to return user access and refresh tokens on signin request:

const signInHandler = async (req, res, next) => {
  try {
    delete req.tokens.created_at;
    res.json({ status: 200, ...req.tokens });
  } catch (error) {
    next(error);
  }
};

// This handler is to delete the user's access and refresh tokens on sign out request:

const signOutHandler = async (req, res, next) => {
  try {
    await deleteToken(req.headers.session_id);
    res.json({
      status: 200,
      message: "successfully signed out",
    });
  } catch (error) {
    next(error);
  }
};

// This function is for updating user password

const updateUserPasswordHandler = async (req, res, next) => {
  try {
    const oldPassword = req.body.current;
    const newPassword = req.body.new;
    const newPassword2 = req.body.re_type_new;

    let user = await getUserById(req.user.id);
    const valid = await checkPassword(oldPassword, user.user_password);

    if (!oldPassword || !newPassword || !newPassword2) {
      res.json({
        status: 403,
        message: "Missing parameters, please enter all required fields!",
      });
    } else if (newPassword !== newPassword2) {
      res.json({
        status: 403,
        message:
          "New password mismatch! please write the same new password in both fields!",
      });
    } else if (!validatePassword(newPassword)) {
      res.json({
        status: 403,
        message: [
          `Invalid password format, password should have at least:`,
          `1- One capital letter.`,
          `2- One small letter.`,
          `3- One special character.`,
          `4- One number.`,
          `5- Characters between 6-16.`,
          `ex:Ax@123`,
        ],
      });
    } else if (valid) {
      user = await updateUserPassword(user.id, newPassword);
      const response = {
        status: 200,
        message: "Password updated successfully",
      };
      res.json(response);
    } else {
      const response = {
        status: 403,
        message: "Old password is incorrect!",
      };
      res.json(response);
    }
  } catch (e) {
    next(e);
  }
};

const updateUserResetPasswordHandler = async (req, res, next) => {
  try {
    const mobile = req.body.mobile;
    const newPassword = req.body.new;
    const newPassword2 = req.body.re_type_new;

    let user = await getUserByMobile(mobile);

    if (!newPassword || !newPassword2) {
      res.json({
        status: 403,
        message: "Missing parameters, please enter all required fields!",
      });
    } else if (newPassword !== newPassword2) {
      res.json({
        status: 403,
        message:
          "New password mismatch! please write the same new password in both fields!",
      });
    } else if (!validatePassword(newPassword)) {
      res.json({
        status: 403,
        message: [
          `Invalid password format, password should have at least:`,
          `1- One capital letter.`,
          `2- One small letter.`,
          `3- One special character.`,
          `4- One number.`,
          `5- Characters between 6-16.`,
          `ex:Ax@123`,
        ],
      });
    } else if (user) {
      user = await updateUserPassword(user.id, newPassword);
      const response = {
        status: 200,
        message: "Password updated successfully",
      };
      res.status(200).json(response);
    } else {
      res.status(403).json({
        status: 403,
        message: "Something went wrong while changing your password!",
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateUserEmailHandler = async (req, res, next) => {
  try {
    const email = req.body.email;
    let id = req.user.id;
    // let user = await getUserById(req.user.id);

    if (!email) {
      res.json({
        status: 403,
        message: "Missing parameters, email",
      });
    } else {
      let user = await updateUserEmail(id, email);
      let profile = await updateProfileEmail(id, email);
      if(profile){
        delete profile.id;
        delete profile.user_id;
        delete profile.profile_picture;
      }
      const response = {
        status: 200,
        profile,
      };
      res.json(response);
    }
  } catch (e) {
    res.send(e.message);
  }
};

const updateUserMobileHandler = async (req, res, next) => {
  try {
    let id = req.user.id;
    const newMobile = req.body.mobile;

    // let user = await getUserById(id);

    if (!newMobile) {
      res.json({
        status: 403,
        message: "Missing parameters, please enter all required fields!",
      });
    } else {
      let result = await updateUserMobile(id, newMobile);
      let resultFromProfile = await updateProfileMobile(id, newMobile);
      // let token = await getTokenByUserId(id)
      const response = {
        status: 200,
        message:
          "mobile updated successfully please verify your mobile number!",
        user: result,
        profile: resultFromProfile,
        // token: token
      };
      res.send(response);
    }
  } catch (e) {
    res.send(e.message);
  }
};

const resetPasswordHandler = async (req, res, next) => {
  let { country_code, mobile } = req.body;

  if (!mobile) {
    res.json({
      status: 403,
      message: "Missing parameters,mobile ",
    });
  }
  let user = await getUserByMobile(mobile);

  if (user) {
    clientForVerification.verify
      .services(process.env.SERVICE_ID)
      .verifications.create({
        to: "+" + country_code + mobile,
        channel: "sms",
      })
      .then((data) => {
        return res.send({
          message: "Verification was sent!",
          mobile: mobile,
          status: 200,
          data,
        });
      })
      .catch((err) => {
        res.send(err.message);
      });
  } else {
    res.send({
      message: "please enter your phone number ex:962796780751",
      status: 401,
      data,
    });
  }
};

const codePasswordHandler = async (req, res, next) => {
  let { country_code, mobile, code } = req.body;
  if (code) {
    clientForVerification.verify
      .services(process.env.SERVICE_ID)
      .verificationChecks.create({
        to: "+" + country_code + mobile,
        code: code,
      })
      .then(async (data) => {
        if (data.status === "approved") {
          return res.send({
            message: "User has been Verified successfully!",
            status: 200,
            data,
          });
        } else {
          res.send({
            message: "Wrong phone number or code :(",
            status: 401,
            data,
          });
        }
      })
      .catch((err) => {
        res.send(err.message);
      });
  }
  return "the code is not exist !!";
};

const refreshHandler = async (req, res, next) => {
    try {

        const user = await authenticateWithToken(req.headers.authorization.split(' ').pop(), 'refresh');
        const tokenRecord = await getTokenRecord(req.headers.authorization.split(' ').pop(),req.headers.session_id, 'refresh')
        if (user && tokenRecord) {
            // await deleteToken(user.session_id);
            const newTokens = await updateTokens(user.id,req.headers.session_id );
            delete newTokens.id;
            delete newTokens.user_id;
            res.json({ status: 200, ...newTokens });
        } else {
            res.json({
                status: 403,
                message: 'Invalid user refresh token or session_id!',
            });
        }
    } catch (e) {
        next(e);
    }
  
};

const addAdminHandler = async (req, res, next) => {
  try {
    let admin = await addAdmin(req.body.id);

    if (admin) {
      res.status(200).json("Adminstrator has been added!");
    } else {
      res.json({
        status: 403,
        message: "Something went wrong!",
      });
    }
  } catch (e) {
    next(e);
  }
};

const addModHandler = async (req, res, next) => {
  try {
    let { email } = req.body;
    let mod = await addMod(email);
    if (mod === 0) {
      res.json({
        status: 403,
        message: "You can't add an admininstrator as a moderator!",
      });
    }

    if (mod === -1) {
      res.json({
        status: 403,
        message: "This mobile number does not exist!",
      });
    }

    if (mod === 1) {
      res.json({
        status: 403,
        message: "This user is already a moderator!",
      });
    }

    if (mod) {
      res.status(200).json("Moderator has been added!");
    } else {
      res.status(403).json({
        status: 403,
        message: "Something went wrong!",
      });
    }
  } catch (e) {
    next(e);
  }
};

const removeModHandler = async (req, res, next) => {
  try {
    let { email } = req.body;
    let remove = await removeMod(email);
    if (!remove) {
      res.status(200).json("Moderator has been removed!");
    } else {
      res.status(403).json({
        status: 403,
        message: "Something went wrong!",
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
      res.status(200).json("User has been banned!");
    }
    if (banned === 0) {
      res.json({
        status: 403,
        message: "You can't ban an admininstrator!",
      });
    } else {
      res.json({
        status: 403,
        message: "Something went wrong!",
      });
    }
  } catch (e) {
    next(e);
  }
};

const removeBanUserHandler = async (req, res, next) => {
  try {
    let { id } = req.body;
    let banned = await unbanUser(id);
    if (!banned) {
      res.status(200).json("Ban has been lifted from the user!");
    } else {
      res.json({
        status: 403,
        message: "Something went wrong!",
      });
    }
  } catch (e) {
    next(e);
  }
};

const getAllBannedUsersHandler = async (req, res) => {
  try {
    let response = await getAllBannedUsers();
    res.json({ status: 200, ...response });
  } catch (error) {
    res.send(error.message);
  }
};

const getAllUsersHandler = async (req, res, next) => {
    try {

        let users = await getAllUsers();
        if (users) {
            res.json({ status: 200, users })

        } else {
            res.json({
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
    let result = await deactivateAccount(req.user.id);
    res.send({status:200,message:"your account has been deactivated"});
  } catch (error) {
    next(error);
  }
};

const updateNotification_allHandler = async (req, res) => {
  try {
    let data = await updateNotification_all({
      profile_id: req.user.profile_id,
      boolean: req.body.boolean,
    });
    res.send({ status: 200, ...data });
  } catch (error) {
    res.send({ status: 403, error: error.message });
  }
};
const updateNotification_storeHandler = async (req, res) => {
    try {
        let data = await updateNotification_store({ profile_id: req.user.profile_id, boolean: req.body.boolean });
        console.log("🚀 ~ file: authController.js ~ line 584 ~ constupdateNotification_storeHandler=async ~ data", data)
        res.send({ status: 200, data });
    } catch (error) {
        res.send({ status: 403, error: error.message })
    }
}
const updateNotification_cityHandler = async (req, res) => {
    try {
        let data = await updateNotification_city({ profile_id: req.user.profile_id, boolean: req.body.boolean });
        res.status(200).send(data);
    } catch (error) {
        res.send({ status: 403, error: error.message })
    }
}

const refreshAccessToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ').pop();
        let resfreshToken =  await getTokenRecord(token, 'refresh')
        let result = await updateTokens(resfreshToken.user_id);
        res.send({ status: 200, result })
    } catch (error) {
        res.send(error.message)
    }
}
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
    getProfileHandler,
    updateProfilers,
    deactivateAccountHandler,
    codePasswordHandler,
    getAllBannedUsersHandler,
    updateNotification_storeHandler,
    updateNotification_allHandler,
    updateNotification_cityHandler,
    refreshAccessToken
}
