import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Jumbotron, Row, Col, Button } from 'react-bootstrap';
import tools1 from './images/fotofondo6.jpg';
import s from './MainPageStripe1.style';
import $ from 'jquery';
import Link from '../Link';

export class MainPageStripe1 extends Component {

  constructor() {
    super();
    this.state = {
      stage: 0,
      bgImages: [tools1]
    };
  }

  componentDidMount() {
    this._startChangingBackground();
  }

  componentWillUnmount() {
    this.loadInterval && clearInterval(this.loadInterval);
  }

  _startChangingBackground() {
    this.loadInterval = setInterval(() => {
      this._changeBackground();
    }, 6000);
  }

  _changeBackground() {
    let nextStage = this.state.stage;
    nextStage = 0;
    this.setState({ stage: nextStage });
  }

  _createCategoryOptions() {
    let categories = [ 
      { id: 0, name: 'Jardinero', icon: require('./images/gardening.jpg'), route: 'gardening' }, 
      { id: 1, name: 'Carpintero', icon: require('./images/carpentry.jpg'), route: 'carpentry' }, 
      { id: 2, name: 'Pintor', icon: require('./images/painting.jpg'), route: 'painting' }, 
      { id: 3, name: 'Electricista', icon: require('./images/electricity.jpg'), route: 'electricity' }, 
      { id: 4, name: 'Plomero' , icon: require('./images/plumbing.jpg'), route: 'plumbing' }
    ];

    return categories.map((category) => {
      return (
        <li key={'cat-' + category.id} className={cx(s.inlineCategories)}>
          {this._createCatsWithIcons(category.id, category.name, category.icon, category.route)}
        </li>
      )
    });
  }

  _createCatsWithIcons(id, name, icon, route) {
    return (
      <div className={s.marginWrapper}>
        <div className={s.borderDiv}>
        <div className={cx(s.catContainer)}>
          <ul key={'catEle-' + id} className={cx(s.noListStyle, s.listCatEle)}> 
            <li><img className={s.catImage} src={icon} /></li>
            <li><h3 className={s.catTitle}>{name}</h3></li> 
            <li><Button bsStyle={'primary'} href={'/setup/' + route} className={s.selectCatBtn}>Ver fixers</Button></li>
          </ul>
        </div>
        </div>
      </div>
    )
  }

  render() {
    //const divStyle = null;
    let divStyle = {
      backgroundImage: `url(${this.state.bgImages[this.state.stage]})`,
      backgroundPosition: `2350px 1000px`
    }

    return (
      <div className={s.root}>
        <div className={cx(s.centralizedDiv)}>
          <Jumbotron style={divStyle} className={cx(s.stripe1Jumbotron)}>
            <h1 className={cx(s.welcomePageHeader)}>¿Qué necesitas?</h1>
            <Row className={s.row}>
              <Col md={8} xs={12} className={s.centerBlock}>
                <div className={s.catsWrapper}>
                  <ul className={cx(s.noListStyle, s.outerUl)}>
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