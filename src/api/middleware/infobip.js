let InfoBip = require('infobip-nodejs')

let APIKEY = 'f930f85a8f33e8952b94b5d50f2c6b0f-9836fef3-0a57-4242-9e77-4242f8e3d51d'
const environment = process.env.NODE_ENV
const isProduction = (environment === 'production')

const infobip = new InfoBip(APIKEY, false, {
  authType:'basic',
  username:'emranaloul', // Infobip Username used for registration
  password:'Emran@2134', // Infobip Password used for registration
  encrypted:false,
  baseHost: 'r546z1.api.infobip.com'
})

const sendSMS = async(req, res) => {
    // infobip.engageMock()

    let promise = infobip.sendVoice({
        from: "ServiceSMS", // Sender ID
        to: "+962798257891", // Airtel Number
        language: "en",
        voice: {
          name: "Paul",
          gender: "male"
        },
        text: "Just Saying Hello"
      });
    try {
        let body = await promise
        console.log("🚀 ~ file: infobip.js ~ line 29 ~ sendSMS ~ body", body)
    } catch (error) {
        console.error(error)
    }

}

module.exports = sendSMS