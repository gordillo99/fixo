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
import cx from 'classnames';
import s from './Login.css';
import security from './images/security.png';
import technology from './images/technology.png';

const title = 'Inicio de Sesión';
let redirectAddress = '';

function Login(props, context) {
  redirectAddress = (props.redirectTo) ? `/login/facebook?redirectTo=${props.redirectTo}` : '/login/facebook';
  return (
    <div>
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={cx(s.loginHeader)}>{title}</h1>
          <p className={s.lead}>Para proteger tu privacidad y asegurarnos que no eres un robot, por favor inicia sesión usando tu cuenta de Facebook</p>
          <img src={technology} height='128px' width='128px' />
          <img src={security} height='128px' width='128px' />
          <p className={s.disclaimer}>Al iniciar sesión, estás aceptando<br/> nuestros <a href="/terms">términos y condiciones</a></p>
          <div className={s.formGroup}>
            <a className={s.facebook} href={redirectAddress}>
              <svg
                className={s.icon}
                width="30"
                height="30"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z"
                />
              </svg>
              <span>Inicia Sesión con Facebook</span>
            </a>
          </div>
            <div className={s.leftAligned}>
            <p className={s.iconCredit}>Icon made by Freepik from www.flaticon.com</p>
            <p className={cx(s.iconCredit, s.minimalBottomPadding)}>Icon made by AnhGreen from www.flaticon.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Login);
