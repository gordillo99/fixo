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
var createProposal = function(fixerID, userID, date, email, address, area, ) {
  var fs = require('fs');
  // read in image in raw format (as type Buffer):
  fs.readFile(__dirname+'/../routes/'+req.body.profilepic, function (err, imgData) {
    db.none({
      name: "create-fixer",
      text: "insert into proposals (firstname, lastname, phone, email, age, gender, description, profilepic) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",
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



router.route('/crud')

  .post(function(req, res) {

    var sampleFile;

    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }

    sampleFile = req.files.sampleFile;
    sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('File uploaded!');
        }
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