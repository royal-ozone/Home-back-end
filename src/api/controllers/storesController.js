"use strict";

const events = require("../../socket/event");
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
  updateVerifiedEmail,
  getFollowedStores,
} = require("../models/stores");

const { getProfileByEmail, getProfileById } = require("../../auth/models/user");

// Store handlers----------------------------------------------------------------------------------------------
const createStoreHandler = async (req, res, next) => {
  try {
    let user = await getProfileByEmail(req.body.email);
    if (!user && !req.user.profile_id) return res.send("User not found");
    let store = await getStore(user.id);
    let verifiedEmail = true;
    let verificationCode = null;
    if (req.body.email) {
      verifiedEmail = false;
      verificationCode = (Math.random() * 1000000).toFixed(0);
    }
    if (store) return res.send("Account already exists");
    let result = await createStore({
      profile_id: req.user.profile_id || user.id,
      store_picture: req.file
        ? req.file.location
        : process.env.DEFAULT_STORE_PICTURE,
      verified_email: verifiedEmail,
      verification_code: verificationCode,
      ...req.body,
    });
    if (result) {
      req.store = { email: req.body.email, ...result };
      next();
    } else {
      res.json({
        status: 403,
        message: "Something went wrong while creating your store request!",
      });
    }
  } catch (error) {
     res.send({message: error.message, status: 403});
  }
};

const checkVerificationCodeHandler = async (req, res) => {
  try {
    let response = await getStore(req.body.id);
    if (response.verification_code === Number(req.body.code)) {
      let result = await updateVerifiedEmail({
        ...req.body,
        verified_email: true,
      });
      res.send({
        status: 200,
        result: result,
        message: "email verified successfully",
      });
    } else {
      res.send({ status: 403, message: "wrong verification code" });
    }
  } catch (error) {
     res.send({message: error.message, status: 403});
  }
};

const updateVerificationCodeHandler = async (req, res, next) => {
  try {
    let result = await updateVerificationCode({
      ...req.body,
      code: (Math.random() * 1000000).toFixed(0),
    });
    let profile = await getProfileById(result.profile_id);
    req.emailDetails = {
      email: profile.email,
      message: "Verification code has been sent to your email",
      user: { email: profile.email, ...result },
      template: "verificationemail",
      context: { verificationCode: result.verification_code },
    };
    // req.store = { email: profile.email, ...result }
    next();
  } catch (error) {
     res.send({message: error.message, status: 403});
  }
};
const addStoreReview2 = async (req, res, next) => {
  try {
    let store = req.store;
    await addStoreReviewModel2(store.id);
    if (store.verified_email) {
      res.json({
        status: 200,
        message: "Store request created successfully",
        data: store,
      });
    } else {
      next();
    }
  } catch (error) {
     res.send({message: error.message, status: 403});
  }
};

const getStoreHandler = async (req, res) => {
  try {
    let result = await getStore(req.params?.id ?? req.user?.profile_id);
    if (result) {
      // delete result.verification_code
      // delete result.rejected_reason
      // delete result.verified_email
      res.json({
        status: 200,
        data: result,
      });
    } else {
      res.json({
        status: 403,
        message: "There is no store with this profile_id",
      });
    }
  } catch (error) {
     res.send({message: error.message, status: 403});
  }
};

const updateStoreHandler = async (req, res) => {
  try {
    let id = req.params.id ?? req.user.store_id
    let result = await updateStore(id, req.body);
    if (result) {
      res.json({
        status: 200,
        message: "Store info has been updated successfully",
        data: result,
      });
    } else {
      res.json({
        status: 403,
        message: "something went wrong while updating",
      });
    }
  } catch (error) {
    res.send({message: error.message, status: 403});
  }
};

const updateStoreNameHandler = async (req, res) => {
  try {
    let id = req.params.id ?? req.user.store_id
    if (req.body.name_is_changed) {
      res.json({
        status: 403,
        message: "Your store name has been changed previously",
      });
    } else {
      let result = await updateStoreName(id, req.body);
      // await updateChangingName(req.user.profile_id);
      res.json({
        status: 200,
        message: "Store name has been changed successfully",
        data: result,
      });
    }
  } catch (error) {
    res.send({message: error, status: 403});
  }
};

