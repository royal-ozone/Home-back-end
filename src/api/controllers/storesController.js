'use strict';

const events = require('../../socket/event');
const {
    createStore,
    getStore,
    updateStore,
    deleteStore,
    updateStoreName,
    getStoreByStatus,
    getStoreByName,
    getAllStores,
    updateStoreStatus,
    updateChangingName,
    createStoreReview,
    getAllStoreReviews,
    getStoreReviews,
    updateStoreReview,
    deleteStoreReview,
    createStoreFollower,
    getAllStoreFollowers,
    getStoreFollowers,
    deleteStoreFollower,
    updateStorePicture,
    deleteStorePicture,
    checkIfFollowed,
    checkIfReviewed,
    updateNumberOfFollowersMinus,
    updateNumberOfFollowersPlus,
    createNumberOfStoreFollower,
    getNumberOfFollower,
    getALLNumbersOFFollowers,
    addStoreReviewModel2,
    updateStoreReview2,
    getStoreReview2ByStoreId,
    getAllStoreReview2,
    updateVerificationCode,
    updateVerifiedEmail
} = require('../models/stores');

const { getProfileByEmail, getProfileById } = require('../../auth/models/user')

// Store handlers----------------------------------------------------------------------------------------------
const createStoreHandler = async (req, res, next) => {
    try {
        let user = await getProfileByEmail(req.body.email)
        if (!user && !req.user.profile_id) return res.send('User not found')
        let store = await getStore(user.id)
        let verifiedEmail = true;
        let verificationCode = null;
        if (req.body.email) {
            verifiedEmail = false;
            verificationCode = (Math.random() * 1000000).toFixed(0)
        }
        if (store) return res.send('Account already exists')
        let result = await createStore({ profile_id: req.user.profile_id || user.id, store_picture: req.file ? req.file.location : process.env.DEFAULT_STORE_PICTURE, verified_email: verifiedEmail, verification_code: verificationCode, ...req.body })
        if (result) {

            req.store = { email: req.body.email, ...result };
            next();
        }

        else {
            res.json({
                status: 403,
                message: 'Something went wrong while creating your store request!',
            });
        }
    } catch (error) {
        res.send(error.message)
    }
}

const checkVerificationCodeHandler = async (req, res) => {
    try {
        let response = await getStore(req.body.id)
        if (response.verification_code === Number(req.body.code)) {
            let result = await updateVerifiedEmail({ ...req.body, verified_email: true })
            res.send({ status: 200, result: result, message: 'email verified successfully' })
        } else {
            res.send({ status: 403, message: 'wrong verification code' })
        }
    } catch (error) {
        res.send(error.message)
    }
}

const updateVerificationCodeHandler = async (req, res, next) => {
    try {
        let result = await updateVerificationCode({ ...req.body, code: (Math.random() * 1000000).toFixed(0) })
        let profile = await getProfileById(result.profile_id)
        req.emailDetails = { email: profile.email, message: 'Verification code has been sent to your email', user: { email: profile.email, ...result }, template: 'verificationemail', context: { verificationCode: result.verification_code } }
        // req.store = { email: profile.email, ...result }
        next()
    } catch (error) {
        res.send(error.message)
    }
}
const addStoreReview2 = async (req, res, next) => {
    try {
        let store = req.store;
        await addStoreReviewModel2(store.id);
        if (store.verified_email) {
            res.status(200).json({
                status: 200,
                message: 'Store request created successfully',
                data: store
            });
        } else {
            next()
        }
    } catch (error) {
        res.send(error.message)
    }
}

const getStoreHandler = async (req, res) => {
    try {
        let result = await getStore(req.user.profile_id);
        if (result) {
            res.status(200).json({
                data: result,
            });
        }

        else {
            res.json({
                status: 403,
                message: 'There is no store with this profile_id',
            });
        }
    } catch (error) {
        res.send(error.message)
    }
};


const updateStoreHandler = async (req, res) => {
    try {

        let result = await updateStore(req.user.profile_id, req.body)
        if (result) {
            res.status(200).json({
                status: 200,
                message: 'Store info has been updated successfully',
                data: result
            });
        }

        else {
            res.status(403).json({
                status: 403,
                message: 'something went wrong while updating',
            });
        }
    } catch (error) {
        res.send(error.message)
    }
};

