'use strict';

const {updateUserVerification,getUserByMobile,getUserIdFromToken,getMobileById} = require('../models/user');

const clientForVerification = require('twilio')(process.env.ACCOUNT_SID ,process.env.AUTH_TOKEN);


const sendVerificationCodeHandler = async (req, res, next) => {
    let token = req.headers.authorization.split(' ').pop();
   
    let userId = await getUserIdFromToken(token);
    console.log("🚀 ~ file: verification.js ~ line 12 ~ sendVerificationCodeHandler ~ userId", userId)
    
    let userData = await getMobileById(userId);
   
    
   console.log(typeof(userData.country_code),'aaaaaaaaaaaaaaaaaaaaaaaaaaa')
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
    let token = req.headers.authorization.split(' ').pop();
   
    let userId = await getUserIdFromToken(token);
    
    let userData = await getMobileById(userId);

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
            
        //   let userData= await getUserByMobile(userData.mobile);
        //   console.log(userData?userData.id:null);

          let updateUser = await updateUserVerification(userId);
          
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
