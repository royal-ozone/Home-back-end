'use strict';

const passportSetup = require('./passport-setup');

let googleFailed = (req, res, next) => {
  try {
    const error = new Error('Failed to login using google');
    error.statusCode = 403;
    throw error;
  } catch (e) {
    next(e);
  }
};

let googleAuthCall = passportSetup.authenticate('google', {
  scope: ['profile', 'email'],
});

module.exports = { googleAuthCall, googleFailed };
