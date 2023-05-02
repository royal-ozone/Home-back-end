const https = require("follow-redirects").https;
const fs = require("fs");
const axios = require("axios");
const options = {
  method: "POST",
  url: "https://r5x5zm.api.infobip.com/sms/2/text/advanced",
  headers: {
    Authorization:
      "App 6852e90c84b379c8750912438a48d136-604de995-dadf-4abb-97f4-11317ff18771",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const sendMessage = async (req, res) => {
  try {
    let data = await axios({
      ...options,
      data: {
        messages: [
          {
            destinations: [
              {
                to: "962797912421",
              },
              {
                to: "962798257981",
              },
            ],
            from: "Horizon",
            text: "horizon test",
          },
        ],
      },
    });
   
    res.status(200).send('the message sent successfully');
  } catch (error) {
    res.status(403).send(error);
  }
};

// var req = https.request(options, function (res) {
//     var chunks = [];

//     res.on("data", function (chunk) {
//         chunks.push(chunk);
//     });

//     res.on("end", function (chunk) {
//         var body = Buffer.concat(chunks);
//         console.log(body.toString());
//     });

//     res.on("error", function (error) {
//         console.error(error);
//     });
// });

// var postData = JSON.stringify({
//     "messages": [
//         {
//             "destinations": [
//                 {
//                     "to": "41793026727"
//                 }
//             ],
//             "from": "InfoSMS",
//             "text": "This is a sample message"
//         }
//     ]
// });

// req.write(postData);

// req.end();

module.exports = sendMessage;
