var connection = require('../src/config.js');
var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();

router.route('/crud/:proposal_id')

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "get-review-for-proposal",
      text: "select * from reviews where proposal_id=$1;",
      values: [req.params.proposal_id]
    })
      .then(function (data) {
        res.send(data);
      })
      .catch(function (error) {
        console.log(error);
        res.send(500);    
      });
  });

router.route('/crud')

  .post(function(req, res) {
    var response = res;
    connection.db.manyOrNone({
      name: "create-a-review",
      text: "insert into reviews (user_id, fixer_id, proposal_id, rating, comment) values ($1, $2, $3, $4, $5);",
      values: [req.body.user_id, req.body.fixer_id, req.body.proposal_id, req.body.rating, req.body.comment]
    })
      .then(function () {
        connection.db.manyOrNone({
          name: "get-all-reviews-for-fixer",
          text: "select * from reviews where fixer_id = $1;",
          values: [req.body.fixer_id]
        })
          .then(function (data) {
            var sum = 5; //default starting value
            var totalEles = data.length + 1; //default starting review
            data.map((review, index) =>{
              sum += review.rating;
            });
            var avg = sum / totalEles;
            console.log(`avg: ${avg} ${typeof avg}`);
            console.log(`sum: ${sum} ${typeof sum}`);
            console.log(`totalEles: ${totalEles} ${typeof totalEles}`);
            connection.db.manyOrNone({
              name: "update-rating-fixer",
              text: "update fixers set avg_rating=$1, num_ratings=$2 where id=$3;",
              values: [avg, totalEles, req.body.fixer_id]
            })
              .then(function () {
                response.send(true)
              })
              .catch(function (error) {
                console.log(error);
                response.send(500);    
              });
          })
          .catch(function (error) {
            console.log(error);
            response.send(500);    
          });
      })
      .catch(function (error) {
        console.log(error);
        response.send(500);    
      });
  });

router.route('/crud/fixer/:fixer_id')

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "get-all-reviews-and-user-info-for-fixer",
      text: "select r.*, u.firstname, u.lastname from reviews as r inner join users as u on r.user_id = u.id where fixer_id = $1;",
      values: [req.params.fixer_id]
    })
      .then(function (data) {
        res.send(data);
      })
      .catch(function (error) {
        console.log(error);
        res.send(500); 
      });
  });



module.exports = router;