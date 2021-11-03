'use strict';

const {addAddressModel,removeAddressModel,updateAddressModel,getAllAddressModel} =require('../models/address');
const {getUserById,getProfileByUserId,getAddressByProfileId}=require('../../auth/models/user')


const addAddressHandler =async(req, res, next) => {
    try {
        
        let oldData =await getUserById(req.user.id)
        let profileId = await getProfileByUserId(req.user.id);
        console.log("🚀 ~ file: addressControllers.js ~ line 10 ~ addressHandler ~ profileId", profileId)
        let data= await addAddressModel(req.body,oldData,profileId)
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
        
        console.log("🚀 ~ file: addressControllers.js ~ line 26 ~ removeAddressHandler ~ req.user.profile_id", req.user.profile_id)
        let address = await getAddressByProfileId(req.user.profile_id)
        if(address) {

            let data= await removeAddressModel(req.params.id);
            let response ={
                message:'the address is delete',
                data:data
            }
            res.status(200).send(response)
        }else {
            res.status(304).send("the address is not exist")
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
}
const updateAddressHandler = async (req, res,next ) => {
    try {
        let oldData = await getAddressByProfileId(req.user.profile_id)
        let data = await updateAddressModel(req.params.id,oldData,req.body);
        let response = {
            message: 'successfully update address',
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

module.exports = {addAddressHandler,removeAddressHandler,updateAddressHandler,getAllAddressHandler}