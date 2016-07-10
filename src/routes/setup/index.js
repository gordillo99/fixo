import React from 'react';
import Setup from './Setup';
import { catEnglishToSpanish } from '../../helpers/helpers.js';

export default {

  path: '/setup/:category',

  async action({ params }) {
  	let categoria = catEnglishToSpanish(params.category);
    return <Setup categoria={categoria} category={params.category} />;
  }
};