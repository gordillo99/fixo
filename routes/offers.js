var connection = require('../src/config.js');
var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();

router.route('/crud')

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "get-all-offers",
      text: "select * from offers",
      values: []
    })
      .then(function (offers) {
          res.send(offers);
      })
      .catch(function (error) {
          console.log(error);
          res.send(error);    
      });
  });

module.exports = router;