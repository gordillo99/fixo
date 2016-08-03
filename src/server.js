/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import path from 'path';
import express from 'express';
import FB from 'fb';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import ReactDOM from 'react-dom/server';
import UniversalRouter from 'universal-router';
import PrettyError from 'pretty-error';
import passport from './core/passport';
import models from './data/models';
import schema from './data/schema';
import routes from './routes';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import { port, auth, analytics } from './config';
import usersRest from './../routes/users.js';
import fixersRest from './../routes/fixers.js';
import areasRest from './../routes/areas.js';
import proposalsRest from './../routes/proposals.js';
import categoriesRest from './../routes/categories.js';
import offersRest from './../routes/offers.js';
import reviewsRest from './../routes/reviews.js';
//import offerMailer from './../routes/offerMailer.js';
import pdfGenerator from './../routes/pdf/pdfGenerator.js';

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ 
    extended: false,
    parameterLimit: 10000,
    limit: 1024 * 1024 * 10 }));
app.use(bodyParser.json({ 
    extended: false,
    parameterLimit: 10000,
    limit: 1024 * 1024 * 10 }));
//
// Setup Helmet
//
var helmet = require('helmet');
app.use(helmet());

//
// Routes Setup
//
app.use('/api/users', usersRest);
app.use('/api/fixers', fixersRest);
app.use('/api/areas', areasRest);
app.use('/api/proposals', proposalsRest);
app.use('/api/categories', categoriesRest);
app.use('/api/offers', offersRest);
app.use('/api/reviews', reviewsRest);
//app.use('/offerMailer', offerMailer);
app.use('/pdf', pdfGenerator);

//
// Authentication
// -----------------------------------------------------------------------------

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated() ? true : false)
      return next();

  // if they aren't redirect them to the home page
  res.send(false);
}

// route middleware to make sure a user is logged in (redirect if not)
function redirectIfNotLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated() ? true : false)
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

// route middleware to make sure a user is logged in (redirect if not)
function handleCategoryRedirection(req, res, next) {
  console.log(req.params);
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated() ? true : false)
      return next();

  // if they aren't redirect them to the home page
  res.redirect(`/login?redirectTo=setup/${req.params.cat}`);
}

function isAdmin(req, res, next) {
  // if user is authenticated in the session and is admin, carry on
  if ((req.isAuthenticated() ? true : false) && req.user.usertype === 'admin')
      return next();

  // page not found if not admin
  res.redirect('/not_authorized');
}

app.use(expressJwt({
  secret: auth.jwt.secret,
  credentialsRequired: false,
  /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
  getToken: req => req.cookies.id_token,
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('express-session')({ secret: auth.jwt.secret, resave: true, saveUninitialized: true }));

app.all('/profile', redirectIfNotLoggedIn, function(req, res, next) {
  next(); 
});

app.all('/setup/:cat', handleCategoryRedirection, function(req, res, next) {
  next(); 
});

app.all('/admin', isAdmin, function(req, res, next) {
  next(); 
});

app.get('/login/facebook', function(req,res,next) {
  if (req.query.redirectTo) {
    res.cookie('redirectCookie', req.query.redirectTo, { maxAge: 900000, httpOnly: true });
  }
  passport.authenticate(
    'facebook', { scope: ['email', 'user_location', 'user_friends'], session: true }
  )(req,res,next);
});

app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login', session: true }),
  (req, res) => {
    let redirectionRoute = (process.env.NODE_ENV === 'production') ? '/' : 'http://localhost:3001/';
    if (req.cookies.redirectCookie) {
      redirectionRoute += `${req.cookies.redirectCookie}`;
      res.clearCookie('redirectCookie');
    }
    const expiresIn = (process.env.NODE_ENV === 'production') ? 60 * 60 * 8 : 60 * 40; // 40 min in prod, 8 hours in dev
    const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect(redirectionRoute);
  }
);

app.get('/logout', function(req, res) {

  res.cookie("id_token", "", { expires: new Date() });
  req.logout();
  req.session.destroy(function(err) {
    // cannot access session here
    res.redirect('/');
  });
});

app.get('/isLoggedIn', isLoggedIn, (req, res) => {
    res.send({ type: req.user.usertype });
  }
);

app.get('/getUserId', isLoggedIn, (req, res) => {
    res.send(req.user);
  }
);

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: true,
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
})));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    let css = [];
    let statusCode = 200;
    const template = require('./views/index.jade'); // eslint-disable-line global-require
    const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };

    if (process.env.NODE_ENV === 'production') {
      data.trackingId = analytics.google.trackingId;
    }

    await UniversalRouter.resolve(routes, {
      path: req.path,
      query: req.query,
      context: {
        insertCss: (...styles) => {
          styles.forEach(style => css.push(style._getCss())); // eslint-disable-line no-underscore-dangle, max-len
        },
        setTitle: value => (data.title = value),
        setMeta: (key, value) => (data[key] = value),
      },
      render(component, status = 200) {
        css = [];
        statusCode = status;
        data.body = ReactDOM.renderToString(component);
        data.css = css.join('');
        return true;
      },
    });

    res.status(statusCode);
    res.send(template(data));
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const template = require('./views/error.jade'); // eslint-disable-line global-require
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.send(template({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  }));
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
models.sync().catch(err => console.error(err.stack)).then(() => {
  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
  });
});
/* eslint-enable no-console */
