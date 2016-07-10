var connection = require('../src/config.js');
var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();
var multer = require('multer');

var fixerProps;
var imageData = null;
var response = null;

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

  let valuesToInsert = "";
  let arrayOfVals = [];
  let counter = 1;

  if(fixerProps.fixersToCategories.length === 0) {
    insertNewFixerToCategories();
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
      console.log();
      removeAllFixToCatRels();
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

router.route('/crud/:area')

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "find-fixers-in-area",
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

var createFixer = function(fixer, res) {
  connection.db.manyOrNone({
    name: "create-fixer",
    text: "insert into fixers (firstname, lastname, phone, email, age, gender, description, profilepic) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning id;",
    values: [fixer.firstname, fixer.lastname, fixer.phone, fixer.email, fixer.age, fixer.gender, fixer.description, fixer.imgData]
  })
    .then(function (data) {
      console.log('id ' + data);
      console.log('fixer created successfully!');
      response.send(data);
    })
    .catch(function (error) {
      console.log(error);
      res.send(error);    
    });
}

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
    response = res;
    var fs = require('fs'),
        fixer = req.body;

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

  var updateFixer = function(fixer, imgData) {
    let queryUpdateImage = '';

    if (imgData) {
      queryUpdateImage = "update fixers set firstname=$1, lastname=$2, phone=$3, email=$4, age=$5, gender=$6, description=$7, profilepic=$8 where id=$9 ;";
    } else {
      queryUpdateImage = "update fixers set firstname=$1, lastname=$2, phone=$3, email=$4, age=$5, gender=$6, description=$7 where id=$9 ;"
    }

    connection.db.manyOrNone({
      name: "update-fixer",
      text: queryUpdateImage,
      values: [fixer.firstname, fixer.lastname, fixer.phone, fixer.email, fixer.age, fixer.gender, fixer.description, imgData, fixer.id]
    })
      .then(function () {
        return;
      })
      .catch(function (error) {
          console.log(error);
          res.send(error);    
      });
  }

  router.route('/crud/updateFixerAtributes')

  .post(multer({ dest: __dirname + '/temp/' }).single('profilepic'), function(req, res) {

    var fs = require('fs'),
        imageFile,
        imagePath;

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
        if (err) console.log(err);
        fs.unlink(imagePath, function() {
          updateFixer(fixer, imgData);
          res.send(true);
        });
      });
    } else {
      updateFixer(fixer, null);
      res.send(true);
    }
  });

  router.route('/crud/updateFixerCatsAndAreas')

  .post(function(req, res) {
    fixerProps = {
      fixer: req.body.fixer,
      fixersToAreas: req.body.fixersToAreas,
      fixersToCategories: req.body.fixersToCategories
    };
    console.log(fixerProps);

    removeAllFixToAreaRels();
    res.send(true);
  });


module.exports = router;