/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { User, UserLogin, UserClaim, UserProfile } from '../data/models';
import { db, auth as config } from '../config';

export var fbId;
export var name;
export var profileUrl;
export var emails;
export var gender;

/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy({
  clientID: config.facebook.id,
  clientSecret: config.facebook.secret,
  callbackURL: '/login/facebook/return',
  profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  /* eslint-disable no-underscore-dangle */

  fbId = profile.id;
  name = profile.name;
  profileUrl = profile.profileUrl;
  emails = profile.emails;
  gender = profile.gender;

  let genderForDb;

  switch(gender) {
  	case 'male':
  	  genderForDb = 0;
  	  break;
  	case 'female':
  	  genderForDb = 1;
  	  break;
  	default:
  	  genderForDb = 2;
  	  break;
  }

  db.manyOrNone({
    name: "create-users",
    text: "insert into users (id, firstname, lastname, email, age, gender, address, profilepic, usertype) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);",
	values: [ fbId, name.givenName, name.familyName, emails[0].value, null, genderForDb, '', null, 3 ]
  })
  	.then(function (areas) {
      return done(null, profile);
	})
	.catch(function (error) {
	  //console.log(error);
	  return done(null, profile); 
	});
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

export default passport;
