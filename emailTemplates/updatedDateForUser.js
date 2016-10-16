module.exports = {
  createUpdateDateEmail: function(proposal, selectedDate, selectedTime) {
        var emailTemplate = '';
        emailTemplate += '<h1 style="text-align:left">¡Tu servicio ha sido confirmado!</h1>';
        emailTemplate += `<p style="text-align:left">Hemos contactado a tu fixer y ha escogido la fecha.</p>`;
        emailTemplate += `<p style="text-align:left">${proposal.f_firstname} ${proposal.f_lastname} llegará a ${proposal.address} el día ${selectedDate} a la hora ${selectedTime}</p>`
        emailTemplate += '<p style="text-align:left">Cualquier duda o comentario, contáctanos a fixo.comercial@gmail.com</p>';
        emailTemplate += '<p style="text-align:left">¡Gracias por usar fixo!</p>';
        return emailTemplate;
    }
};