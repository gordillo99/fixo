var connection = require('../src/config.js');
var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();

router.route('/crud')

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "find-categories",
      text: "select id, description from categories;",
      values: []
    })
      .then(function (categories) {
          res.send(categories);
      })
      .catch(function (error) {
          console.log(error);
          res.send(error);    
      });
  });

module.exports = router;