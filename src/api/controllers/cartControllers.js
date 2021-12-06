'use strict';

const {addCartItemModel,removeCartItemModelByCartId,getAllCartItemModel,getAllCartModel,updateCart,updateCartItemQuantity,removeCartItemById} = require('../models/cart');

const updateCartHandler = async (req, res) =>{
    try {
        let result = await updateCart({address_id:req.body.address_id, id: req.user.cart_id})
        if(result.id){
            res.status(200).json({message:'cart updated successfully',...result})
        } else {
            res.status(403).send('something went wrong while updating cart', result)
        }
    } catch (error) {
        res.send(error.message)
    }
}
const updateCartItemQuantityHandler = async (req, res) =>{
    try {
        let result = await updateCartItemQuantity(req.body)
        if(result.id){
            res.status(200).json({message:'cart updated successfully',...result})
        } else{
            res.status(403).send('something went wrong while updating cart', result)
        }
    } catch (error) {
        res.send(error.message)
    }
}
const addCartItemHandler =async (req, res)=>{
    try {
        let data= await addCartItemModel(req.user.cart_id,req.body);
        if(data.id){
            let response = {
                message:'successfully added cart item ',
                ...data
            }
            res.status(200).send(response)
        } else {
            res.status(403).send(data)
        }
    } catch (error) {
        let response = {
            message: error.message,
        }
        res.status(400).send(response)
    }
}
const removeCartItemByCartIdHandler =async (req, res)=> {
    try {
        
        let data = await removeCartItemModelByCartId(req.body.id)
        if(data){
            let response = {
                message: 'Successfully removed cart item',
                ...data
            }
            return res.status(200).send(response) ;
        } else{
            return res.status(403).send('something went wrong while removing the item') ;
        }
      
    } catch (error) {
        let response = {
            message: error.message,
        }
        return res.status(403).send(response) ;
    }
}
const removeCartItemByIdHandler =async (req, res)=> {
    try {
        
        let data = await removeCartItemById(req.body.id)
        if(data){
            let response = {
                message: 'Successfully removed cart item',
                ...data
            }
            return res.status(200).send(response) ;
        } else{
            return res.status(403).send('something went wrong while removing the item') ;
        }
      
    } catch (error) {
        let response = {
            message: error.message,
        }
        return res.status(403).send(response) ;
    }
}
const getAllCartItemHandler = async (req, res) => {
    try {
            let data = await getAllCartItemModel(req.user.cart_id)
            let response = {
                message: 'Successfully get all cart item',
                data:data
            }
            res.status(200).send(response) ;
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
module.exports = {addCartItemHandler,removeCartItemByCartIdHandler,removeCartItemByIdHandler,getAllCartItemHandler,getAllCartHandler,updateCartHandler,updateCartItemQuantityHandler};