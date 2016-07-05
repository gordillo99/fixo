var connection = require('../src/config.js');
var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();

var fixerProps;

var removeAllFixToAreaRels = function() {
  connection.db.manyOrNone({
    name: "clear-fixerToAreaRels",
    text: "delete from fixers_to_areas where fixer_id=$1;",
    values: [fixerProps.fixer.fixer_id]
  })
    .then(function () {
        insertNewFixerToAreas();
    })
    .catch(function (error) {
        console.log(error);
        res.send(error);    
    });
}

var removeAllFixToCatRels = function() {
  connection.db.manyOrNone({
    name: "clear-fixerToCatRels",
    text: "delete from fixers_to_categories where fixer_id=$1;",
    values: [fixerProps.fixer.fixer_id]
  })
    .then(function () {
        insertNewFixerToCategories();
    })
    .catch(function (error) {
        console.log(error);
        res.send(error);    
    });
}

var insertNewFixerToAreas = function() {

  var valuesToInsert = "";
  var arrayOfVals = [];
  var counter = 1;

  fixerProps.fixersToAreas.map((fixToArea) => {
    valuesToInsert += " ($" + (counter++) + ",$" + (counter++) + "),";
    arrayOfVals.push(fixToArea.fixer_id);
    arrayOfVals.push(fixToArea.area_id);
  });

  valuesToInsert = valuesToInsert.slice(0, -1);

  connection.db.manyOrNone({
    name: "add-new-fixerToAreaRels",
    text: "insert into fixers_to_areas (fixer_id, area_id) values " + valuesToInsert,
    values: arrayOfVals
  })
    .then(function () {
      removeAllFixToCatRels();
    })
    .catch(function (error) {
        console.log(error);
        res.send(error);    
    });
}

var insertNewFixerToCategories = function() {

  var valuesToInsert = "";
  var arrayOfVals = [];
  var counter = 1;

  fixerProps.fixersToCategories.map((fixToCat) => {
    valuesToInsert += " ($" + (counter++) + ",$" + (counter++) + "),";
    arrayOfVals.push(fixToCat.fixer_id);
    arrayOfVals.push(fixToCat.category_id);
  });

  valuesToInsert = valuesToInsert.slice(0, -1);

  connection.db.manyOrNone({
    name: "add-new-fixerToCategoryRels",
    text: "insert into fixers_to_categories (fixer_id, category_id) values " + valuesToInsert,
    values: arrayOfVals
  })
    .then(function () {
        
    })
    .catch(function (error) {
        console.log(error);
        res.send(error);    
    });
}

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

router.route('/getAllAreas')

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "getAll-fixersToAreas",
      text: "select * from fixers_to_areas;",
      values: []
    })
      .then(function (fixToAreas) {
          res.send(fixToAreas);
      })
      .catch(function (error) {
          console.log(error);
          res.send(error);    
      });
  });

  router.route('/getAllCategories')

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "getAll-fixersToCategories",
      text: "select * from fixers_to_categories;",
      values: []
    })
      .then(function (fixToCats) {
          res.send(fixToCats);
      })
      .catch(function (error) {
          console.log(error);
          res.send(error);    
      });
  });

  router.route('/crud/updateFixer')

  .post(function(req, res) {
    fixerProps = {
      fixer: req.body.fixer,
      fixersToAreas: req.body.fixersToAreas,
      fixersToCategories: req.body.fixersToCategories
    };

    connection.db.manyOrNone({
      name: "update-fixer",
      text: "update fixers set firstname=$1, lastname=$2, phone=$3, email=$4, age=$5, gender=$6, description=$7, profilepic=$8 where id=$9;",
      values: [req.body.firstname, req.body.lastname, req.body.phone, req.body.email, req.body.age, req.body.gender, req.body.description, req.body.profilepic, req.body.id]
    })
      .then(function () {
          removeAllFixToAreaRels();
          res.send(true);
      })
      .catch(function (error) {
          console.log(error);
          res.send(error);    
      });
  });


module.exports = router;