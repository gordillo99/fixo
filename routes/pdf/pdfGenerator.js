var express = require('express');
var router = express.Router();
var fs = require('fs');
var PDFDocument = require('pdfkit');

router.route('/pdfGenerator/:id')

	.get(function(req, res){
		var query = req.query;
	  var doc = new PDFDocument();
	  var filename = __dirname + '/temp/' + req.params.id + (new Date().getTime() + '.pdf');
	  var content = `ID de propuesta: ${query.id}\nNombre de usuario: ${query.u_firstname} ${query.u_lastname}\nFecha propuesta: ${query.prop_date}\nTeléfono de usuario: ${query.phone}\nEmail de usuario: ${query.email}\nDirección: ${query.address}\nÁrea: ${query.area}\nFecha de creación: ${query.created_at}\nID de fixer: ${query.fixer_id}\nNombre de fixer: ${query.f_firstname} ${query.f_lastname}\n`;

	  console.log(content);
	  res.setHeader('Content-type', 'application/pdf');
	  res.setHeader('Access-Control-Allow-Origin', '*');
	  res.setHeader('Content-Disposition', 'inline; filename=proposal_id_'+req.params.id+'.pdf');

	  doc.y = 320; // this set the document horizontal position
	  doc.text(content, 100, 100);   
		doc.pipe(res);
	  doc.end();
	});

module.exports = router;
