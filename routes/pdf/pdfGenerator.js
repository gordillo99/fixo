var express = require('express');
var router = express.Router();
var fs = require('fs');
var PDFDocument = require('pdfkit');

router.get('/pdfGenerator/:id',function(req, res){
    var doc = new PDFDocument(); // create instance of PDFDocument
    var filename = __dirname + '/temp/' + req.params.id + (new Date().getTime() + '.pdf'); // this file name is get by form
    var content = 'waaaazaaaaa'; // this text content is get by form

    doc.y = 320; // this set the document horizontal position
    doc.text(content, 100, 100);   
    doc.pipe(fs.createWriteStream(filename));
    res.download(filename, 'proposal_id_'+req.params.id+'.pdf');
    doc.end(); // document end by the end method

});

module.exports = router;
