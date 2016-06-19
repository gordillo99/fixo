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
      name: "find-user",
      text: "select * from users where firstname = $1",
      values: ['Jose']
    })
      .then(function (user) {
          res.send(user);
      })
      .catch(function (error) {
          console.log(error);
          res.send(error);    
      });
  });



  /*
      .post(function(req, res) {

        var video = new Video();
        video.title = req.body.title;

        video.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Video criado!' });
    });


      })

  */

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