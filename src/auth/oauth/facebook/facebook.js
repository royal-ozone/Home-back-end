'use strict';

const passportSetup = require('./passport-setup');

let facebookFailed = (req, res, next) => {
  try {
    const error = new Error('Failed to login using facebook');
    error.statusCode = 403;
    throw error;
  } catch (e) {
    next(e);
  }
};

let facebookAuthCall = passportSetup.authenticate('facebook', {
  scope: ['email'],
});

module.exports = { facebookAuthCall, facebookFailed };
