'use strict';

const { getProfileByUserId } = require('../../auth/models/user')
const {
    requestStore,
    createStore,
    updateStore,
    deleteStore } = require('../models/stores');


// updateStoreRequestHandler,
// deleteStoreRequestHandler,


const createStoreRequestHandler = async (req, res, next) => {

    try {

        let { store_name, city, address, mobile, caption, about } = req.body;
        let profile = await getProfileByUserId(req.user.id);
        let profile_id = profile.id;

        let store = await requestStore(req.body, profile_id);

        if (store) {
            res.status(200).json({
                status: 200,
                message: 'Store request created successfully',
            });
        }

        else {
            res.status(403).json({
                status: 403,
                message: 'Something went wrong while creating your store request!',
            });
        }

    } catch (error) {
        res.send(error.message)
    }

};

const createStoreHandler = async (req, res, next) => {

    try {

        let {profile_id} = req.body;

        let store = await createStore(profile_id);

        if (store !== 0) {
            res.status(200).json({
                status: 200,
                message: 'Store created successfully',
            });
        }

        else {
            res.status(403).json({
                status: 403,
                message: 'Something went wrong while creating the user/s store!',
            });
        }

    } catch (error) {
        res.send(error.message)
    }

};

const updateStoreHandler = async (req, res, next) => {

    try {

        let { store_name, city, address, mobile, caption, about } = req.body;
        let profile = await getProfileByUserId(req.user.id);
        let profile_id = profile.id;

        let store = await updateStore(req.body, profile_id);

        if (store) {
            res.status(200).json({
                status: 200,
                message: 'Store edited successfully',
            });
        }

        else {
            res.status(403).json({
                status: 403,
                message: 'Something went wrong while editing your store!',
            });
        }

    } catch (error) {
        res.send(error.message)
    }

};

const deleteStoreHandler = async (req, res, next) => {

    try {

        let store = await deleteStore(req.params.storeId);
        if (!store) {
            res.status(200).json({
                status: 200,
                message: 'Store deleted successfully',
            });
        }

        else {
            res.status(403).json({
                status: 403,
                message: 'Something went wrong while deleting your store!',
            });
        }

    } catch (error) {
        res.send(error.message)
    }

};

module.exports = {
    createStoreRequestHandler,
    // updateStoreRequestHandler,
    // deleteStoreRequestHandler,
    createStoreHandler,
    updateStoreHandler,
    deleteStoreHandler
};