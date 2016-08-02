import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Jumbotron } from 'react-bootstrap';
import s from './MainPageStripe1.css';
import Link from '../Link';

export default class MainPageStripe1 extends Component {
  _createCategoryOptions() {
    let categories = [ 
      { id: 0, name: 'Jardinería', icon: require('./images/gardening.png'), route: 'gardening' }, 
      { id: 1, name: 'Carpintería', icon: require('./images/carpentry.png'), route: 'carpentry' }, 
      { id: 2, name: 'Aplicación de pintura', icon: require('./images/painting.png'), route: 'painting' }, 
      { id: 3, name: 'Electricista', icon: require('./images/electricity.png'), route: 'electricity' }, 
      { id: 4, name: 'Fontanería' , icon: require('./images/plumbing.png'), route: 'plumbing' }
    ];

    return categories.map((category) => {
      return (
        <li key={'cat-' + category.id} className={classNames(s.inlineCategories)}>
          <h3>{this._createCatsWithIcons(category.id, category.name, category.icon, category.route)}</h3>
        </li>
      )
    });
  }

  _createCatsWithIcons(id, name, icon, route) {
    return (
      <a href={'/setup/' + route} className={classNames(s.whiteFont)}>
        <ul key={'catEle-' + id} className={classNames(s.noListStyle)}> 
          <li><img src={icon} height='40px' width='40px' /></li>
          <li><h3>{name}</h3></li> 
        </ul>
      </a>
    )
  }

  render() {
    return (
      <div className={s.root}>
        <div className={classNames(s.centralizedDiv)}>
          <Jumbotron className={classNames(s.stripe1Jumbotron)}>
            <h1 className={classNames(s.welcomePageHeader)}>¿Qué necesitas?</h1>
            <ul className={classNames(s.noListStyle)}>
              {this._createCategoryOptions()}
            </ul>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(MainPageStripe1);