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

var db = pgp(cn);

router.route('/crud')

  .get(function(req, res) {
    db.manyOrNone({
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