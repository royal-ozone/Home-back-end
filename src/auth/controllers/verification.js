'use strict';

const {updateUserVerification,getUserByMobile} = require('../models/user');

const clientForVerification = require('twilio')(process.env.ACCOUNT_SID ,process.env.AUTH_TOKEN);


const sendVerificationCodeHandler = (req, res, next) => {
  if(req.body.mobile){
    clientForVerification
    .verify
    .services(process.env.SERVICE_ID)
    .verifications
    .create({
        to:`+${req.body.mobile}`,
        channel:req.body.channel ==='call'?"call":"sms"
    })
    .then((data) => {
        res.status(200).send({
            message:"Verification is send !!",
            mobile: req.body.mobile,
            data
        });
    })
    .catch((err) =>{
        res.send(err.message)
    } )
  }else{
      res.status(401).send({
          message:"please enter your phone number ex:962796780751",
          data
      })
  }
   
}

const verifyUserHandler = async (req, res, next) => {
    clientForVerification
    .verify
    .services(process.env.SERVICE_ID)
    .verificationChecks
    .create({
        to:`+962${req.body.mobile}`,
        code:req.body.code
    }) 
    .then(async(data) => {
        if(data.status==='approved'){
            
          let userData= await getUserByMobile(req.body.mobile);
          console.log(userData.id);

          let updateUser = await updateUserVerification(userData.id);
          
            res.status(200).send({
                message:"User is Verified!!",
                data,
                updateUser
            })
        }else{
            res.status(401).send({
                message:"Wrong phone number or code :(",
                data
            })
        }
    })
    .catch((error)=>{
        res.send(error.message)
    })

}

module.exports ={
    sendVerificationCodeHandler,
    verifyUserHandler
}
