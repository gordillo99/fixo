import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
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
          { q: 'Explica lo que necesitas', a: '', type: 'textarea'},
          { q: '¿De qué tamaño es tu jardín?', a: 'Pequeño (menos de 100 m\u00B2)', type: 'select', opts: [ 'Pequeño (menos de 100 m\u00B2)' , 'Mediano (100 m\u00B2 - 450 m\u00B2)', 'Grande (450 m\u00B2 - 950 m\u00B2)', 'Muy grande (más de 950 m\u00B2)'] },
          { q: '¿Tiene las herramientas para realizar el trabajo?', a: 'Sí', opts: ['Sí', 'No', 'No, necesito que el fixer las traiga', 'No, las compraré después'] , type: 'select'},
          { q: '¿Tienes las plantas, tierra y otros para realizar el trabajo?', a: 'Sí', opts: ['Sí', 'No', 'No, necesito que el fixer las traiga', 'No, las compraré después', 'No aplica'] , type: 'select'}
        ]; 
        break;
      case 'carpentry':
        addQsAndAs = [
          { q: 'Explica lo que necesitas', a: '', type: 'textarea'},
          { q: '¿Qué tipo de trabajo es?', a: 'Reparación', type: 'select', opts: ['Reparación', 'Instalación', 'Mejora']},
          { q: '¿En qué ambiente?', a: 'Comedor', type: 'select', opts: [ 'Comedor', 'Cocina', 'Sala', 'Dormitorios' ] },
          { q: '¿Tiene los materiales para el trabajo?', a: 'Sí', opts: ['Sí', 'No, necesito que el fixer traiga', 'No, compraré después', 'No aplica'] , type: 'select'},
          { q: '¿Tiene las herramientas para realizar el trabajo?', a: 'Sí', opts: ['Sí', 'No', 'No, necesito que el fixer las traiga', 'No, las compraré después'] , type: 'select'}
        ]; 
        break;
      case 'painting':
        addQsAndAs = [
          { q: 'Explica lo que necesitas', a: '', type: 'textarea'},
          { q: '¿Qué te gustaría que el fixer pintara?', a: '', type: 'select', opts: ['Paredes en interior', 'Techo', 'Puertas', 'Exterior', 'Otro']},
          { q: '¿Cuánto trabajo se requiere?', a: 'Un solo cuarto', type: 'select', opts: ['Un solo cuarto', 'Múltiples cuartos', 'No estoy seguro', 'No aplica']},
          { q: '¿Cuántos metros cuadrados le gustaría que pintara?', a: 'Menos de 50 m\u00B2', type: 'select', opts: [ 'Menos de 50 m\u00B2' , '51 m\u00B2 - 100 m\u00B2)', '101 m\u00B2 - 150 m\u00B2', '151 m\u00B2 - 200 m\u00B2', '201 m\u00B2 - 250 m\u00B2', '251 m\u00B2 - 300 m\u00B2', 'Más de 300 m\u00B2'] },
          { q: '¿Tiene la pintura necesaria?', a: 'Sí', opts: ['Sí', 'No, necesito que el fixer la traiga', 'No, compraré después'] , type: 'select'},
          { q: '¿Tienes escalera?', a: 'Sí', opts: ['Sí', 'No, necesito que el fixer traiga', 'No, compraré después', 'No aplica'] , type: 'select'}
        ]; 

        break;
      case 'electricity':
        addQsAndAs = [
          { q: 'Explica lo que necesitas', a: '', type: 'textarea'},
          { q: '¿Qué tipo de trabajo es?', a: 'Reparación', type: 'select', opts: ['Reparación', 'Instalación', 'Mejora']},
          { q: '¿En qué área?', a: 'Adentro de la casa', type: 'select', opts: [ 'Adentro de la casa', 'Afuera de la casa'] },
          { q: '¿Tiene los materiales para el trabajo?', a: 'Sí', opts: ['Sí', 'No, necesito que el fixer traiga', 'No, compraré después', 'No aplica'] , type: 'select'},
          { q: '¿Tiene las herramientas para realizar el trabajo?', a: 'Sí', opts: ['Sí', 'No', 'No, necesito que el fixer las traiga', 'No, las compraré después'] , type: 'select'}
        ];

        break;
      case 'plumbing':
        addQsAndAs = [
          { q: 'Explica lo que necesitas', a: '', type: 'textarea'},
          { q: '¿Es una nueva instalación o reparación de algo antiguo?', a: 'Reparación', type: 'select', opts: ['Reparación', 'Instalación', 'Mejora']},
          { q: '¿En qué área lo necesitas? (Cocina, baños, instalación general de la casa, etc.)', a: 'Cocina', type: 'select', opts: [ 'Cocina', 'Baños', 'Instalación general de la casa', 'Otra' ] },
          { q: '¿Tiene los materiales para el trabajo?', a: 'Sí', opts: ['Sí', 'No, necesito que el fixer traiga', 'No, compraré después', 'No aplica'] , type: 'select'},
          { q: '¿Tiene las herramientas para realizar el trabajo?', a: 'Sí', opts: ['Sí', 'No', 'No, necesito que el fixer las traiga', 'No, las compraré después'] , type: 'select'},
          //{ q: 'Selecciona una imagen (opcional)', a: '', type: 'upload'}
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
    if (answers[0].a.length === 0) {
      alert('Por favor ingresa una breve descripción de lo que necesitas.');
      return;
    }
    if (answers[0].a.length > 254) {
      alert('Por favor describe lo que necesitas en menos de 254 caracteres.');
      return;
    }
    this.props.saveAnswers(answers);
  }

  render() {
    return (
      <div className={cx(s.formWrapper)}>
        <h2 className={s.centralizedDiv}>Danos detalles sobre lo que necesitas</h2>
        <Questionnaire qsAndAs={this.state.qsAndAs} updateAnswers={this._updateAnswers.bind(this)} submitFinalAnswers={this._updateFinalAnswers.bind(this)}/>
      </div>
    );
  }
}

export default withStyles(s)(AdditionalQuestions);