module.exports = {
  createReviewEmail: function(prod) {
		var emailTemplate = '';
		var url = (prod) ? 'https://fixo.herokuapp.com' : 'http://localhost:3001';
		emailTemplate += `<h1 style="text-align:center">¡Gracias por usar fixo!</h1>`;
		emailTemplate += `<h4 style="text-align:left">Por favor danos tu opinión respecto a tu fixer.</h4>`;
		emailTemplate += `<h4 style="text-align:left">Tus comentarios ayudarán a otras personas a tener una mejor experiencia :)</h4>`;
		emailTemplate += `<h4 style="text-align:left">Por favor usa este link para comentar sobre tu fixer:</h4>`;
		emailTemplate += `<a href="${url}/login?redirectTo=profile" style="text-align:left">¡Haz click aquí para calificar a tu fixer!</a>`;
	  return emailTemplate;
	}
};
