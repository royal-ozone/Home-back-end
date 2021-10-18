'use strict';

const passport = require('passport');
const {signupGoogle, getUserByEmail, getUserByGoogleId, createProfile } = require('../models/user');
const {randomGenerator} = require ('../utlities/randomGenerator')
const { createToken, deleteToken } = require('../models/jwt');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:5000/auth/google/callback`,
      // callbackURL: process.env.DEV_MOD ? `/auth/google/callback`: `https://hexagon-sm.herokuapp.com/auth/google/callback`,
    },

    async function (accessToken, refreshToken, profile, cb) {
      try {
        let googleId = profile.id;
        let googleEmail = profile._json.email;

        let user = await getUserByGoogleId(googleId);
        let email = await getUserByEmail(googleEmail);

        // console.log('profile:',profile);

        let userData = {
          email: googleEmail,
          user_password: randomGenerator(10),
          country_code: '962',
          mobile: '078' + randomGenerator(7),
          country: 'Jordan',
          city: 'Amman',
          first_name: profile.name.givenName,
          last_name: profile.name.familyName || 'not specified',
          google_id: googleId,
          verified: true,
        };
        console.log("🚀 ~ file: passport-setup.js ~ line 49 ~ userData", userData)

        if (!user && !email) {
          user = await signupGoogle(userData);
          // Create user profile
          await createProfile(user);
          let userTokens = await createToken(user.id);
          delete user.user_password;
          delete userTokens.user_id;
          return cb(null, { user, userTokens });
        } 
        else if (user) {
          await deleteToken(user.id);
          let userTokens = await createToken(user.id);
          delete user.user_password;
          delete userTokens.user_id;
          return cb(null, { user, userTokens });
        } else {
          return cb(
            'Sorry, either username or email or both are already in use!'
          );
        }
      } catch (e) {
        cb(e);
      }
    }
  )
);
passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;
