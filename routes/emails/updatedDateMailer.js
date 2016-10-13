var express = require('express');
var router = express.Router();
var config = require('../../src/config.js');
var nodemailer = require('nodemailer');
var emailTemplates = require('../../emailTemplates/updatedDateForUser.js');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://'+config.customerServiceUser+'%40gmail.com:'+config.customerServicePass+'@smtp.gmail.com');

router.route('/sendEmail')

  .post(function(req, res) {
      console.log(req.body);
    // setup e-mail data with unicode symbols
		var mailOptions = {
            from: '"fixo" <'+config.customerServiceEmail+'>', // sender address
            to: req.body.proposal.email, // list of receivers
            subject: 'fixo: Confirmación de fecha de servicio', // Subject line
            text: 'fixo: Confirmación de fecha de servicio', // plaintext body
            html: emailTemplates.createUpdateDateEmail(req.body.proposal, req.body.selectedDate, req.body.selectedTime) // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		    	res.send(500);
		      return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		    res.send(true);
		});
  });

module.exports = router;