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
        addQsAndAs = [
                  { q: '¿Qué tipo de trabajo es?', a: 'Reparación', type: 'select', opts: ['Reparación', 'Instalación', 'Mejora']},
                  { q: '¿En qué ambiente?', a: 'Comedor', type: 'select', opts: [ 'Comedor', 'Cocina', 'Sala', 'Dormitorios' ] },
                  { q: '¿Tiene los materiales para el proyecto?', a: 'Sí', opts: ['Sí', 'No, necesito que el fixer lo compre'] , type: 'select'},
                  { q: '¿Tiene las herramientas necesarias para el proyecto?', a: 'Sí', opts: ['Sí', 'No, necesito que el fixer traiga'] , type: 'select'},
                  { q: 'Selecciona una imagen (opcional)', a: '', type: 'upload'}
                ]; 
        break;
      case 'painting':
        addQsAndAs = [
                  { q: '¿Qué le gustaría que pintara?', a: '', type: 'select', opts: ['Paredes en interior', 'Techo', 'Puertas', 'Exterior']},
                  { q: '¿Cuánto trabajo se requiere?', a: 'Un solo cuarto o proyecto', type: 'select', opts: ['Un solo cuarto o proyecto', 'Múltiples cuartos o proyectos', 'No estoy seguro']},
                  { q: '¿Cuántos metros cuadrados le gustaría que pintara?', a: 'Menos de 50 m\u00B2', type: 'select', opts: [ 'Menos de 50 m\u00B2' , '51 m\u00B2 - 100 m\u00B2)', '101 m\u00B2 - 150 m\u00B2', '151 m\u00B2 - 200 m\u00B2', '201 m\u00B2 - 250 m\u00B2', '251 m\u00B2 - 300 m\u00B2', 'Más de 300 m\u00B2'] },
                  { q: '¿Tiene los materiales para el proyecto?', a: 'Sí', opts: ['Sí', 'No, necesito que el fixer lo compre'] , type: 'select'},
                  { q: '¿Tiene las herramientas necesarias para el proyecto?', a: 'Sí', opts: ['Sí', 'No, necesito que el fixer traiga'] , type: 'select'}
                ]; 
        //TODO: add picture upload
        break;
      case 'electricity':
        addQsAndAs = [
                  { q: 'Describe el trabajo', a: '', type: 'textarea'},
                  { q: '¿Cuál es tu problema?', a: 'Reparación', type: 'select', opts: ['Reparación', 'Instalación', 'Mejora']},
                  { q: '¿En qué área es tu problema?', a: 'Adentro de la casa', type: 'select', opts: [ 'Adentro de la casa', 'Afuera de la casa'] },
                  { q: '¿Tiene los materiales para el proyecto?', a: 'Sí', opts: ['Sí', 'No, necesito que el fixer lo compre'] , type: 'select'},
                  { q: '¿Tiene las herramientas necesarias para el proyecto?', a: 'Sí', opts: ['Sí', 'No, necesito que el fixer traiga'] , type: 'select'}
                ];
        //TODO: add picture upload
        break;
      case 'plumbing':
        addQsAndAs = [
                  { q: 'Describe el trabajo', a: '', type: 'textarea'},
                  { q: '¿Cuál es tu problema?', a: 'Reparación', type: 'select', opts: ['Reparación', 'Instalación', 'Mejora']},
                  { q: '¿En qué área de la casa es tu problema?', a: 'Cocina', type: 'select', opts: [ 'Cocina', 'Baños', 'Instalación general de la casa', 'Otra' ] },
                  { q: '¿Tiene los materiales para el proyecto?', a: 'Sí', opts: ['Sí', 'No, necesito que el fixer lo compre'] , type: 'select'}
                ];
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
    this.setState({ qsAndAs: answers });
  }

  _updateFinalAnswers(answers) {
    this.props.saveAnswers(answers);
  }

  render() {

    return (
      <div className={classNames(s.formWrapper)}>
        <h2 className={s.centralizedDiv}>Describe tu problema</h2>
        <Questionnaire qsAndAs={this.state.qsAndAs} updateAnswers={this._updateAnswers.bind(this)} submitFinalAnswers={this._updateFinalAnswers.bind(this)}/>
      </div>
    );
  }
}

export default withStyles(s)(AdditionalQuestions);