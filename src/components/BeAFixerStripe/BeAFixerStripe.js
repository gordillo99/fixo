import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import befixer from './images/befixer.png';
import befixermob from './images/befixermob2.png';
import s from './BeAFixerStripe.css';
import $ from 'jquery';

export class BeAFixerStripe extends Component {

  render() {
		
    return (
      <div className={cx(s.root)}>
      	<div className={s.leftAligned}>
          <img className={cx(s.stripeImage, s.mobileInvisible)} src={befixer} />
          <img className={cx(s.stripeImage, s.mobileVisible)} src={befixermob} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(BeAFixerStripe);
