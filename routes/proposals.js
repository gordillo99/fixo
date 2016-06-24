var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();
var fileUpload = require('express-fileupload');
var cn = {
    host: 'ec2-50-17-237-148.compute-1.amazonaws.com',
    port: 5432,
    database: 'd3bfagflcfut23',
    user: 'ttqxcdmuatxrvw',
    password: 'Jjnl8YHvHHOrLN5YMEm8KyYnc0',
    ssl: true
};

var db = pgp(cn);
var data;

var createImageQuestions = function(id, image) {
  let imageParts = image.split('*');
  db.none({
    name: "create-image-questions",
    text: "insert into add_questions_image (proposal_id, question, answer) values ($1, $2, $3);",
    values: [id, imageParts[0], imageParts[1]]
  })
    .then(function () {
        res.send(true);
        console.log('Image questions created successfully!');
    })
    .catch(function (error) {
        console.log(error);
        res.send(error);    
  });
}

var createTxtQuestions = function(id, callback=null, image=null) {
  console.log('proposal id ' + id);
  console.log('callback ' + callback);
  console.log('image ' + image);
  console.log('');
  let values = [],
      counter = 1,
      query = '',
      partsOfQsAndAs = data.qsAndAs.split('*');
  partsOfQsAndAs.map( (qAndA, index) => {
    if (index % 2 === 0) {
      values.push(id, qAndA, partsOfQsAndAs[index + 1]);
      query += '($' + (counter++) + ',$' + (counter++) + ',$' + (counter++) + '),';
    }
 });

  query = query.slice(0,-1) + ';';
  console.log(query);
  db.none({
    name: "create-txt-questions",
    text: "insert into add_questions_txt (proposal_id, question, answer) values " + query,
    values: values
  })
    .then(function () {
        if (callback) {
          callback(id, image);
        } else {
          console.log('Txt questions created successfully!');
        }
    })
    .catch(function (error) {
      console.log(error);
      res.send(error);    
  });
};

var createProposal = function(image=null) {
  console.log('image inside createProposal ' + image);
  console.log('');
  db.one({
    name: "create-proposal",
    text: "insert into proposals (user_id, fixer_id, area, address, email, phone_number, prop_date, morning) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning id;",
    values: [data.user_id, data.fixer_id, data.area, data.address, data.email, data.phone_number, data.prop_date, data.morning]
  })
    .then(function (data) {
      console.log('proposal created successfully!');
      if (image) {
        createTxtQuestions(data.id, image, createImageQuestions);
      } else {
        createTxtQuestions(data.id);
      }
    })
    .catch(function (error) {
      console.log(error);
      res.send(error);    
  });
};

router.route('/crud')

  .post(function(req, res) {

    var fs = require('fs'),
        imageFile,
        fileType,
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
          qsAndAs: req.body.qsAndAs
        };
        console.log('data object');
        console.log(data);
        console.log('');

        console.log('image recevied from front end');
        console.log(req.body.image);
        console.log('');
    
    if (req.body.image !== 'false') { // if there's an image
      imageFile = req.body.image.image;
      fileType = imageFile.type.split('/')[1];
      imagePath = __dirname + '/temp/tempQImage.' + fileType;
      console.log('image path ' + imagePath);
      console.log('');
      imageFile.mv(imagePath, function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
          res.send('File uploaded!');
          // read in image in raw format (as type Buffer):
          fs.readFile(imagePath, function (err, imgData) {
            fs.unlink(imagePath, function(imgData) {
              createProposal( {q: req.body.image.q, img: imgData });  
            });
          });
        }
      });
    } else { // if there's no image
      createProposal();
    }
    res.send(true);
  });

module.exports = router;