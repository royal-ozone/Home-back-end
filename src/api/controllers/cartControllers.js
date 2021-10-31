'use strict';

const {getProfileByUserId, getAddressByProfileId} = require('../../auth/models/user')
const {getAddressByProfileIdModel} = require('../models/address');
const {addCartModel,addCartItemModel,getCartByProfileId} = require('../models/cart');
const addCartHandler= async (req, res,next) => {
    try {
        let result = await getProfileByUserId(req.user.id);
        let address = await getAddressByProfileIdModel(result.id);
        let data = await addCartModel(address.id,result);
        let response = {
            message:'successfully add cart ',
            data : data
        }
        res.status(200).send(response);
    } catch (error) {
        let response = {
            message: error.message,
        }
        res.status(430).send(response)
    }
}
const addCartItemHandler =async (req, res, next)=>{
    try {
        let result = await getCartByProfileId(req.user.profile_id)
        console.log("🚀 ~ file: cartControllers.js ~ line 26 ~ addCartItemHandler ~ result", result)
        let data= await addCartItemModel(result.id,req.body);
        console.log("🚀 ~ file: cartControllers.js ~ line 28 ~ addCartItemHandler ~ data", data)
        let response = {
            message:'successfully add cart item ',
            data :data
        }
        res.status(200).send(response)
    } catch (error) {
        let response = {
            message: error.message,
        }
        res.status(400).send(response)
    }
}
module.exports = {addCartHandler,addCartItemHandler};