module.exports = {
  createProposalEmail: function(id) {
		var emailTemplate = '';
		emailTemplate += `<h1 style="text-align:left">Propuesta para fixer solicitando cotización</h1>`;
		emailTemplate += `<h4 style="text-align:left">ID de propuesta: ${id}</h4>`;
		emailTemplate += `<h4 style="text-align:left">Por favor contactar a fixer.</h4>`;
	  return emailTemplate;
	}
};