import React from 'react';
import Setup from './Setup';

export default {

  path: '/setup/:category',

  async action({ params }) {
  	let categoria;
  	switch (params.category) {
  		case 'gardening':
  			categoria = 'Jardinería';
  			break;
  		case 'carpentry':
  			categoria = 'Carpintería';
  			break;
  		case 'painting':
  			categoria = 'Aplicación de Pintura';
 			break;
 		case 'electricity':
 			categoria = 'Electricista';
 			break;
 		case 'plumbing':
 			categoria = 'Fontanería';
 			break;
 		default:
 			categoria = 'Categoría Inválida';
 			break;
  	}
    return <Setup categoria={categoria} category={params.category} />;
  },

};