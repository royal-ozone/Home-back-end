'use strict';
const { createToken, deleteToken } = require('../models/jwt');
const base64 = require('base-64');
const { authenticateBasic } = require('../models/helpers');
const { getProfileByUserId, getStoreIdByProfileId, getCompanyByProfileId,getCourierByProfileId } = require('../models/user')

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return _authError();
  }
  let basic = req.headers.authorization.split(' ').pop();


  let [email, password] = base64.decode(basic).split(':');

  try {
    let userData = await authenticateBasic(email, password);
    // await deleteToken(userData.id);
    const userTokens = await createToken(userData.id);
    let userProfile = await getProfileByUserId(userData.id);
    let store = await getStoreIdByProfileId(userProfile.id) || {} ;
    let company = await getCompanyByProfileId(userProfile.id) || {} ;
    let courier = await getCourierByProfileId(userProfile.id);
    delete userTokens.id;
    delete userTokens.user_id;
    if (userData.verified === false) {
      res.json({
        status: 403,
        message: 'User is not verified, please verify your mobile number!',
      });
    }
    else {
      req.user = {...userData, store_id: store.id || null, courier_company_id: company.id || null, courier_id: courier?.id};
      req.tokens = userTokens;
      next();
    }
  } catch (e) {
    _authError();
  }

  function _authError() {
    res.json({
      status: 403,
      message: 'Either email or password is wrong!',
    });
  }
};
