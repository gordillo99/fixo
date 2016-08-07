import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Form, FormGroup, Button, Glyphicon, FormControl } from 'react-bootstrap';
import { RadioGroup, Radio } from "react-radio-group";
import { catEnglishToSpanish } from '../../../helpers/helpers.js';
import s from './ReviewForm.css';
import $ from 'jquery';

export default class ReviewForm extends Component {

  constructor() {
    super();
    this.state = {
      selectedValue: 5,
      comment: ''
    };
  }

  _updateProperty(event) {
    this.setState({ comment: event.target.value });
  }

  _handleChange(value) {
    this.setState({ selectedValue: value });
  }

  _createReviewInDb() {
    let data = {
      rating: Number(this.state.selectedValue),
      comment: this.state.comment,
      user_id: this.props.user_id,
      fixer_id: this.props.fixer_id,
      proposal_id: this.props.proposal_id
    };

    $.ajax({
      url: '/api/reviews/crud',
      type: 'POST',
      data: JSON.stringify(data),
      cache: false,
      contentType:'application/json',
      handleAs: 'json',
      processData: false,
      success: function() {
        $.ajax({
          url: `/api/proposals/updateHasReview/${this.props.proposal_id}`,
          type: 'POST',
          data: JSON.stringify({ has_review: 'yes' }),
          cache: false,
          contentType:'application/json',
          handleAs: 'json',
          processData: false,
          success: function() {
            alert('La reseña fue creada exitosamente!');
            this.props.updateHasReview(true, {
              rating: Number(this.state.selectedValue),
              comment: this.state.comment
            });
          }.bind(this),
          error: function(xhr, status, err) {
            alert(err);
            console.log(err);
          }.bind(this)
        });
        this.props.updateHasReview(true);
      }.bind(this),
      error: function(xhr, status, err) {
        alert(err);
        console.log(err);
      }.bind(this)
    });
  }

  render() {
    return (
      <div className={s.root}>
        <p className={s.boldedText}>Cuéntanos sobre tu fixer</p>
        <p className={s.boldedText}>¡Ayúdanos a mejorar la experiencia de todos!</p>
        <p>1: malo, 2: necesita mejorar,</p>
        <p>3: bueno, 4: muy bueno, 5: excelente</p>
        <RadioGroup
          className={s.radioGroup}
          name="reviewFormRadio"
          selectedValue={this.state.selectedValue}
          onChange={this._handleChange.bind(this)}>
          <label className={s.radioButtonLabel}>
            <Radio className={s.radioButtonLabel} value={1} />  1
          </label>
          <label className={s.radioButtonLabel}>
            <Radio className={s.radioButtonLabel} value={2} />  2
          </label>
          <label className={s.radioButtonLabel}>
            <Radio className={s.radioButtonLabel} value={3} />  3
          </label>
          <label className={s.radioButtonLabel}>
            <Radio className={s.radioButtonLabel} value={4} />  4
          </label>
          <label className={s.radioButtonLabel}>
            <Radio className={s.radioButtonLabel} value={5} />  5
          </label>
        </RadioGroup>
        <FormControl 
          value={this.state.comment}
          type="text"
          componentClass="textarea"
          placeholder="Comentario" 
          onChange={this._updateProperty.bind(this)}
          className={s.submitButton}
        />
        <Button bsStyle="primary" className={s.submitButton} onClick={this._createReviewInDb.bind(this)}>
          <Glyphicon glyph="star" />
          Ingresar reseña
        </Button>
      </div>
    );
  }
}

export default withStyles(s)(ReviewForm);
