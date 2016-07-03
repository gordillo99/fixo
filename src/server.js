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
// Routes Setup
//
app.use('/api/users', usersRest);
app.use('/api/fixers', fixersRest);
app.use('/api/areas', areasRest);
app.use('/api/proposals', proposalsRest);

//
// Authentication
// -----------------------------------------------------------------------------

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

app.get('/login/facebook',
  passport.authenticate('facebook', { scope: ['email', 'user_location', 'user_friends'], session: true })
);
app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login', session: true }),
  (req, res) => {
    const expiresIn = 60 * 20; // 20 min
    const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect((process.env.NODE_ENV === 'production') ? '/' : 'http://localhost:3001');
  }
);
var request = require('request');
app.get('/logout', function(req, res) {

  res.cookie("id_token", "", { expires: new Date() });
  req.logout();
  req.session.destroy(function(err) {
    // cannot access session here
    res.redirect('/');
  });
});

app.get('/isLoggedIn', isLoggedIn, (req, res) => {
    let uT = String(req.user.usertype);
    res.send({ type: req.user.usertype });
  }
);

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  console.log('isAuthenticated' + req.isAuthenticated());
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated() ? true : false)
      return next();

  // if they aren't redirect them to the home page
  res.send(false);
}

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
