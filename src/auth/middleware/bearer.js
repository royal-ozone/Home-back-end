'use strict';
const { getTokenRecord } = require('../models/jwt');
const { authenticateWithToken } = require('../models/helpers');
const { getProfileByUserId, getStoreIdByProfileId, getCompanyByProfileId,getCourierByProfileId } = require('../models/user')
const {getCartByProfileId} = require('../../api/models/cart')
const axios = require('axios')
// require('dotenv').config()
module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return _authError();
        }
        let token = req.headers.authorization.split(' ').pop();

        let tokenRecord = await getTokenRecord(token) ;
        console.log("🚀 ~ file: bearer.js ~ line 18 ~ module.exports= ~ `${process.env.MANAGEMENT_API}/employee`", `${process.env.MANAGEMENT_API}/employee`)
        let result = await axios({
            method: 'GET',
            url: `${process.env.MANAGEMENT_API}/employee`,
            headers: {authorization:req.headers.authorization}
        })
        console.log("🚀 ~ file: bearer.js ~ line 22 ~ module.exports= ~ result", result)
        // console.log("🚀 ~ file: bearer.js ~ line 20 ~ module.exports= ~ result", result)
        
        if (tokenRecord) {

            let validUser = await authenticateWithToken(token, 'access');
            let userProfile = await getProfileByUserId(validUser.id);
            let store = await getStoreIdByProfileId(userProfile.id);
            let company = await getCompanyByProfileId(userProfile.id);
            let courier = await getCourierByProfileId(userProfile.id);
            let cart = await getCartByProfileId(userProfile.id)

            // request.user:

            req.user = validUser;
            req.user.profile_id = userProfile.id;
            req.user.cart_id = cart? cart.id : null;
            req.user.store_id = store ? store.id : null;
            req.user.courier_company_id = company? company.id : null;
            req.user.courier_id = courier ? courier.id : null; 
            
            next();
        } 
        else if (result.data.id){
            req.employee = result.data
            next();
        }
        else {
           
            res.status(403).json({
                status: 403,
                message: 'Invalid token!',
            });
        }

    } catch (error) {
        next(error);
    }
    function _authError() {
        res.status(403).send('Header authorization is not provided');
    }

}