const deleteStoreHandler = async (req, res) => {
  try {
    let result = await deleteStore(req.user.profile_id);
    if (result) {
      res.json({
        status: 200,
        message: "Store info has been deleted successfully",
        data: result,
      });
    } else {
      res.json({
        status: 403,
        message: "something went wrong while deleting",
      });
    }
  } catch (error) {
     res.send({message: error.message, status: 403});
  }
};

const getAllStoresHandler = async (req, res) => {
  try {
    let response = await getAllStores(req.query);
    res.json({
      status: 200,
      data: response,
    });
  } catch (error) {
    res.send({ status: 403,message: error.message });
  }
};

const getStoreByStatusHandler = async (req, res) => {
  try {
    let response = await getStoreByStatus(req.query);
    res.json({
      status: 200,
      data: response,
    });
  } catch (error) {
    res.send({ status: 403, message: error.message });
  }
};
const getStoreByNameHandler = async (req, res) => {
  try {
    let status = req.params.name;
    let response = await getStoreByName(status);
    res.json({
      status: 200,
      data: response,
    });
  } catch (error) {
     res.send({message: error.message, status: 403});
  }
};

const updateStoreStatusHandler = async (req, res) => {
  try {
    let response = await updateStoreStatus(req.body);
    res.json({
      status: 200,
      message: "Store Status has been updated successfully",
      data: response,
    });
  } catch (error) {
     res.send({message: error.message, status: 403});
  }
};

// Store Reviews----------------------------------------------------------------------------------------------

const getAllStoreReviewHandler = async (req, res) => {
  try {
    let allStoreReviews = await getAllStoreReviews();
    res.json({
      number: allStoreReviews.length,
      reviews: allStoreReviews,
    });
  } catch (error) {
     res.send({message: error.message, status: 403});
  }
};

const getStoreReviewHandler = async (req, res) => {
  try {
    let storeReviews = await getStoreReviews(req.params.store_id);
    if (storeReviews) {
      res.json({
        number: storeReviews.length,
        reviews: storeReviews,
      });
    }
  } catch (error) {
     res.send({message: error.message, status: 403});
  }
};

const createStoreReviewHandler = async (req, res) => {
  try {
    let storeReview = await createStoreReview(req.user.profile_id, req.body);
    if (storeReview === 0) {
      res.json({ message: "You have already reviewed this store!" });
    }
    if (storeReview) {
      events.emit("storeReview", storeReview);
      res.json({
        message: "Store review has been posted successfully!",
        storeReview: storeReview,
      });
    } else {
      res.json({
        message: "Something went wrong while creating your store review!",
      });
    }
  } catch (error) {
     res.send({message: error.message, status: 403});
  }
};

const updateStoreReviewHandler = async (req, res) => {
  try {
    let profile_id = req.user.profile_id;
    let store_id = req.body.store_id;
    let oldData = await checkIfReviewed(profile_id, store_id);
    if (oldData) {
      let updateReview = await updateStoreReview(profile_id, store_id, {
        ...oldData,
        ...req.body,
      });
      res.json({
        message: "Your review for this store has been updated successfully",
        updatedStoreReview: updateReview,
      });
    }
    res.json({ message: "You store review for this store does not exist!" });
  } catch (error) {
     res.send({message: error.message, status: 403});
  }
};

const deleteStoreReviewHandler = async (req, res) => {
  try {
    let deleteReview = await deleteStoreReview({
      profile_id: req.user.profile_id,
      store_id: req.body.store_id,
    });
    if (deleteReview === 0) {
      res.json({
        message: `You don't have a review for this store to delete!`,
      });
    }
    res.json({
      message: "Your review for this store has been deleted successfully",
    });
  } catch (error) {
     res.send({message: error.message, status: 403});
  }
};

