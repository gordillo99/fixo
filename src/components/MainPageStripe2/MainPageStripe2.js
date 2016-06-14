import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Jumbotron } from 'react-bootstrap';
import s from './MainPageStripe2.css';

export default class MainPageStripe2 extends Component {
  
  _createSteps() {
    let steps = [ 
      { id: 0, name: 'Ingresa tu problema', desc: 'Encuentra tu categoría yBR describe tu problema', icon: require('./images/pencil.png') } , 
      { id: 1, name: 'Encuentra un fixer', desc: 'Te encontramos al BRfixer que necesitas', icon: require('./images/magglass.png') }, 
      { id: 2, name: 'Realiza tu trabajo', desc: 'El fixer resuelva BRtu problema', icon: require('./images/check.png') }
    ];
    let index = 0;

    return steps.map((step, index) => {
      return <li className={classNames(s.inlineSteps)} key={'step-' + step.id}> {this._createStepEles(step.id, step.name, step.desc, step.icon, index, steps.length)} </li>
    });
  }

  _createStepEles(id, name, desc, icon, index, len) {
    let descArr = desc.split('BR');

    return (
      <ul className={classNames(s.listElement)}>
        <li className={classNames(s.inlineSteps, s.nameWithIcon)}>
          <ul key={id} className={classNames(s.noListStyle)}>
            <li><img src={icon} height='40px' width='40px'/></li>
            <li><h3>{name}</h3></li>  
            <li className={classNames(s.stepDesc)}><p >{descArr[0]}<br/>{descArr[1]}</p></li>
          </ul>
        </li>
        <li className={classNames(s.inlineSteps)}>
          <div>
            {(index !== len - 1) ? <img className={classNames(s.mainPageArrows)} src={require('./images/arrow.png')}/> : null}
          </div>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <Jumbotron className={classNames(s.stripe2Jumbotron)}>
        <h1 className={classNames(s.welcomePageHeader)}>¡Así de Fácil!</h1>
        <ul>
          {this._createSteps()}
        </ul>
      </Jumbotron>
    );
  }
}

export default withStyles(s)(MainPageStripe2);