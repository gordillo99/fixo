var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();

var cn = {
    host: 'ec2-50-17-237-148.compute-1.amazonaws.com',
    port: 5432,
    database: 'd3bfagflcfut23',
    user: 'ttqxcdmuatxrvw',
    password: 'Jjnl8YHvHHOrLN5YMEm8KyYnc0',
    ssl: true
};
var FB = require('fb'),
    options = {version: 'v2.6', appId: '519953108211951', appSecret: '0d15bf3ba472f484779944f31c6f2b4b'};

var db = pgp(cn);


/*

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

*/

module.exports = router;