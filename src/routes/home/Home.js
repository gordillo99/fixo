/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import classNames from 'classnames';
import { Jumbotron } from 'react-bootstrap';

export default class Home extends Component {
  _createCategoryOptions() {
    let categories = [ 
      { id: 0, name: 'Jardinería', icon: require('./images/gardening.png') }, 
      { id: 1, name: 'Carpintería', icon: require('./images/carpentry.png') }, 
      { id: 2, name: 'Aplicación de Pintura', icon: require('./images/painting.png') }, 
      { id: 3, name: 'Electricista', icon: require('./images/electricity.png') }, 
      { id: 4, name: 'Fontanería' , icon: require('./images/plumbing.png') }
    ];

    return categories.map((category) => {
      return (
        <li key={'cat-' + category.id} className={classNames(s.inlineCategories)}>
          <h3>{this._createCatsWithIcons(category.id, category.name, category.icon)}</h3>
        </li>
      )
    });
  }

  _createCatsWithIcons(id, name, icon) {
    return (
      <ul key={'catEle-' + id} className={classNames(s.noListStyle)}> 
        <li><img src={icon} height='40px' width='40px' /></li>
        <li><h3>{name}</h3></li> 
      </ul>
    )
  }

  _createSteps() {
    let steps = [ 
      { id: 0, name: 'Ingresa tu problema', icon: require('./images/pencil.png') } , 
      { id: 1, name: 'Encuentra un fixer', icon: require('./images/magglass.png') }, 
      { id: 2, name: 'Realiza tu trabajo', icon: require('./images/check.png') }
    ];
    let index = 0;

    return steps.map((step, index) => {
      return <li className={classNames(s.inlineSteps)} key={'step-' + step.id}> {this._createStepEles(step.id, step.name, step.desc, step.icon, index++, steps.length)} </li>
    });
  }

  _createStepEles(id, name, desc, icon, index, len) {
    return (
      <ul className={classNames(s.listElement)}>
        <li className={classNames(s.inlineSteps, s.nameWithIcon)}>
          <ul key={id} className={classNames(s.noListStyle)}>
            <li><img src={icon} height='40px' width='40px'/></li>
            <li><h3>{name}</h3></li>  
            <li><p>{desc}</p></li>
          </ul>
        </li>
        <li className={classNames(s.inlineSteps)}>
          <div>
            {(index !== len - 1) ? <img src={require('./images/arrow.png')}/> : null}
          </div>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div className={s.root}>
        <div className={classNames(s.centralizedDiv)}>
          <Jumbotron className={classNames(s.stripe1Jumbotron)}>
            <h1 className={classNames(s.welcomePageHeader)}>¿Qué Necesitas?</h1>
            <ul>
              {this._createCategoryOptions()}
            </ul>
          </Jumbotron>
          <Jumbotron className={classNames(s.stripe2Jumbotron)}>
            <h1 className={classNames(s.welcomePageHeader)}>¡Así de Fácil!</h1>
            <ul>
              {this._createSteps()}
            </ul>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);