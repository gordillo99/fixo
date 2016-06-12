var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();
console.log("sindie users");
var db = pgp('postgres://ttqxcdmuatxrvw:Jjnl8YHvHHOrLN5YMEm8KyYnc0@ec2-50-17-237-148.compute-1.amazonaws.com:5432/d3bfagflcfut23');

router.route('/users')

  .get(function(req, res) {
    db.one({
        name: "find-user",
        text: "select * from user where firstname = $1",
        values: ['Jose']
    })
        .then(function (user) {
            console.log("wwerwer");
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

module.exports = router;