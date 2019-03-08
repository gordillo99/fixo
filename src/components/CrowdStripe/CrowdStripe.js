import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import crowdsourcing from './images/crowd4.png';
import crowdsourcingmob from './images/crowd5.png';
import s from './CrowdStripe.css';
import $ from 'jquery';

export default class CrowdStripe extends Component {

  render() {
		
    return (
      <div className={cx(s.root)}>
      	<div className={s.centeredDiv}>
          <img className={cx(s.bannerImage, s.mobileInvisible)} src={crowdsourcing} />
          <img className={cx(s.bannerImage, s.mobileVisible)} src={crowdsourcingmob} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CrowdStripe);