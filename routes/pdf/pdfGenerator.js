var express = require('express');
var router = express.Router();
var fs = require('fs');
var PDFDocument = require('pdfkit');

router.get('/pdfGenerator/:id',function(req, res){
  var doc = new PDFDocument();
  var filename = __dirname + '/temp/' + req.params.id + (new Date().getTime() + '.pdf');
  var content = 'waaaazaaaaa';

  res.setHeader('Content-type', 'application/pdf');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Disposition', 'attachment; filename=proposal_id_'+req.params.id+'.pdf');

  doc.y = 320; // this set the document horizontal position
  doc.text(content, 100, 100);   
	doc.pipe(res);
  doc.end();
});

module.exports = router;
