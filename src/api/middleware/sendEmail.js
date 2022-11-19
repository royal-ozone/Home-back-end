const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars')
const path = require('path')
// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (req, res) => {
  const {context, email, template, message, user, title} = req.emailDetails
  // send mail with defined transport object
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.email, // generated ethereal user
        pass: process.env.password, // generated ethereal password
      },
      // tls:{
      //     rejectUnauthorized: false,
      // }
    });
    const handlebarOptions = {
      viewEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve('./views'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./views'),
      extName: '.handlebars',
    };
    transporter.use('compile', hbs(handlebarOptions))

    // const message = `<p>Dear Seller<br>
       
    //    Kindly find your email confirmation code <a href="">${req.store.verification_code}</a>.<br>

    //    Regards,
    //    </p>`

    let info = await transporter.sendMail({
      from: '"Horizon" <ae-horizon@outlook.com>', // sender address
      to: `${email}`, // list of receivers
      subject: title?? "Seller Account Verification", // Subject line
      text: "Your seller account verification code", // plain text body
      template: template, // html body
      context: context
    });

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    if (info.messageId) {
      res.send({ status: 200, message: message, result: user  })
    }
    // Preview only available when sending through an Ethereal account
  } catch (error) {
    console.log("🚀 ~ file: sendEmail.js ~ line 54 ~ sendEmail ~ error", error)
    res.send({message:error})
  }
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}
// create reusable transporter object using the default SMTP transport

module.exports = sendEmail