const https = require('https');
const querystring = require('querystring');

const payment = async (req, res, next) => {
    try {
        const request = async () => {
            const path='/v1/checkouts';
            const data = querystring.stringify({
                'entityId':'8a8294174b7ecb28014b9699220015ca',
                'amount':'92.00',
                'currency':'EUR',
                'paymentType':'DB'
            });
            const options = {
                port: 443,
                host: 'eu-test.oppwa.com',
                path: path,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': data.length,
                    'Authorization':'Bearer OGE4Mjk0MTc0YjdlY2IyODAxNGI5Njk5MjIwMDE1Y2N8c3k2S0pzVDg='
                }
            };
            return new Promise((resolve, reject) => {
                const postRequest = https.request(options, function(res) {
                    const buf = [];
                    res.on('data', chunk => {
                        buf.push(Buffer.from(chunk));
                    });
                    res.on('end', () => {
                        const jsonString = Buffer.concat(buf).toString('utf8');
                        try {
                            resolve(JSON.parse(jsonString));
                        } catch (error) {
                            reject(error);
                        }
                    });
                });
                postRequest.on('error', reject);
                postRequest.write(data);
                postRequest.end();
            });
        };
        // res.status(200).send(await Promise.all(request()))
        request().then((response) => {
            res.send(response)
        }).catch(console.error);        
    } catch (error) {
        res.status(403).send(error.message)
    }
}

module.exports = payment