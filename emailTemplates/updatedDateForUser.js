module.exports = {
  createUpdateDateEmail: function(proposal, selectedDate, selectedTime) {
        var emailTemplate = '';
        emailTemplate += '<h1 style="text-align:left">¡Tu cotización con fixo ha sido confirmada!</h1>';
        emailTemplate += `<h4 style="text-align:left">Hemos contactado a tu fixer y la fecha ha sido confirmada.</h4>`;
        emailTemplate += `<h4 style="text-align:left">${proposal.f_firstname} ${proposal.f_lastname} ha confirmado que llegará a ${proposal.address} el día ${selectedDate} a la hora ${selectedTime}</h4>`
        emailTemplate += '<h4 style="text-align:left">¡Gracias por usar fixo!</h4>';
        return emailTemplate;
    }
};