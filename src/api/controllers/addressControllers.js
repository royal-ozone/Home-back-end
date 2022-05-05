'use strict';

const {addAddressModel,removeAddressModel,updateAddressModel,getAllAddressModel,getAddressByProfileIdModel,getAddressById,getStoreAddress} =require('../models/address');
const {checkUserAuth} = require('./helper')

const addAddressHandler =async(req, res, next) => {
    try {
        let result = await getAddressByProfileIdModel(req.user.profile_id);
        if(result.length === 0){
            req.body.is_default =true
        } else if  (result && req.body.is_default) {
            result.map(val =>{
                updateAddressModel({...val, is_default: false})
            })
        } else {
            req.body.is_default = false
        }
        let data= await addAddressModel({profile_id: req.user.profile_id, country: req.user.country,store_id: req.user.store_id,...req.body, store_address: !!req.body.store_address})
        let response ={
            status: 200,
            message:'Successfully added your address',
            data : data
        }
        res.send(response)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const removeAddressHandler= async (req, res,next) => {
    try {
            let result = await checkUserAuth('address',req.body.id, req.user.profile_id);
            if(result !== 'not Authorized'){
                let data = await removeAddressModel(req.body.id);
                if(data){
                    let response ={
                        status: 200,
                        message:'the address has been deleted',
                        data:data
                    }
                    res.send(response)
                } else {
                    res.send({status: 403, message:'this address is not exist'})
                } 
            } else res.send({ status:403, message:result})

    } catch (error) {
        res.send({ status: 403, message:error.message})
    }
}
const getStoreAddressHandler = async (req, res)=>{
    try {
        let result = await getStoreAddress(req.user.profile_id)
        if (result.id){
            res.json({ result: result, status: 200 })
        } else{
            res.send({ status: 403, message: 'something went wrong'})
        }
    } catch (error) {
        res.send({ status: 403, message:error.message})
    }
}
const updateAddressHandler = async (req, res,next ) => {
    try {
        let result = await checkUserAuth('address',req.body.id, req.user.profile_id);
        console.log("🚀 ~ file: addressControllers.js ~ line 53 ~ updateAddressHandler ~ result", result)
        console.log("🚀 ~ file: addressControllers.js ~ line 53 ~ updateAddressHandler ~ req.user.profile_id", req.user.profile_id)
        console.log("🚀 ~ file: addressControllers.js ~ line 53 ~ updateAddressHandler ~ req.body.id", req.body.id)
        if(result !== 'not Authorized'){
            let oldData = await getAddressById(req.body.id)
            let data = await updateAddressModel({...oldData,...req.body});
            console.log("🚀 ~ file: addressControllers.js ~ line 58 ~ updateAddressHandler ~ data", data)
            let response = {
            status: 200,
            message: 'successfully update address',
            data :data
        }
        res.send(response)
        } else res.status(403).send(result)
        
    } catch (error) {
        let response = {
            status: 403,
            message: error.message,
        }
        res.send(response)
    }
}
const getAllAddressHandler =async (req, res, next)=>{
    try {
        let data = await getAllAddressModel();
        let response = {
            status: 200,
            message: 'successfully get all the address',
            all_address: data
        }
        res.send(response)
    } catch (error) {
        let response = {
            status: 403,
            message: error.message,
        }
        res.send(response)
        
    }
}

const getAddressByProfileIdModelHandler =async (req, res, next)=>{
    try {
        let result = await getAddressByProfileIdModel(req.user.profile_id)
        res.json({status: 200,data:result})
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const getAddressByIdHandler =async (req, res, next)=>{
    try {
        if(req.orders){
            let orders = await req.orders.map(async order=>{
                const result = await getAddressById(order.address_id);
                let finalOrder = order
                delete finalOrder.address_id
                delete result.profile_id
                finalOrder['address'] = result
                return finalOrder
            })
            res.status(200).json(await Promise.all(orders))
        } else if(req.order){
            const result = await getAddressById(order.address_id);
            let order = req.order
            delete order.address_id
            order['address'] = result
            res.status(200).json(order)
        } else{
            const result = await getAddressById(req.body.address_id);
            if(result.id){
                res.status(200).json(result)
            }else {
                res.status(403).send('something went wrong while getting address')
            }
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {addAddressHandler,removeAddressHandler,updateAddressHandler,getAllAddressHandler,getAddressByProfileIdModelHandler,getAddressByIdHandler,getStoreAddressHandler}