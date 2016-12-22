var connection = require('../src/config.js');
var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();
var fileUpload = require('express-fileupload');
var multer = require('multer');
var app = express();
var config = require('../src/config.js');
var nodemailer = require('nodemailer');

var emailTemplateProposalForAdmin = require('../emailTemplates/proposalEmailForAdmins.js');
var emailTemplateReviewForUser = require('../emailTemplates/reviewReminderEmailForUsers.js');

router.route('/crud/addQuestionsTxtForProposal/:proposal_id')

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "get-all-additional-Qs-txt",
      text: "select * from add_questions_txt where proposal_id = $1;",
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
        res.send(500);    
    });
  });

  router.route('/get/attachedImages/:proposal_id')

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "get-attached-image-for-proposal",
      text: "select * from add_questions_image where proposal_id = $1;",
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

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "get-all-proposals",
      text: "select p.*, u.firstname u_firstname, u.lastname as u_lastname, f.firstname as f_firstname, f.lastname as f_lastname, f.avg_rating, f.num_ratings from proposals as p inner join users as u on (u.id = p.user_id) inner join fixers as f on (f.id = p.fixer_id);",
      values: []
    })
      .then(function (data) {
        res.send(data);
      })
      .catch(function (error) {
        console.log(error);
        res.send(500);    
    });
  })

  .post(multer({ dest: __dirname + '/temp/' }).single('image'), function(req, res) {

    var fs = require('fs'),
        imageFile,
        imagePath,
        data,
        imageData = null,
        response = res;

    /*
    var emailForReview = function() {
      var dataCopy = data;
      var schedule = require('node-schedule');
      // sec * min * hour * day
      //var date = new Date(Date.now() + (1000  * 60 * 60  * 24  * 10));
      /*var date = new Date(Date.now() + (1000 * 60 * 3));
      var job = schedule.scheduleJob(date, function(y){
        
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport('smtps://'+config.customerServiceUser+'%40gmail.com:'+config.customerServicePass+'@smtp.gmail.com');

        // setup e-mail data with unicode symbols
        var mailOptions = {
          from: '"fixo" <'+config.customerServiceEmail+'>', // sender address
          to: dataCopy.email, // list of receivers
          subject: 'fixo: Cuéntanos sobre tu fixer', // Subject line
          text: 'fixo: Cuéntanos sobre tu fixer', // plaintext body
          html: emailTemplateReviewForUser.createReviewEmail() // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
          console.log('Email de reseña enviado exitosamente.');
        });

      }.bind(null, dataCopy));
    }*/

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
          response.send(500);    
      });
    };

    var createTxtQuestions = function(id, callback) {

      var values = [],
          counter = 1,
          query = '',
          partsOfQsAndAs = data.qsAndAs.split('*'),
          proposal_id = id;
          

      partsOfQsAndAs.map((qAndA, index) => {
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
          response.send(500);  
      });
    };

    var addDates = function(proposal_id) {
      var dateQueryString = '';
      var params = [];
      var counter = 0;
      var datesObj = JSON.parse(data.dates);

      var propNames = Object.getOwnPropertyNames(datesObj);
      if (Object.keys(propNames).length === 0) return; 

      propNames.forEach(function(name){
        params.push(proposal_id);
        params.push(datesObj[name].date);
        params.push(datesObj[name].time);
        params.push(datesObj[name].mins);
        params.push(datesObj[name].ampm);
        dateQueryString += `($${++counter}, $${++counter}, $${++counter}, $${++counter}, $${++counter}),`
      });

      dateQueryString = dateQueryString.slice(0,-1);

      connection.db.manyOrNone({
        name: "add-proposal-dates",
        text: `insert into dates_to_proposals (proposal_id, prop_date, prop_time, prop_mins, prop_ampm) values ${dateQueryString};`,
        values: params
      })
        .then(function () {
          console.log('Proposed dates were added successfully.');
        })
        .catch(function (error) {
          console.log(error);
          response.send(500);  
      });
    };

    var createProposal = function() {
      //emailForReview();
      connection.db.one({
        name: "create-proposal",
        text: "insert into proposals (user_id, fixer_id, area, address, email, phone_number, category, created_at, status) VALUES ($1, $2, $3, $4, $5, $6, $7, now(), 0) returning id;",
        values: [data.user_id, data.fixer_id, data.area, data.address, data.email, data.phone_number, data.category]
      })
        .then(function (data) {
          // create reusable transporter object using the default SMTP transport
         // var transporter = nodemailer.createTransport('smtps://'+config.customerServiceUser+'%40gmail.com:'+config.customerServicePass+'@smtp.gmail.com');
         var transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: 'teayudamos@fixo.gt',
                pass: '!HELP9588feliz'
            }
        });
          console.log('proposal created successfully!');
          var adminEmails = '';
          config.adminEmails.map((email) => {
            adminEmails += `${email},`
          });

          adminEmails = adminEmails.slice(0,-1);
          // setup e-mail data with unicode symbols
          var mailOptions = {
            from: '"fixo" <'+config.customerServiceEmail+'>', // sender address
            to: adminEmails, // list of receivers
            subject: 'fixo: Propuesta para fixer', // Subject line
            text: 'fixo: Propuesta para fixer', // plaintext body
            html: emailTemplateProposalForAdmin.createProposalEmail(data.id) // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, function(error, info){
            if(error){
              console.log(error);
              res.send(false);
              return console.log(error);
            }

            console.log('Message sent: ' + info.response);
            if (imageData) {
              createTxtQuestions(data.id, createImageQuestions);
            } else {
              createTxtQuestions(data.id);
            }
            addDates(data.id);
          });
        })
        .catch(function (error) {
          console.log(error);
          response.send(500);    
      });
    };

    data = {
      user_id: req.body.user_id, 
      fixer_id: req.body.fixer_id, 
      area: req.body.area, 
      address: req.body.address, 
      email: req.body.email, 
      phone_number: req.body.phone, 
      dates: req.body.dates, 
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
  })

  .delete(function(req, res) {
    connection.db.manyOrNone({
      name: "delete-proposal",
      text: "delete from proposals where id=$1;",
      values: [req.body.id]
    })
      .then(function () {
        console.log('Proposal was deleted successfully');
        res.send(true);
      })
      .catch(function (error) {
        console.log(error);
        res.send(500);    
    });
  });

