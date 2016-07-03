var connection = require('../src/config.js');
var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();

router.route('/crud')

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "find-areas",
      text: "select id, description from areas",
      values: []
    })
      .then(function (areas) {
          res.send(areas);
      })
      .catch(function (error) {
          console.log(error);
          res.send(error);    
      });
  });

module.exports = router;