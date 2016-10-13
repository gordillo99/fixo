var connection = require('../src/config.js');
var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();
var multer = require('multer');

router.route('/crud/:area/:category')

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "find-fixers-in-area",
      text: "select f.* from fixers as f inner join fixers_to_areas as fa on (f.id = fa.fixer_id) and (fa.area_id = $1) inner join fixers_to_categories as fc on (f.id = fc.fixer_id) inner join categories as cat on (cat.description = $2) and (cat.id = fc.category_id) order by random();",
      values: [req.params.area, req.params.category]
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

  .post(multer({ dest: __dirname + '/temp/' }).single('profilepic'), function(req, res) {
    var response = res;
    var fs = require('fs'),
        fixer = req.body;

    var createFixer = function(fixer, res) {
      connection.db.manyOrNone({
        name: "create-fixer",
        text: "insert into fixers (firstname, lastname, phone, email, age, gender, description, profilepic) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning id;",
        values: [fixer.firstname, fixer.lastname, fixer.phone, fixer.email, fixer.age, fixer.gender, fixer.description, fixer.imgData]
      })
        .then(function (data) {
          console.log('fixer created successfully!');
          response.send(data);
        })
        .catch(function (error) {
          console.log(error);
          error.errStat = true;
          response.send(error);    
        });
    }

    if (req.file) {
      // read in image in raw format (as type Buffer):
      fs.readFile(req.file.path, function (err, imgData) {
        fixer.imgData = imgData;
        fs.unlink(req.file.path, function() {
            return createFixer(fixer);
          });
        });
    } else {
      return createFixer(fixer);
    }
  })

  .delete(function(req, res) {
    connection.db.manyOrNone({
      name: "delete-fixer",
      text: "delete from fixers where id=$1;",
      values: [req.body.id]
    })
      .then(function () {
          res.send(true);
      })
      .catch(function (error) {
          console.log(error);
          res.send(false);    
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

  router.route('/crud/updateFixerAtributes')

  .post(multer({ dest: __dirname + '/temp/' }).single('profilepic'), function(req, res) {
    var fs = require('fs'),
        response = res,
        imageFile,
        imagePath;

    var updateFixer = function(fixer, imgData) {
      var queryUpdateImage = '';
      var values = [];

      if (imgData !== null && imgData !== undefined) {
        queryUpdateImage = "update fixers set firstname=$1, lastname=$2, phone=$3, email=$4, age=$5, gender=$6, description=$7, profilepic=$8 where id=$9;";
        values = [fixer.firstname, fixer.lastname, fixer.phone, fixer.email, fixer.age, fixer.gender, fixer.description, imgData, fixer.id];
      } else {
        queryUpdateImage = "update fixers set firstname=$1, lastname=$2, phone=$3, email=$4, age=$5, gender=$6, description=$7 where id=$8;"
        values = [fixer.firstname, fixer.lastname, fixer.phone, fixer.email, fixer.age, fixer.gender, fixer.description, fixer.id];
      }

      connection.db.manyOrNone({
        name: "update-fixer",
        text: queryUpdateImage,
        values: values
      })
        .then(function () {
          console.log('Fixer updated successfully!');
          response.send(true);
        })
        .catch(function (error) {
          console.log(error);
          response.send(false);  
        });
    }

    fixer = {
      id: req.body.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone,
      email: req.body.email,
      age: req.body.age,
      gender: req.body.gender,
      description: req.body.description
    };

    if (req.file) {
      imagePath = req.file.path;

      console.log('reading file...');
      // read in image in raw format (as type Buffer):
      fs.readFile(imagePath, function (err, imgData) {
        if (err) {
          console.log(err);
          res.send(false);
          return;
        }

        fs.unlink(imagePath, function() {
          updateFixer(fixer, imgData);
        });
      });
    } else {
      updateFixer(fixer, null);
    }
  });

  router.route('/crud/updateFixerCatsAndAreas')

  .post(function(req, res) {
    var fixerProps = {
      fixer: req.body.fixer,
      fixersToAreas: req.body.fixersToAreas,
      fixersToCategories: req.body.fixersToCategories
    };

    var removeAllFixToAreaRels = function() {
      connection.db.manyOrNone({
        name: "clear-fixerToAreaRels",
        text: "delete from fixers_to_areas where fixer_id=$1;",
        values: [fixerProps.fixer.id]
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
        values: [fixerProps.fixer.id]
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

      if(fixerProps.fixersToCategories.length === 0) {
        return;
      }

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
          return;
        })
        .catch(function (error) {
          console.log(error);
          return error;   
        });
    }

    var insertNewFixerToCategories = function() {

      var valuesToInsert = "";
      var arrayOfVals = [];
      var counter = 1;

      if(fixerProps.fixersToCategories.length === 0) {
        return;
      }

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
          return;
        })
        .catch(function (error) {
          console.log(error);
          return error;    
        });
    }

    removeAllFixToAreaRels();
    removeAllFixToCatRels();

    res.send(true);
  });


module.exports = router;