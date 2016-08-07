import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Jumbotron, Row, Col } from 'react-bootstrap';
import $ from 'jquery';
import s from './MainPageStripe2.css';

export default class MainPageStripe2 extends Component {

  constructor() {
    super();
    this.state = {
      stage: 1,
      tile0: false,
      tile1: true,
      tile2: true
    };
  }

  componentDidMount() {
    this._flipTiles();
    this._startFlipping();
  }

  _startFlipping() {
    setInterval(() => {
      this._flipTiles();
    }, 4000);
  }

  _flipTiles() {
    let tile0 = false;
    let tile1 = false;
    let tile2 = false;
    let stage = this.state.stage;

    switch(stage) {
      case 0:
        tile0 = false;
        tile1 = tile2 = true;
        stage++;
        break;
      case 1:
        tile1 = false;
        tile0 = tile2 = true;
        stage++;
        break;
      case 2:
        tile2 = false;
        tile0 = tile1 = true;
        stage = 0;
        break;
      default:
        break;
    }
    this.setState({ stage: stage, tile0: tile0, tile1: tile1, tile2: tile2 });
  }
  
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
    let flipStyle1 = null;
    let flipStyle2 = null;
    let content = null;

    if (this.state[`tile${id}`]) {
      flipStyle1 = s.flipSide2;
      flipStyle2 = s.flipSide1;
    }

    return (
      <ul className={classNames(s.listElement)}>
        <li className={classNames(s.inlineSteps, s.nameWithIcon)}>
          <div id={`front-tile-${id}`} className={classNames(s.flip, s.side1, flipStyle1)}>
            <div className={s.listEleWrapper}>
              <ul key={id} className={classNames(s.noListStyle)}>
              
                <li><img src={icon} height='40px' width='40px'/></li>
                <li><h3>{name}</h3></li>  
                <li className={classNames(s.stepDesc)}><p >{descArr[0]}<br/>{descArr[1]}</p></li>
              
              </ul>
            </div>
          </div>
          <div id={`back-tile-${id}`} className={classNames(s.backTile, s.relativePosition, s.flip, s.side2, flipStyle2)}>
            <h1 className={s.backTileNumber}>{Number(id) + 1}</h1>
          </div>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <Jumbotron className={classNames(s.stripe2Jumbotron)}>
        <h1 className={classNames(s.header)}>¡Así de fácil!</h1>
        <Row className={s.row}>
          <Col md={12} xs={12} className={s.centerBlock}>
              {this._createSteps()}
          </Col>
        </Row>
      </Jumbotron>
    );
  }
}

export default withStyles(s)(MainPageStripe2);