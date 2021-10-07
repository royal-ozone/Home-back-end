'use strict';

const base64 = require('base-64');


module.exports = async (req,res,next) => {
    if(!req.headers.authorization){
        next('authorization header is not provided')
        return;
    }

    try {
        const basic = req.headers.authorization.split(' ').pop();

        const [email,password] = base64.decode(basic).split(';');


    } catch (err) {console.log(err);}
}