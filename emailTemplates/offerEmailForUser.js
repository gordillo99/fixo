module.exports = {
  createOfferEmail: function(proposal, offer) {
  	console.log(proposal);
		var emailTemplate = '';
		emailTemplate += '<h1 style="text-align:left">¡Tu cotización con fixo está lista!</h1>';
		emailTemplate += '<h4 style="text-align:left">Hemos procesado tu propuesta. </h4>';
		emailTemplate += '<h4 style="text-align:left">¡Gracias por usar fixo!</h4>';
	  return emailTemplate;
	}
};