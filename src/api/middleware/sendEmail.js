const nodemailer = require("nodemailer");
// async..await is not allowed in global scope, must use a wrapper

const sendEmail = async (req, res) => {
console.log("🚀 ~ file: sendEmail.js ~ line 5 ~ sendEmail ~ req", req.store)

    // send mail with defined transport object
    try {
        let transporter = nodemailer.createTransport({
          host: "smtp-mail.outlook.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user:'emranaloul1992@hotmail.com', // generated ethereal user
            pass: 'Oquwtehome10$', // generated ethereal password
          },
          tls:{
              rejectUnauthorized: false,
          }
        });

       const message = `<p>Dear Seller<br>
       
       Kindly find your email conirmation code <a href="">${req.store.verification_code}</a>.<br>

       Regards,
       </p>`
        
        let info = await transporter.sendMail({
          from: '"Horizon" <emranaloul1992@hotmail.com>', // sender address
          to: `${req.store.email}`, // list of receivers
          subject: "Seller Account Verification", // Subject line
          text: "Your seller account verification code", // plain text body
          html: message, // html body
        });
        
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        if(info.messageId){
            res.send( {message:'Verification code has been sent to your email', result: req.store})
        }
        // Preview only available when sending through an Ethereal account
    } catch (error) {
       res.send(error)
    }
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}
  // create reusable transporter object using the default SMTP transport

module.exports = sendEmail