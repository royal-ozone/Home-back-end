'use strict';

const { getProfileByUserId } = require('../../auth/models/user')
const { createStore,
    updateStore } = require('../models/stores');

const createStoreHandler = async (req, res, next) => {

    try {

        let { store_name, city, address, mobile, caption, about } = req.body;
        let profile = await getProfileByUserId(req.user.id);
        let profile_id = profile.id;

        let store = await createStore(req.body, profile_id);

        if (store) {
            res.status(200).json({
                status: 200,
                message: 'Store created successfully',
            });
        }

        else {
            res.status(403).json({
                status: 403,
                message: 'Something went wrong while creating your store!',
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

module.exports = { createStoreHandler,updateStoreHandler };