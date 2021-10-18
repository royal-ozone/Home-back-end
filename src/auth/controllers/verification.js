'use strict';

const {updateUserVerification,getUserByMobile,getUserIdFromToken,getMobileById} = require('../models/user');

const clientForVerification = require('twilio')(process.env.ACCOUNT_SID ,process.env.AUTH_TOKEN);


const sendVerificationCodeHandler = async (req, res, next) => {

    let userData = await getMobileById(req.user.id);
    
  if(userData){
    clientForVerification
    .verify
    .services(process.env.SERVICE_ID)
    .verifications
    .create({
        to:'+'+userData.country_code+userData.mobile,
        channel:'sms'
    })
    .then((data) => {
        res.status(200).send({
            message:"Verification is send !!",
            mobile: userData.mobile,
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

    let userData = await getMobileById(req.user.id);
    console.log("🚀 ~ file: verification.js ~ line 53 ~ verifyUserHandler ~ userData", userData)

    clientForVerification
    .verify
    .services(process.env.SERVICE_ID)
    .verificationChecks
    .create({
        to:'+'+userData.country_code+userData.mobile,
        code:req.body.code
    }) 
    .then(async(data) => {
        if(data.status==='approved'){
            
          let updateUser = await updateUserVerification(req.user.id);
          
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

const sendMessageHandler = (req, res, next) => {
    clientForVerification
    .messages
    .create({
        body: req.body.message,
        to: `+${req.body.mobile}`,
        from: "+13512474291"
       
    })
    .then(message => {
        res.status(200).send({
            message: message.body,
            message
        })
        console.log(message)
    })
  // here you can implement your fallback code
  .catch(error => console.log(error))

}

module.exports ={
    sendVerificationCodeHandler,
    verifyUserHandler,
    sendMessageHandler
}
