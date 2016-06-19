import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Button, FormGroup, ControlLabel, FormControl, Jumbotron } from 'react-bootstrap';
import Questionnaire from '../questionComponents/Questionnaire';
import s from './AdditionalQuestions.css';

export default class AdditionalQuestions extends Component {

  constructor(props) {
    super(props);
    let addQsAndAs;
    switch(this.props.category) {
      case 'gardening':
        addQsAndAs = [
                  { q: 'Explica tu proyecto', a: '', type: 'textarea'},
                  { q: '¿De qué tamaño es tu jardín?', a: 'Pequeño (menos de 100 m\u00B2)', type: 'select', opts: [ 'Pequeño (menos de 100 m\u00B2)' , 'Mediano (100 m\u00B2 - 450 m\u00B2)', 'Grande (450 m\u00B2 - 950 m\u00B2)', 'Muy grande (más de 950 m\u00B2)'] },
                  { q: '¿Tiene las herramientas para realizar el trabajo?', a: 'Sí', opts: ['Sí', 'No', 'No todas'] , type: 'select'},
                  { q: '¿Tienes las plantas, tierra y otros para realizar el trabajo?', a: 'Sí', opts: ['Sí', 'No, necesito que el fixer lo compre'] , type: 'select'}
                ]; 
        break;
      case 'carpentry':
        addQsAndAs = 'Carpintería';
        break;
      case 'painting':
        addQsAndAs = 'Aplicación de Pintura';
        break;
      case 'electricity':
        addQsAndAs = 'Electricista';
        break;
      case 'plumbing':
        addQsAndAs = 'Fontanería';
        break;
      default:
        addQsAndAs = null;
        break;
    }
    this.state = {
      qsAndAs: addQsAndAs
    };
  }

  _updateAnswers(answers, event){
    this.setState( { qsAndAs: answers } );
  }

  _updateFinalAnswers(answers) {
    this.props.saveAnswers(answers);
  }

  render() {

    return (
      <div className={classNames(s.formWrapper)}>
        <Questionnaire qsAndAs={this.state.qsAndAs} updateAnswers={this._updateAnswers.bind(this)} submitFinalAnswers={this._updateFinalAnswers.bind(this)}/>
      </div>
    );
  }
}

export default withStyles(s)(AdditionalQuestions);