
import React from 'react';
import ThankYou from './ThankYou';

export default {

  path: '/thankyou',

  action(req) {
    return <ThankYou category={req.query.category} />;
  },

};
