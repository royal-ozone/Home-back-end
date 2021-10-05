'use strict';

const { signup, getUserById, getUserByEmail, getUserByMobile} = require('../models/user')

const signupHandler = async (req,res, next) => {
    try {
        console.log("🚀 ~ file: authController.js ~ line 8 ~ signupHandler ~ req.body", req.body)
      let result = await signup(req.body)
        res.json(result)
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = {signupHandler}