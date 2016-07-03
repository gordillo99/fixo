/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ErrorPage.css';

function ErrorPage({ error }, context) {
  let title = 'Error';
  let content = 'Lo sentimos, un error crítico acaba de ocurrir.';
  let errorMessage = null;

  if (error.status === 404) {
    title = 'Página no fue encontrada';
    content = 'Lo sentimos, esta página no existe.';
  } else if (process.env.NODE_ENV !== 'production') {
    errorMessage = <pre>{error.stack}</pre>;
  }

  context.setTitle(title);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      {errorMessage}
    </div>
  );
}

ErrorPage.propTypes = { error: PropTypes.object.isRequired };
ErrorPage.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(ErrorPage);
