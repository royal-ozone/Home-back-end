'use strict';

const {addAddressModel,removeAddressModel,updateAddressModel,getAllAddressModel,getAddressByProfileIdModel,getAddressById} =require('../models/address');
const {getUserById,getProfileByUserId,getAddressByProfileId}=require('../../auth/models/user')
const {checkUserAuth} = require('./helper')

const addAddressHandler =async(req, res, next) => {
    try {
        let data= await addAddressModel({profile_id: req.user.profile_id, country: req.user.country,store_id: req.user.store_id,...req.body})
        let response ={
            message:'Successfully add address',
            data : data
        }
        res.status(200).send(response)
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
                        message:'the address has been deleted',
                        data:data
                    }
                    res.status(200).send(response)
                } else {
                    res.status(403).send('this address is not exist')
                } 
            } else res.status(403).send(result)

    } catch (error) {
        res.status(403).send(error.message)
    }
}
const updateAddressHandler = async (req, res,next ) => {
    try {
        let result = await checkUserAuth('address',req.body.id, req.user.profile_id);
        if(result !== 'not Authorized'){
            let oldData = await getAddressById(req.body.id)
            let data = await updateAddressModel({...oldData,...req.body});
            let response = {
            message: 'successfully update address',
            data :data
        }
        res.status(200).send(response)
        } else res.status(403).send(result)
        
    } catch (error) {
        let response = {
            message: error.message,
        }
        res.status(400).send(response)
    }
}
const getAllAddressHandler =async (req, res, next)=>{
    try {
        let data = await getAllAddressModel();
        let response = {
            message: 'successfully get all the address',
            all_address: data
        }
        res.status(200).send(response)
    } catch (error) {
        let response = {
            message: error.message,
        }
        res.status(400).send(response)
        
    }
}

const getAddressByProfileIdModelHandler =async (req, res, next)=>{
    try {
        let result = await getAddressByProfileIdModel(req.user.profile_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {addAddressHandler,removeAddressHandler,updateAddressHandler,getAllAddressHandler,getAddressByProfileIdModelHandler}