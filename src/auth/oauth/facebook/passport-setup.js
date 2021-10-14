'use strict';

const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;

passport.use(new facebookStrategy({
    clientID: process.env.CLIENT_FB_ID,
    clientSecret: process.env.CLIENT_SECRET_FB,
    callbackURL:'http://localhost:3000/api/v1/oauth/facebook/callback',
    profileFields: ['id', 'displayName', 'name', 'gender', 'email','picture.type(large)'],

},
function(token,refresh,profile,done){
    console.log(profile._json);
    return done(profile._json);
// try {
//     return done(null, {profile});
// } catch (error) {
//     done(error);
// }
    // console.log('profile',profile);
    // return done(null,profile);
    

}
))

passport.serializeUser((user, cb) => {
    cb(null, user);
  });
passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });