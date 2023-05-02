"use strict";
const { getTokenRecord } = require("../models/jwt");
const { authenticateWithToken } = require("../models/helpers");
const {
  getProfileByUserId,
  getStoreIdByProfileId,
  getCompanyByProfileId,
  getCourierByProfileId,
} = require("../models/user");
const { getCartByProfileId } = require("../../api/models/cart");
const axios = require("axios");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return _authError();
    }
    let token = req.headers.authorization.split(" ").pop();
    let session_id = req.headers.session_id;
    let tokenRecord;
    let result;

    try {
      result = await axios({
        method: "GET",
        url: `${process.env.MANAGEMENT_API}/employee`,
        headers: { authorization: req.headers.authorization },
      });
    } catch (err) {
      tokenRecord = await getTokenRecord(token, session_id);
    }

    if (tokenRecord) {
      let validUser = await authenticateWithToken(token, "access");
      let userProfile = await getProfileByUserId(validUser.id);
      let store = await getStoreIdByProfileId(userProfile.id);
      let company = await getCompanyByProfileId(userProfile.id);
      let courier = await getCourierByProfileId(userProfile.id);
      let cart = await getCartByProfileId(userProfile.id);

      // request.user:

      req.user = validUser;
      req.user.profile_id = userProfile.id;
      req.user.cart_id = cart ? cart.id : null;
      req.user.store_id = store ? store.id : null;
      req.user.courier_company_id = company ? company.id : null;
      req.user.courier_id = courier ? courier.id : null;

      next();
    } else if (result) {
      req.employee = result.data;
      next();
    } else {
      res.json({
        status: 403,
        message: "Invalid token!",
      });
    }
  } catch (error) {
    next(error);
  }
  function _authError() {
    res.send("Header authorization is not provided");
  }
};
