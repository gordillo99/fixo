import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Form, FormGroup, Button, Glyphicon } from 'react-bootstrap';
import { RadioGroup, Radio } from "react-radio-group";
import { catEnglishToSpanish } from '../../../helpers/helpers.js';
import StarDisplayer from '../../reviewComponents/StarDisplayer';
import s from './ReviewDisplay.css';
import $ from 'jquery';

export class ReviewDisplay extends Component {

  render() {
    let starDisplay = null;
    
    if (this.props.review) {
      starDisplay = <StarDisplayer starAmount={this.props.review.rating} />
    }
    
    return (
      <div className={s.root}>
        <p className={s.boldedText}>{`Tu reseña de ${this.props.fixerFirstName} ${this.props.fixerLastName}`}</p>
        <div className={s.leftAlignedDiv}>
          <ul className={s.noListStyle}>
            <li className={s.inlineEles}><p>Calidad de Servicio:</p></li>
            <li className={s.inlineEles}>{starDisplay}</li>
          </ul>
          <p>Comentario: {(this.props.review) ? this.props.review.comment : ''}</p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ReviewDisplay);
