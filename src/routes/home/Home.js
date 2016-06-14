/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import MainPageStripe1 from './../../components/MainPageStripe1';
import MainPageStripe2 from './../../components/MainPageStripe2';
import MainPageStripe3 from './../../components/MainPageStripe3';
import s from './Home.css';

export default class Home extends Component {

  render() {
    return (
      <div className={s.root}>
        <div className={classNames(s.centralizedDiv)}>
          <MainPageStripe1 />
          <MainPageStripe2 />
          <MainPageStripe3 />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);