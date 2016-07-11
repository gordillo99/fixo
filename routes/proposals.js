var connection = require('../src/config.js');
var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();
var fileUpload = require('express-fileupload');
var multer = require('multer');
var app = express();


var data;
var imageData = null;

var createImageQuestions = function(id) {

  connection.db.none({
    name: "create-image-questions",
    text: "insert into add_questions_image (proposal_id, question, answer) values ($1, $2, $3);",
    values: [id, 'Image añadida', imageData]
  })
    .then(function () {
      console.log('Image questions created successfully!');
    })
    .catch(function (error) {
      console.log(error);
      res.send(error);    
  });
}

var createTxtQuestions = function(id, callback) {

  var values = [],
      counter = 1,
      query = '',
      partsOfQsAndAs = data.qsAndAs.split('*'),
      proposal_id = id;

  partsOfQsAndAs.map( (qAndA, index) => {
    if (index % 2 === 0) {
      values.push(id, qAndA, partsOfQsAndAs[index + 1]);
      query += '($' + (counter++) + ',$' + (counter++) + ',$' + (counter++) + '),';
    }
  });

  query = query.slice(0,-1) + ';';

  connection.db.none({
    name: "create-txt-questions",
    text: "insert into add_questions_txt (proposal_id, question, answer) values " + query,
    values: values
  })
    .then(function () {
        if (callback) {
          callback(proposal_id);
        } else {
          console.log('Txt questions created successfully!');
        }
    })
    .catch(function (error) {
      console.log(error);
      res.send(error);    
  });
};

var createProposal = function() {
  connection.db.one({
    name: "create-proposal",
    text: "insert into proposals (user_id, fixer_id, area, address, email, phone_number, prop_date, morning, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id;",
    values: [data.user_id, data.fixer_id, data.area, data.address, data.email, data.phone_number, data.prop_date, data.morning, data.category]
  })
    .then(function (data) {
      console.log('proposal created successfully!');
      if (imageData) {
        createTxtQuestions(data.id, createImageQuestions);
      } else {
        createTxtQuestions(data.id);
      }
    })
    .catch(function (error) {
      console.log(error);
      res.send(error);    
  });
};

router.route('/crud/addQuestionsTxt')

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "get-all-additional-Qs-txt",
      text: "select * from add_questions_txt;",
      values: []
    })
      .then(function (data) {
        res.send(data);
      })
      .catch(function (error) {
        console.log(error);
        res.send(error);    
    });
  });

router.route('/crud/addQuestionsImage')

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "get-all-additional-Qs-image",
      text: "select * from add_questions_image;",
      values: []
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

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "get-all-proposals",
      text: "select p.*, u.firstname u_firstname, u.lastname as u_lastname, f.firstname as f_firstname, f.lastname as f_lastname from proposals as p inner join users as u on (u.id = p.user_id) inner join fixers as f on (f.id = p.fixer_id);",
      values: []
    })
      .then(function (data) {
        res.send(data);
      })
      .catch(function (error) {
        console.log(error);
        res.send(error);    
    });
  })

  .post(multer({ dest: __dirname + '/temp/' }).single('image'), function(req, res) {

    var fs = require('fs'),
        imageFile,
        imagePath;

        data = {
          user_id: req.body.user_id, 
          fixer_id: req.body.fixer_id, 
          area: req.body.area, 
          address: req.body.address, 
          email: req.body.email, 
          phone_number: req.body.phone, 
          prop_date: req.body.date, 
          morning: req.body.morning,
          category: req.body.category, 
          qsAndAs: req.body.qsAndAs
        };
    
    if (req.file !== undefined) { // if there's an image
      imageFile = req.file;
      imagePath = req.file.path;
      
      console.log('reading file...');
      // read in image in raw format (as type Buffer):
      fs.readFile(imagePath, function (err, imgData) {
        if (err) console.log(err);
        imageData = imgData;
        fs.unlink(imagePath, function() {
          createProposal();  
        });
      });
    } else { // if there's no image
      createProposal();
    }
    res.send(true);
  });

module.exports = router;