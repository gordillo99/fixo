/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */
/* jscs:disable maximumLineLength */

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

// email settings
export const customerServiceEmail = 'teayudamos@fixo.gt';
export const customerServicePass = '!HELP9588feliz';
export const customerServiceUser = 'fixo.comercial';
export const adminEmails = ['manuel@fixo.gt, rafael@fixo.gt, jose@fixo.gt, fixo.comercial@gmail.com, teayudamos@fixo.gt'];

const prodFlag = process.env.NODE_ENV === 'production';

export const databaseUrl = 'postgres://ttqxcdmuatxrvw:Jjnl8YHvHHOrLN5YMEm8KyYnc0@ec2-50-17-237-148.compute-1.amazonaws.com:5432/d3bfagflcfut23?ssl=true' || 'sqlite:database.sqlite';

export const analytics = {

  // https://analytics.google.com/
  google: { trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-81781810-1' },

};

export const auth = {

  jwt: { secret: process.env.JWT_SECRET || 'este es el secreto mas importante de la galaxia' },

  // https://developers.facebook.com/
  facebook: {
    id: process.env.FACEBOOK_APP_ID || (prodFlag ? '519953108211951' : '525530924320836'),
    secret: process.env.FACEBOOK_APP_SECRET || (prodFlag ? '0d15bf3ba472f484779944f31c6f2b4b' : '5ac2d619e317dff09bac04497b311679') ,
  },

  // https://cloud.google.com/console/project
  google: {
    id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
    secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd',
  },

  // https://apps.twitter.com/
  twitter: {
    key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
    secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
  },

};

// Database config
var pgp = require('pg-promise')();

var cn = {
    host: 'ec2-50-17-237-148.compute-1.amazonaws.com',
    port: 5432,
    database: 'd3bfagflcfut23',
    user: 'ttqxcdmuatxrvw',
    password: 'Jjnl8YHvHHOrLN5YMEm8KyYnc0',
    ssl: true
};

export const db = pgp(cn);
