'use strict';
const express = require('express');
const passportSetup = require('./passport-setup');
const {googleAuthCall,googleFailed} = require ('./google');

const googleOauth = express.Router();

googleOauth.use(passportSetup.initialize());

googleOauth.get('/google',googleAuthCall);
googleOauth.get('/failed',googleFailed);

googleOauth.get('/google/callback', 
  passportSetup.authenticate('google', { failureRedirect: '/auth/signin' }),
  function(req, res) {
    let user = req.user;
    res.json(user);
  });


module.exports = googleOauth;