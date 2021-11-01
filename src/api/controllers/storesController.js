'use strict';

const { getProfileByUserId } = require('../../auth/models/user')
const {
    getAllStoreRequests,
    requestStore,
    getAllStores,
    createStore,
    updateStore,
    deleteStore } = require('../models/stores');


// updateStoreRequestHandler,
// deleteStoreRequestHandler,

const getAllStoreRequestHandler = async (req, res, next) => {

    try {

        let storeRequests = await getAllStoreRequests();

        if (storeRequests) {
            res.status(200).json({
                status: 200,
                requests: storeRequests,
            });
        }

        else {
            res.status(403).json({
                status: 403,
                message: 'Something went wrong while getting store requests!',
            });
        }

    } catch (error) {
        res.send(error.message)
    }

};

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

const getAllStoresHandler = async (req, res, next) => {

    try {

        let stores = await getAllStores();

        if (stores) {
            res.status(200).json({
                status: 200,
                requests: stores,
            });
        }

        else {
            res.status(403).json({
                status: 403,
                message: 'Something went wrong while getting stores!',
            });
        }

    } catch (error) {
        res.send(error.message)
    }

};

const createStoreHandler = async (req, res, next) => {

    try {

        let { store_name } = req.body;

        let store = await createStore(store_name);

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

        let { store_name } = req.body;

        let store = await deleteStore(store_name);
        if (!store.rows[0]) {
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
    getAllStoreRequestHandler,
    createStoreRequestHandler,
    // updateStoreRequestHandler,
    // deleteStoreRequestHandler,
    getAllStoresHandler,
    createStoreHandler,
    updateStoreHandler,
    deleteStoreHandler
};