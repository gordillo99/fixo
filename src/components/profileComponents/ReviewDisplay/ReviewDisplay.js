import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Form, FormGroup, Button, Glyphicon } from 'react-bootstrap';
import { RadioGroup, Radio } from "react-radio-group";
import { catEnglishToSpanish } from '../../../helpers/helpers.js';
import s from './ReviewDisplay.css';
import $ from 'jquery';

export default class ReviewDisplay extends Component {

  render() {
    let starDisplay = null;
    
    if (this.props.review) {
      switch (Number(this.props.review.rating)) {
        case 1:
          starDisplay = <Glyphicon glyph="star" />;
          break;
        case 2:
          starDisplay = <ul className={s.noListStyle}><li className={s.inlineEles}><Glyphicon glyph="star" /></li>
                        <li className={s.inlineEles}><Glyphicon glyph="star" /></li></ul>
          break;
        case 3:
           starDisplay = <ul className={s.noListStyle}><li className={s.inlineEles}><Glyphicon glyph="star" /></li>
                         <li className={s.inlineEles}><Glyphicon glyph="star" /></li>
                         <li className={s.inlineEles}><Glyphicon glyph="star" /></li></ul>
          break;
        case 4:
          starDisplay = <ul className={s.noListStyle}><li className={s.inlineEles}><Glyphicon glyph="star" /></li>
                        <li className={s.inlineEles}><Glyphicon glyph="star" /></li>
                        <li className={s.inlineEles}><Glyphicon glyph="star" /></li>
                        <li className={s.inlineEles}><Glyphicon glyph="star" /></li></ul>
          break;
        case 5:
          starDisplay = <ul className={s.noListStyle}><li className={s.inlineEles}><Glyphicon glyph="star" /></li>
                        <li className={s.inlineEles}><Glyphicon glyph="star" /></li>
                        <li className={s.inlineEles}><Glyphicon glyph="star" /></li>
                        <li className={s.inlineEles}><Glyphicon glyph="star" /></li>
                        <li className={s.inlineEles}><Glyphicon glyph="star" /></li></ul>
          break;
        default:
          starDisplay = null;
          break;
      }
    }
    
    return (
      <div className={s.root}>
        <p className={s.boldedText}>Tu reseña</p>
        {starDisplay}
        <div className={s.leftAlignedDiv}>
          <p>Comentario:</p>
          <p>{(this.props.review) ? this.props.review.comment : ''}</p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ReviewDisplay);
