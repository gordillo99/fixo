import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ProposalConfirmation from './../../components/ProposalConfirmation';
import { Jumbotron } from 'react-bootstrap';
import s from './Confirmation.css';

function Confirmation(props) {
  return (
    <div className={s.root}>
      <div className={s.centralizedDiv}>
        <ProposalConfirmation />
      </div>
    </div>
  );
}

export default withStyles(s)(Confirmation);