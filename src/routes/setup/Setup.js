import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Jumbotron } from 'react-bootstrap';
import ProgressionStatus from './../../components/ProgressionStatus';
import SetupForm from './../../components/SetupForm';
import s from './Setup.css';

export default class Setup extends Component {

  render() {
    return (
      <div className={s.root}>
        <div className={s.centralizedDiv}>
          <Jumbotron className={s.stripeJumbotron}>
            <h1>{this.props.categoria}</h1>
            <ProgressionStatus />
            <SetupForm />
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Setup);