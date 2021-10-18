'use strict';
const { createToken, deleteToken } = require('../models/jwt');
const base64 = require('base-64');
const { authenticateBasic } = require('../models/helpers');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return _authError();
  }
  let basic = req.headers.authorization.split(' ').pop();
  
  let [email, password] = base64.decode(basic).split(':');

  try {
    let userData = await authenticateBasic(email, password);
    await deleteToken(userData.id);
    const userTokens = await createToken(userData.id);
    delete userTokens.id;
    delete userTokens.user_id;
    if (userData.verified === false){
      res.status(403).send('User is not verified, please verify your mobile number!');
    }
    else{
    req.user = userData;
    req.tokens = userTokens;
    next();
    }
  } catch (e) {
    _authError();
  }

  function _authError() {
    res.status(403).send('Either email or password is wrong!');
  }
};