const updateStoreNameHandler = async (req, res) => {
    try {

        let result = await getStore(req.user.profile_id)
        if (result.name_is_changed) {
            res.status(403).json({
                status: 403,
                message: 'Your store name has been changed previously',
            });
        } else {
            let result = await updateStoreName(req.user.profile_id, req.body)
            await updateChangingName(req.user.profile_id)
            res.status(200).json({
                status: 200,
                message: 'Store name has been changed successfully',
                data: result
            });
        }
    } catch (error) {
        res.send(error.message)
    }
};

const deleteStoreHandler = async (req, res) => {
    try {

        let result = await deleteStore(req.user.profile_id);
        if (result) {
            res.status(200).json({
                status: 200,
                message: 'Store info has been deleted successfully',
                data: result
            });
        }

        else {
            res.status(403).json({
                status: 403,
                message: 'something went wrong while deleting',
            });
        }
    } catch (error) {
        res.send(error.message)
    }
};

const getAllStoresHandler = async (req, res) => {
    try {
        let response = await getAllStores();
        res.status(200).json({
            number: response.length,
            status: 200,
            data: response,
        })
    } catch (error) {
        res.status(403).send(error.message)
    }
}

const getStoreByStatusHandler = async (req, res) => {
    try {
        let status = req.params.status;
        let response = await getStoreByStatus(status);
        res.status(200).json({
            number: response.length,
            status: 200,
            data: response,
        })

    } catch (error) {
        res.status(403).send(error.message)
    }
}
const getStoreByNameHandler = async (req, res) => {
    try {
        let status = req.params.name;
        let response = await getStoreByName(status);
        res.status(200).json({
            status: 200,
            data: response,
        })

    } catch (error) {
        res.status(403).send(error.message)
    }
}

const updateStoreStatusHandler = async (req, res) => {
    try {

        let response = await updateStoreStatus(req.body)
        res.status(200).json({
            status: 200,
            message: 'Store Status has been updated successfully',
            data: response
        })
    } catch (error) {
        res.status(403).send(error.message)
    }
}

// Store Reviews----------------------------------------------------------------------------------------------

const getAllStoreReviewHandler = async (req, res) => {
    try {
        let allStoreReviews = await getAllStoreReviews();
        res.status(200).json({
            number: allStoreReviews.length,
            reviews: allStoreReviews
        })
    } catch (error) {
        res.status(403).send(error.message)
    }
}

const getStoreReviewHandler = async (req, res) => {
    try {
        let storeReviews = await getStoreReviews(req.params.store_id);
        if (storeReviews) {
            res.status(200).json({
                number: storeReviews.length,
                reviews: storeReviews,
            });
        }
    } catch (error) {
        res.status(403).send(error.message)
    }
}

const createStoreReviewHandler = async (req, res) => {
    try {
        let storeReview = await createStoreReview(req.user.profile_id, req.body)
        if (storeReview === 0) {
            res.status(403).json({ message: 'You have already reviewed this store!' });
        }
        if (storeReview) {
            events.emit('storeReview', storeReview)
            res.status(200).json({
                message: 'Store review has been posted successfully!',
                storeReview: storeReview
            });
        }
        else {
            res.status(403).json({ message: 'Something went wrong while creating your store review!' });
        }
    } catch (error) {
        res.status(403).send(error.message)
    }
}

const updateStoreReviewHandler = async (req, res) => {
    try {
        let profile_id = req.user.profile_id;
        let store_id = req.body.store_id;
        let oldData = await checkIfReviewed(profile_id, store_id);
        if (oldData) {
            let updateReview = await updateStoreReview(profile_id, store_id, { ...oldData, ...req.body });
            res.status(200).json({
                message: 'Your review for this store has been updated successfully',
                updatedStoreReview: updateReview
            });
        }
        res.status(403).json({ message: 'You store review for this store does not exist!' });
    } catch (error) {
        res.status(403).send(error.message)
    }
}

const deleteStoreReviewHandler = async (req, res) => {
    try {
        let deleteReview = await deleteStoreReview({ profile_id: req.user.profile_id, store_id: req.body.store_id })
        if (deleteReview === 0) {
            res.status(403).json({ message: `You don't have a review for this store to delete!` });
        }
        res.status(200).json({
            message: 'Your review for this store has been deleted successfully'
        })
    } catch (error) {
        res.status(403).send(error.message)
    }
}

