import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Jumbotron } from 'react-bootstrap';
import s from './ProfileHeader.css';

export default class ProfileHeader extends Component {

  render() {
    return (
      <div className={s.root}>
        <div className={cx(s.centralizedDiv)}>
          <Jumbotron className={cx(s.stripeJumbotron)}>
            <h1 className={s.pageHeader}>Tu perfil</h1>
            <div className={s.underline}/>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProfileHeader);