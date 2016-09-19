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
import tools from './images/tools.png';
import handyman from './images/handyman.png';
import cx from 'classnames';

function ErrorPage({ error }, context) {
  let title = 'Error';
  let content = 'Lo sentimos, un error acaba de ocurrir. ¡Parece que necesitamos un fixer aquí!';
  let errorMessage = null;

  if (error.status === 404) {
    title = 'Página no fue encontrada';
    content = 'Quizás necesitemos que un fixer venga a crear esta página...';
  } else if (process.env.NODE_ENV !== 'production') {
    errorMessage = <pre>{error.stack}</pre>;
  }
  console.log(error);

  context.setTitle(title);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      {errorMessage}
      <img src={handyman} height='128px' width='128px' />
      <img src={tools} height='128px' width='128px' />
      <div className={s.centerAligned}>
        <p className={s.iconCredit}>Icon made by Freepik from www.flaticon.com</p>
        <p className={cx(s.iconCredit, s.minimalBottomPadding)}>Icon made by Freepik from www.flaticon.com</p>
      </div>
    </div>
  );
}

ErrorPage.propTypes = { error: PropTypes.object.isRequired };
ErrorPage.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(ErrorPage);