// store review 2 ---------------------------
const getAllStoreReview2Handler = async (req, res) => {
    try {
        let data = await getAllStoreReview2();
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getStoreReview2Handler = async (req, res) => {
    try {
        let store_id = req.params.store_id;
        let data = await getStoreReview2ByStoreId(store_id);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Store follower ---------------------------------------------------------------------------------------------------
const getALLNumbersOFFollowersHandler = async (req, res) => {
    try {
        let allData = await getALLNumbersOFFollowers();
        res.status(200).json({ number_of_stores: allData.length, stores: allData });
    } catch (error) {
        throw new Error(error.message);
    }
}
const getAllStorefollowersHandler = async (req, res) => {
    try {

        let allStoreFollowers = await getAllStoreFollowers();
        res.status(200).json({
            number: allStoreFollowers.length,
            followers: allStoreFollowers
        })
    } catch (error) {
        res.status(403).send(error.message)
    }
}

const getStorefollowersHandler = async (req, res) => {
    try {
        let storeFollowers = await getStoreFollowers(req.params.store_id);
        if (storeFollowers) {
            res.status(200).json({
                number: storeFollowers.length,
                followers: storeFollowers
            });
        }
    } catch (error) {
        res.status(403).send(error.message)
    }
}

const createStorefollowerHandler = async (req, res) => {
    try {
        let { store_id } = req.body;
        let storeFollower = await createStoreFollower(req.user.profile_id, store_id)

        if (storeFollower.number === 0) {
            delete storeFollower.number;
            res.status(200).json({
                message: 'You have followed this store before!',
                storeFollower: storeFollower
            });
        }
        else if (storeFollower !== 0) {
            let numberOfFollower;
            let inputData;
            let check = await getNumberOfFollower(store_id);
            if (check) {
                numberOfFollower = await updateNumberOfFollowersPlus(store_id);
            } else {
                inputData = await createNumberOfStoreFollower(store_id);
                numberOfFollower = await updateNumberOfFollowersPlus(store_id);

            }

            res.status(200).json({
                message: 'Store has been followed successfully!',
                storeFollower: storeFollower,
                inputData: inputData,
                numberOfFollower: numberOfFollower
            });
        }
        else {
            res.status(403).json({ message: 'Something went wrong while following a store!' });
        }
    } catch (error) {
        res.status(403).send(error.message)
    }
}

const deleteStorefollowerHandler = async (req, res) => {
    try {

        let unFollow = await deleteStoreFollower(req.user.profile_id, req.body.store_id)
        console.log("🚀 ~ file: storesController.js ~ line 345 ~ deleteStorefollowerHandler ~ unFollow", unFollow)
        if (unFollow) {
            let numberOfFollower = await updateNumberOfFollowersMinus(req.body.store_id);
            res.status(200).json({
                message: 'Your have unfollowed this store!',
                data: unFollow,
                numberOfFollower: numberOfFollower
            });
        }
        res.status(403).send('you not follow this store');

    } catch (error) {
        res.status(403).send(error.message)
    }
}

const updateStorePictureHandler = async (req, res) => {
    try {
        let id = req.user.store_id || req.body.store_id;
        let result = await updateStorePicture(id, req.file.location)
        if (result) {
            res.status(200).json({
                message: 'store picture has been updated successfully',
                result: result
            })
        }
        res.status(403).send('yon do not have any store')

    } catch (error) {
        res.status(403).send(error.message)
    }
}

const deleteStorePictureHandler = async (req, res) => {
    try {
        let id = req.user.store_id || req.body.store_id;
        let result = await deleteStorePicture(id)
        res.status(200).json({
            message: 'store picture has been deleted successfully',
            result: result
        })
    } catch (error) {
        res.status(403).send(error.message)
    }
}



module.exports = {
    createStoreHandler,
    getStoreHandler,
    deleteStoreHandler,
    updateStoreHandler,
    updateStoreNameHandler,
    getAllStoresHandler,
    getStoreByStatusHandler,
    updateStoreStatusHandler,
    getStoreByNameHandler,
    getAllStoreReviewHandler,
    getStoreReviewHandler,
    createStoreReviewHandler,
    updateStoreReviewHandler,
    deleteStoreReviewHandler,
    getAllStorefollowersHandler,
    getStorefollowersHandler,
    createStorefollowerHandler,
    deleteStorefollowerHandler,
    updateStorePictureHandler,
    deleteStorePictureHandler,
    getALLNumbersOFFollowersHandler,
    addStoreReview2,
    getAllStoreReview2Handler,
    getStoreReview2Handler,
    updateVerificationCodeHandler,
    checkVerificationCodeHandler

}