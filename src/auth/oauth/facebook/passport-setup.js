'use strict';

const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;
const {signupFacebook, getUserByEmail, getUserByFacebookId, createProfile } = require('../../models/user');
const {randomGenerator} = require ('../../utlities/randomGenerator')
const { createToken, deleteToken } = require('../../models/jwt');

passport.use(new facebookStrategy({
    clientID: process.env.CLIENT_FB_ID,
    clientSecret: process.env.CLIENT_SECRET_FB,
    callbackURL:process.env.REDIRECT_URI_FB,
    profileFields: ['id', 'displayName', 'name', 'gender', 'email','picture.type(large)'],

},
async function(token,refresh,profile,done){
 try {
    let facebookId = profile.id;
    let facebookEmail = profile.emails[0].value;

    let user = await getUserByFacebookId(facebookId);
    let email = await getUserByEmail(facebookEmail);

    // let userData = {
    //     email: facebookEmail,
    //     user_password: randomGenerator(10),
    //     country_code: '962',
    //     mobile: '071' + randomGenerator(7),
    //     country: 'Jordan',
    //     city: 'Amman',
    //     first_name: profile.name.givenName,
    //     last_name: profile.name.familyName || 'not specified',
    //     facebook_id: facebookId,
    //     verified: true,
    //   };
      let userData = {
        email: facebookEmail,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName || 'not specified',
        google_id: facebookId,
      };

      if (!user && !email) {
        
        return done(null, userData);
      }

      // if (!user && !email) {
      //   user = await signupFacebook(userData);
      //   // Create user profile

      //   await createProfile(user);
      //   let userTokens = await createToken(user.id);
      //   delete user.user_password;
      //   delete userTokens.user_id;
      //   return done(null, { user, userTokens });
      // } 
      else if (user) {
        await deleteToken(user.id);
        let userTokens = await createToken(user.id);
        delete user.user_password;
        delete userTokens.user_id;
        return done(null, { user, userTokens });
      } else {
        return done(
          'Sorry, either username or email or both are already in use!'
        );
      }

} catch (error) {
    return done(error);
}
}
))

passport.serializeUser((user, cb) => {
    cb(null, user);
  });
passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });


module.exports = passport;