// store review 2 ---------------------------
const getAllStoreReview2Handler = async (req, res) => {
  try {
    let data = await getAllStoreReview2();
    res.send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getStoreReview2Handler = async (req, res) => {
  try {
    let store_id = req.params.store_id;
    let data = await getStoreReview2ByStoreId(store_id);
    res.send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Store follower ---------------------------------------------------------------------------------------------------
const getALLNumbersOFFollowersHandler = async (req, res) => {
  try {
    let allData = await getALLNumbersOFFollowers();
    res.json({ number_of_stores: allData.length, stores: allData });
  } catch (error) {
    throw new Error(error.message);
  }
};
const getAllStorefollowersHandler = async (req, res) => {
  try {
    let allStoreFollowers = await getAllStoreFollowers();
    res.json({
      number: allStoreFollowers.length,
      followers: allStoreFollowers,
    });
  } catch (error) {
     res.send({message: error.message, status: 403});
  }
};

const getStorefollowersHandler = async (req, res) => {
  try {
    let storeFollowers = await getStoreFollowers(req.params.store_id);
    if (storeFollowers) {
      res.json({
        number: storeFollowers.length,
        followers: storeFollowers,
      });
    }
  } catch (error) {
     res.send({message: error.message, status: 403});
  }
};

const createStorefollowerHandler = async (req, res) => {
  try {
    let { store_id } = req.body;
    let storeFollower = await createStoreFollower(
      req.user.profile_id,
      store_id
    );

    // if (storeFollower.number === 0) {
    //     delete storeFollower.number;
    //     res.json({
    //         message: 'You have followed this store before!',
    //         storeFollower: storeFollower
    //     });
    // }
    // else if (storeFollower !== 0) {
    //     let numberOfFollower;
    //     let inputData;
    //     let check = await getNumberOfFollower(store_id);
    //     if (check) {
    //         numberOfFollower = await updateNumberOfFollowersPlus(store_id);
    //     } else {
    //         inputData = await createNumberOfStoreFollower(store_id);
    //         numberOfFollower = await updateNumberOfFollowersPlus(store_id);

    //     }

    // }
    // else {
    //     res.json({ message: 'Something went wrong while following a store!' });
    // }
    res.json({
      status: 200,
      message: "Store has been followed successfully!",
      result: storeFollower,
    });
  } catch (error) {
     res.send({message: error.message, status: 403});
  }
};

const deleteStorefollowerHandler = async (req, res) => {
  try {
    let unFollow = await deleteStoreFollower(
      req.user.profile_id,
      req.body.store_id
    );
    if (unFollow) {
      // let numberOfFollower = await updateNumberOfFollowersMinus(req.body.store_id);
      res.json({
        message: "Your have unfollowed this store!",
        result: unFollow,
        status: 200,
        // numberOfFollower: numberOfFollower
      });
    } else {
      res.send({ message: "you not follow this store", status: 403 });
    }
  } catch (error) {
     res.send({message: error.message, status: 403});
  }
};

const updateStorePictureHandler = async (req, res) => {
  try {
    let id = req.user.store_id || req.body.store_id;
    let result = await updateStorePicture(id, req.file.location);
    if (result) {
      res.json({
        message: "store picture has been updated successfully",
        result: result,
      });
    }
    res.send("yon do not have any store");
  } catch (error) {
     res.send({message: error.message, status: 403});
  }
};

const deleteStorePictureHandler = async (req, res) => {
  try {
    let id = req.user.store_id || req.body.store_id;
    let result = await deleteStorePicture(id);
    res.json({
      message: "store picture has been deleted successfully",
      result: result,
    });
  } catch (error) {
     res.send({message: error.message, status: 403});
  }
};

const getFollowedStoresHandler = async (req, res) => {
  try {
    let result = await getFollowedStores(req.user.profile_id);
    if (result) {
      res.send({ status: 200, result: result });
    } else {
      res.send({ status: 403, message: result });
    }
  } catch (error) {
     res.send({message: error.message, status: 403});
  }
};

const routes = [
  {
    fn: getStoreByStatusHandler,
    auth: true,
    path: "/store/status",
    method: "get",
    type: "admin",
  },
  {
    fn: updateStoreStatusHandler,
    auth: true,
    path: "/store/status",
    method: "put",
    type: "admin",
  },
  {
    fn: getAllStoresHandler,
    auth: true,
    path: "/stores",
    method: "get",
    type: "admin",
  },
  {
    fn: updateStoreNameHandler,
    auth: true,
    path: "/store/name/:id",
    method: "put",
    type: "admin",
  },
  {
    fn: updateStoreHandler,
    auth: true,
    path: "/store/:id",
    method: "put",
    type: "admin",
  },

];

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
  checkVerificationCodeHandler,
  getFollowedStoresHandler,
  routes
};
