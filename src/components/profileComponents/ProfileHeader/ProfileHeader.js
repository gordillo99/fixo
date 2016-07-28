import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Jumbotron } from 'react-bootstrap';
import s from './ProfileHeader.css';

export default class ProfileHeader extends Component {

  render() {
    return (
      <div className={s.root}>
        <div className={classNames(s.centralizedDiv)}>
          <Jumbotron className={classNames(s.stripeJumbotron)}>
            <h1>Perfil de<br/>{`${this.props.givenName} ${this.props.middleName} ${this.props.familyName}`}</h1>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProfileHeader);