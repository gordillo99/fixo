var connection = require('../src/config.js');
var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();

router.route('/crud')

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "find-user",
      text: "select * from users;",
      values: []
    })
      .then(function (user) {
          res.send(user);
      })
      .catch(function (error) {
          console.log(error);
          res.send(error);    
      });
  })

  .post(function(req, res) {
    connection.db.manyOrNone({
      name: "update-user",
      text: "update users set usertype=$1 where id=$2;",
      values: [req.body.usertype, req.body.id]
    })
      .then(function (user) {
          res.send(user);
      })
      .catch(function (error) {
          console.log(error);
          res.send(error);    
      });
  })

  .delete(function(req, res) {
    connection.db.manyOrNone({
      name: "delete-user",
      text: "delete from users where id=$1;",
      values: [req.body.id]
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