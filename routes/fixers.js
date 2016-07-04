var connection = require('../src/config.js');
var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();

router.route('/crud/:area')

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "find-user",
      text: "select * from fixers as f inner join fixers_to_areas as fa on (f.id = fa.fixer_id) and (fa.area_id = $1)",
      values: [req.params.area]
    })
      .then(function (fixers) {
          res.send(fixers);
      })
      .catch(function (error) {
          console.log(error);
          res.send(error);    
      });
  });

router.route('/crud/')

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "get-all-fixers",
      text: "select * from fixers;",
      values: []
    })
      .then(function (fixers) {
          res.send(fixers);
      })
      .catch(function (error) {
          console.log(error);
          res.send(error);    
      });
  })

  .post(function(req, res) {
    var fs = require('fs');
    // read in image in raw format (as type Buffer):
    fs.readFile(__dirname+'/../routes/'+req.body.profilepic, function (err, imgData) {
      connection.db.none({
        name: "create-fixer",
        text: "insert into fixers (firstname, lastname, phone, email, age, gender, description, profilepic) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",
        values: [req.body.firstname, req.body.lastname, req.body.phone, req.body.email, req.body.age, req.body.gender, req.body.description, imgData]
      })
        .then(function () {
            res.send(true);
            console.log('fixer created successfully!');
        })
        .catch(function (error) {
            console.log(error);
            res.send(error);    
        });
      });
    });


  /*

  var fs = require('fs');

  // read in image in raw format (as type Buffer):
  fs.readFile('image.jpg', function (err, imgData) {
      // inserting data into column 'img' of type 'bytea':
      db.none('insert into images(img) values ($1)', imgData)
          .then(function () {
              // success;
          })
          .catch(function (error) {
              console.log("ERROR:", error.message || error);
          });
  });
  */

module.exports = router;