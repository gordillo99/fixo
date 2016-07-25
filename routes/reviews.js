var connection = require('../src/config.js');
var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();

router.route('/crud/:proposal_id')

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "get-review-for-proposal",
      text: "select * from reviews where proposal_id=$1;",
      values: [req.params.proposal_id]
    })
      .then(function (data) {
          res.send(data);
      })
      .catch(function (error) {
          console.log(error);
          res.send(error);    
      });
  });

router.route('/crud')

  .post(function(req, res) {
    connection.db.manyOrNone({
      name: "create-a-review",
      text: "insert into reviews (user_id, fixer_id, proposal_id, rating, comment) values ($1, $2, $3, $4, $5);",
      values: [req.body.user_id, req.body.fixer_id, req.body.proposal_id, req.body.rating, req.body.comment]
    })
      .then(function () {
          res.send(true);
      })
      .catch(function (error) {
          console.log(error);
          res.send(error);    
      });
  });

module.exports = router;