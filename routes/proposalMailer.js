var connection = require('../src/config.js');
var express = require('express');
var router = express.Router();
var config = require('../src/config.js');
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://'+config.customerServiceUser+'%40gmail.com:'+config.customerServicePass+'@smtp.gmail.com');

router.route('/mail/proposal')

  .post(function(req, res) {
    // setup e-mail data with unicode symbols
		var mailOptions = {
	    from: '"fixo 👥" <'+config.customerServiceEmail+'>', // sender address
	    to: 'jose_javier_gordillo@hotmail.com', // list of receivers
	    subject: 'Hello ✔', // Subject line
	    text: 'Hello world 🐴', // plaintext body
	    html: '<b>Hello world 🐴</b>' // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		    res.send(true);
		});
  });

module.exports = router;