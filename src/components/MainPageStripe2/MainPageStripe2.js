import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Jumbotron, Row, Col } from 'react-bootstrap';
import $ from 'jquery';
import s from './MainPageStripe2.css';

export class MainPageStripe2 extends Component {

  constructor() {
    super();
    this.state = {
      stage: 1,
      tile0: true,
      tile1: true,
      tile2: true
    };
  }

  componentDidMount() {
    //this._flipTiles();
    //this._startFlipping();
  }

  componentWillUnmount() {
    //this.loadInterval && clearInterval(this.loadInterval);
  }

  /*_startFlipping() {
    this.loadInterval = setInterval(() => {
      this._flipTiles();
    }, 4000);
  }*/

  /*_flipTiles() {
    let tile0 = true;
    let tile1 = true;
    let tile2 = true;
    let stage = this.state.stage;

    switch(stage) {
      case 0:
        tile0 = tile1 = tile2 = true;
        stage++;
        break;
      case 1:
        tile0 = false;
        tile1 = tile2 = true;
        stage++;
        break;
      case 2:
        tile2 = true;
        tile0 = tile1 = false;
        stage++;
        break;
      case 3:
      default:
        tile0 = tile1 = tile2 = false;
        stage = 0;
        break;
    }
    this.setState({ stage: stage, tile0: tile0, tile1: tile1, tile2: tile2 });
  }*/
  
  _createSteps() {
    let steps = [ 
      { id: 0, name: '1. Dinos qué necesitas', desc: 'Selecciona una categoría BRy describe lo que necesitas', icon: require('./images/pencil.png') } , 
      { id: 1, name: '2. Encuentra un fixer', desc: 'Listamos fixers para que BRescojas al que prefieras', icon: require('./images/magglass.png') }, 
      { id: 2, name: '3. Realiza tu trabajo', desc: 'El fixer llega, completa el BRtrabajo y le pagas directamente', icon: require('./images/check.png') }
    ];
    let index = 0;

    return steps.map((step, index) => {
      return <li className={cx(s.inlineSteps)} key={'step-' + step.id}> {this._createStepEles(step.id, step.name, step.desc, step.icon, index, steps.length)} </li>
    });
  }

  _createStepEles(id, name, desc, icon, index, len) {
    let descArr = desc.split('BR');
    let flipStyle1 = null;
    let flipStyle2 = null;

    if (this.state[`tile${id}`]) {
      flipStyle1 = s.flipSide1;
      flipStyle2 = s.flipSide2;
    }

    return (
      <ul className={cx(s.listElement)}>
        <li className={cx(s.inlineSteps, s.nameWithIcon)}>
          <div id={`front-tile-${id}`} className={cx(s.flip, s.side1, flipStyle1)}>
            <div className={s.listEleWrapper}>
              <ul key={id} className={cx(s.noListStyle)}>
              
                <li><img src={icon} height='40px' width='40px'/></li>
                <li><h3>{name}</h3></li>  
                <li className={cx(s.stepDesc)}><p >{descArr[0]}<br/>{descArr[1]}</p></li>
              
              </ul>
            </div>
          </div>
          <div id={`back-tile-${id}`} className={cx(s.backTile, s.relativePosition, s.flip, s.side2, flipStyle2)}>
            <h1 className={s.backTileNumber}>{`Paso ${(Number(id) + 1)}`}</h1>
          </div>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <Jumbotron className={cx(s.stripe2Jumbotron)}>
        <h1 className={cx(s.header)}>Así funciona fixo</h1>
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