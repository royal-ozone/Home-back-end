'use strict';
const {getTokenRecord} = require('../models/jwt');
const { authenticateWithToken } = require('../models/helpers');
const {getProfileByUserId} = require('../models/user')

module.exports =async (req,res, next)=>{
    try {
        if(!req.headers.authorization){
            _authError();
        }
        let token = req.headers.authorization.split(' ').pop();
        
        let tokenRecord = await  getTokenRecord(token);
        
        if(!tokenRecord) {
            throw new Error(' Invalid token');
        }

        let validUser = await authenticateWithToken(token,'access');
        console.log(req.user = validUser);
        let userProfile = await getProfileByUserId(validUser.id);
        console.log(userProfile);
        next();
    
    } catch (error) {
        throw new Error(error.message);
    }
    function _authError() {
        next('Invalid Login');
      }
   
}