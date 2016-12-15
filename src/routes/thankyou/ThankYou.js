import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ThankYouDisplay from './../../components/ThankYouDisplay';
import { Jumbotron } from 'react-bootstrap';
import { catEnglishToSpanish } from '../../helpers/helpers.js';
import s from './ThankYou.css';

function ThankYou(props) {
  const title = (props.category) ? catEnglishToSpanish(props.category) : 'Todo está listo' ;
  return (
    <div className={s.root}>
      <div className={s.centralizedDiv}>
        <ThankYouDisplay />
      </div>
    </div>
  );
}

export default withStyles(s)(ThankYou);