router.route('/updateProposalState')

  .post(function(req, res) {
    connection.db.manyOrNone({
      name: "update-state-proposal",
      text: "update proposals set status=$1 where id=$2;",
      values: [req.body.status, req.body.id]
    })
      .then(function () {
        res.send(true);
      })
      .catch(function (error) {
        console.log(error);
        res.send(500);    
    });
  });

router.route('/get/:user_id')

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "get-proposal-for-user",
      text: "select p.id as proposal_id, p.user_id, p.has_review, p.area, p.address, p.email, p.phone_number, p.category, p.created_at, p.status, f.id as fixer_id, f.firstname, f.lastname, f.phone, f.email, f.age, f.gender, f.description, f.profilepic, f.avg_rating, f.num_ratings from proposals as p inner join fixers as f on p.fixer_id = f.id where p.user_id=$1 order by created_at desc;",
      values: [req.params.user_id]
    })
      .then(function (data) {
        res.send(data);
      })
      .catch(function (error) {
        console.log(error);
        res.send(500);    
    });
  });

router.route('/get/dates/:proposal_id')

  .get(function(req, res) {
    connection.db.manyOrNone({
      name: "get-dates-for-proposal",
      text: "select * from dates_to_proposals where proposal_id = $1;",
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

router.route('/get/additional_info/:proposal_id')

  .get(function(req, res) {
    var response = res;
    connection.db.manyOrNone({
      name: "add-info-txt",
      text: "select * from add_questions_txt where proposal_id = $1;",
      values: [req.params.proposal_id]
    })
      .then(function (data) {
        connection.db.manyOrNone({
          name: "add-info-image",
          text: "select * from add_questions_image where proposal_id = $1;",
          values: [req.params.proposal_id]
        })
          .then(function (data2) {
            res.send({
              addQuestionsTxt: data,
              addQuestionsImage: data2
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

router.route('/updateHasReview/:proposal_id')

  .post(function(req, res) {
    connection.db.manyOrNone({
      name: "update-has-review-for-proposal",
      text: "update proposals set has_review = $1 where id = $2;",
      values: [req.body.has_review, req.params.proposal_id]
    })
      .then(function (data) {
        res.send(data);
      })
      .catch(function (error) {
        console.log(error);
        res.send(500);    
    });
  });

router.route('/updateSelectedDate/:proposal_id')

  .post(function(req, res) {
    var response = res;

    connection.db.manyOrNone({
      name: "update-selected-date",
      text: "update dates_to_proposals set selected = false where proposal_id = $1;",
      values: [req.params.proposal_id]
    })
      .then(function () {
        connection.db.manyOrNone({
          name: "update-selected-date",
          text: "update dates_to_proposals set selected = true where id = $1;",
          values: [req.body.id]
        })
          .then(function () {
            res.send(true);
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

module.exports = router;