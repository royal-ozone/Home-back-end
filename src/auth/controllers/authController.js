'use strict';

const { signup, getUserById, getUserByEmail, getUserByMobile,getUserIdFromToken} = require('../models/user')
const {createToken} = require('../models/jwt')
const signupHandler = async (req,res, next) => {
    try {
      let result = await signup(req.body)
      console.log(result,'pojoooooooooo');
      let userTokens = await createToken(result.id)
      console.log(userTokens,'apjccccccccccccccc');
        res.status(200).json({accessToken:userTokens.access_token,refreshToken:userTokens.refresh_token, result} )
    } catch (error) {
        res.send(error.message)
    }
};


const signinHandler = async (req, res, next) =>{
try {
    
} catch (error) {
    
}
}



module.exports = {signupHandler, signinHandler}