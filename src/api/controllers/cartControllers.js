'use strict';

const {getProfileByUserId, getAddressByProfileId} = require('../../auth/models/user')
const {getAddressByProfileIdModel} = require('../models/address');
const {addCartModel,addCartItemModel,getCartByProfileId,removeCartItemModel,getCartItemByIdModel,getAllCartItemModel,getAllCartModel,getCartByProfileIdModel} = require('../models/cart');
const addCartHandler= async (req, res,next) => {
    try {
        let result = await getProfileByUserId(req.user.id);
        let address = await getAddressByProfileIdModel(result.id);
        let cartData = await getCartByProfileIdModel(req.user.profile_id);
        if(!cartData){
            let data = await addCartModel(address.id,result);
            let response = {
                message:'successfully add cart ',
                data : data
            }
            res.status(200).send(response);
        }
        res.status(403).send('the cart is added already')
       
    } catch (error) {
        let response = {
            message: error.message,
        }
        res.status(430).send(response)
    }
}
const addCartItemHandler =async (req, res, next)=>{
    try {
        let product_id =req.query.productId;
        let result = await getCartByProfileId(req.user.profile_id)
        let data= await addCartItemModel(result.id,req.body,product_id);
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
const removeCartItemHandler =async (req, res, next)=> {
    try {
        let cart_item_id = req.query.id;
        
        let checkData =await getCartItemByIdModel(cart_item_id)
        console.log("🚀 ~ file: cartControllers.js ~ line 44 ~ removeCartItemHandler ~ checkData", checkData)
        if(checkData){
            let data = await removeCartItemModel(cart_item_id)
            let response = {
                message: 'Successfully remove cart item',
                data:data
            }
            return res.status(200).send(response) ;
        }
        return res.status(403).send('the cart item is not found') ;
      
    } catch (error) {
        let response = {
            message: error.message,
        }
        return res.status(403).send(response) ;
    }
}
const getAllCartItemHandler = async (req, res , next) => {
    try {
      
       
        
            let data = await getAllCartItemModel()
            let response = {
                message: 'Successfully get all cart item',
                data:data
            }
            return res.status(200).send(response) ;
        
        
    } catch (error) {
        let response = {
            message: error.message,
        }
        return res.status(403).send(response) ;
    }
}
const getAllCartHandler = async (req, res, next) => {
    try {
        let data = await getAllCartModel()
        let response ={
            message:'successfully get all cart',
            all_cart :data
        }
        res.status(200).send(response) ;
    } catch (error) {
        let response = {
            message: error.message,
        }
        return res.status(403).send(response) ;
    }
}
module.exports = {addCartHandler,addCartItemHandler,removeCartItemHandler,getAllCartItemHandler,getAllCartHandler};