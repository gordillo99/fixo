import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Jumbotron, Row, Col, Button } from 'react-bootstrap';
import tools2 from './images/tools2-background.jpg';
import tools1 from './images/tools-background.jpg';
import gardening from './images/gardening-background.jpg';
import s from './MainPageStripe1.css';
import $ from 'jquery';
import Link from '../Link';

export default class MainPageStripe1 extends Component {

  constructor() {
    super();
    this.state = {
      bgImage: tools2
    };
  }

  _createCategoryOptions() {
    let categories = [ 
      { id: 0, name: 'Jardinero', icon: require('./images/gardening.png'), route: 'gardening' }, 
      { id: 1, name: 'Carpintero', icon: require('./images/carpentry.png'), route: 'carpentry' }, 
      { id: 2, name: 'Pintor', icon: require('./images/painting.png'), route: 'painting' }, 
      { id: 3, name: 'Electricista', icon: require('./images/electricity.png'), route: 'electricity' }, 
      { id: 4, name: 'Fontanero' , icon: require('./images/plumbing.png'), route: 'plumbing' }
    ];

    return categories.map((category) => {
      return (
        <li key={'cat-' + category.id} className={classNames(s.inlineCategories)}>
          {this._createCatsWithIcons(category.id, category.name, category.icon, category.route)}
        </li>
      )
    });
  }

  _createCatsWithIcons(id, name, icon, route) {
    return (
      <div className={s.marginWrapper}>
        <div className={classNames(s.catContainer)}>
          <ul key={'catEle-' + id} className={classNames(s.noListStyle, s.listCatEle)}> 
            <li><img src={icon} height='110px' width='140px' /></li>
            <li><h3 className={s.catTitle}>{name}</h3></li> 
            <li><Button bsStyle={'primary'} href={'/setup/' + route} className={s.selectCatBtn}>Solicitar</Button></li>
          </ul>
        </div>
      </div>
    )
  }

  render() {
    let divStyle = {
      backgroundImage: `url(${this.state.bgImage}})`
    }

    return (
      <div className={s.root}>
        <div className={classNames(s.centralizedDiv)}>
          <Jumbotron style={divStyle} className={classNames(s.stripe1Jumbotron)}>
            <h1 className={classNames(s.welcomePageHeader)}>¿Qué necesitas?</h1>
            <Row className={s.row}>
              <Col md={8} xs={12} className={s.centerBlock}>
                <div className={s.catsWrapper}>
                  <ul className={classNames(s.noListStyle, s.outerUl)}>
                    {this._createCategoryOptions()}
                  </ul>
                </div>
              </Col>
            </Row>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(MainPageStripe1);