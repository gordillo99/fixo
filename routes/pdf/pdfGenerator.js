var express = require('express');
var router = express.Router();
var fs = require('fs');
var PDFDocument = require('pdfkit');

router.route('/pdfGenerator')

	.get(function(req, res){
		let query = req.query;
	  let doc = new PDFDocument();
	  let i;
	  let limit = Number(req.query.numberOfQs);
	  let content = 'Información de propuesta\n\n'; 
	  content += `ID de propuesta: ${query.id}\nNombre de usuario: ${query.u_firstname} ${query.u_lastname}\nFecha propuesta: ${query.prop_date}\nTeléfono de usuario: ${query.phone}\nEmail de usuario: ${query.email}\nDirección: ${query.address}\nÁrea: ${query.area}\nFecha de creación: ${query.created_at}\nID de fixer: ${query.fixer_id}\nNombre de fixer: ${query.f_firstname} ${query.f_lastname}\n`;
	  content += '\nInformación adicional\n\n';

	  for (i = 1; i < limit; i++) {
	  	content += `Pregunta ${i}: ${query[`qt${i}`]}\n`;
	  	content += `Respuesta ${i}: ${query[`at${i}`]}\n\n`;
	  }

	  res.setHeader('Content-type', 'application/pdf');
	  res.setHeader('Access-Control-Allow-Origin', '*');
	  res.setHeader('Content-Disposition', 'inline; filename=propuesta_id_'+req.params.id+'.pdf');

	  //pdf images
	  //http://stackoverflow.com/questions/20956865/how-to-render-image-as-pdf-canvas-and-pdfkit
	  doc.y = 320; // this set the document horizontal position
	  doc.text(content, 100, 100);   
		doc.pipe(res);
	  doc.end();
	});

module.exports = router;
