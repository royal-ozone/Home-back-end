'use strict';

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
    deleteStoreReview } = require('../models/stores');




const createStoreHandler = async (req, res) => {
    try {
        let result = await createStore({ profile_id: req.user.profile_id, ...req.body })
        if (result) {
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
}

const getStoreHandler = async (req, res) => {
    try {
        let result = await getStore(req.user.profile_id);
        if (result) {
            res.status(200).json({
                status: 200,
                data: result,
            });
        }

        else {
            res.status(403).json({
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

        let response = await updateStoreStatus(req.user.profile_id, req.body)
        res.status(200).json({
            status: 200,
            message: 'Store Status has been updated successfully'
        })
    } catch (error) {
        res.status(403).send(error.message)
    }
}

// Store Reviews:

const getAllStoreReviewHandler = async (req, res) => {
    try {

        let allStoreReviews = await getAllStoreReviews();
        res.status(200).json({
            status: 200,
            reviews: allStoreReviews
        })
    } catch (error) {
        res.status(403).send(error.message)
    }
}

const getStoreReviewHandler = async (req, res) => {
    try {

        let storeReviews = await getStoreReviews(req.params.storeId);
        if (storeReviews) {
            res.status(200).json({
                status: 200,
                reviews: storeReviews
            })
        }
    } catch (error) {
        res.status(403).send(error.message)
    }
}

const createStoreReviewHandler = async (req, res) => {
    try {
        let { store_id, review, rate } = req.body;
        let storeReview = await createStoreReview(req.user.profile_id, req.body)

        if (storeReview === 0) {
            res.status(403).json({
                status: 403,
                message: 'You have already reviewd this store!'
            })
        }
        if (storeReview) {
            res.status(200).json({
                status: 200,
                message: 'Store review has been posted successfully!'
            })
        }
        else {
            res.status(403).json({
                status: 403,
                message: 'Something went wrong while creating your store review!'
            })
        }
    } catch (error) {
        res.status(403).send(error.message)
    }
}

const updateStoreReviewHandler = async (req, res) => {
    try {
        let { review, rate } = req.body;
        let updateReview = await updateStoreReview(req.user.profile_id, req.params.storeId, req.body)
        if (updateReview === 0) {
            res.status(403).json({
                status: 403,
                message: 'You store review for this store does not exist!'
            })
        }
        res.status(200).json({
            status: 200,
            message: 'Your review for this store has been updated successfully'
        })
    } catch (error) {
        res.status(403).send(error.message)
    }
}

const deleteStoreReviewHandler = async (req, res) => {
    try {
        let deleteReview = await deleteStoreReview(req.user.profile_id, req.params.storeId)
        if (deleteReview === 0) {
            res.status(403).json({
                status: 403,
                message: `You don't have a review for this store to delete!`
            })
        }
        res.status(200).json({
            status: 200,
            message: 'Your review for this store has been deleted successfully'
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
    deleteStoreReviewHandler
}

