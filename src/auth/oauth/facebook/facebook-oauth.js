'use strict';
const express = require('express');
const passportSetup = require('./passport-setup');
const {facebookAuthCall,facebookFailed} = require ('./facebook');

const facebookOauth = express.Router();

facebookOauth.use(passportSetup.initialize());

facebookOauth.get('/facebook',facebookAuthCall);
facebookOauth.get('/failed',facebookFailed);

facebookOauth.get('/facebook/callback', 
  passportSetup.authenticate('facebook', { failureRedirect: '/auth/signin' }),
  function(req, res) {
    let user = req.user;
    res.json(user);
  });


module.exports = facebookOauth;