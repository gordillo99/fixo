import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Jumbotron } from 'react-bootstrap';
import s from './MainPageStripe3.css';

export default class MainPageStripe3 extends Component {

  _createReasons() {
    let reasons = [
      { id: 0, name: 'Es seguro', desc: 'Nuestros fixers son BRde confianza', icon: require('./images/lock.png')},
      { id: 1, name: 'Resuelve rápido', desc: 'Encuentra soluciones BRfácilmente', icon: require('./images/bulb.png') },
      { id: 2, name: 'Es gratis', desc: 'Encuentra a tu fixerBRsin ningún costo', icon: require('./images/service.png') }
    ];
    let index = 0;

    return reasons.map((reason, index) => {
      return <li className={classNames(s.inlineReasons)} key={'reason-' + reason.id}> {this._createReasonEles(reason.id, reason.name, reason.desc, reason.icon, index++, reasons.length)} </li>
    });
  }

  _createReasonEles(id, name, desc, icon, index, len) {
    let descArr = desc.split('BR');

    return (
      <ul key={id} className={classNames(s.noListStyle)}>
        <li><div className={s.circleBase}><img src={icon} className={s.circleIcon} height='60px' width='60px'/></div></li>
        <li><h3 className={s.reasonTitle}>{name}</h3></li>  
        <li className={classNames(s.reasonDesc)}><p>{descArr[0]}<br/>{descArr[1]}</p></li>
      </ul>
    );
  }

  render() {

    return (
      <Jumbotron className={classNames(s.stripe3Jumbotron)}>
        <h1 className={classNames(s.welcomePageHeader)}>¿Por qué fixo?</h1>
        {this._createReasons()}
      </Jumbotron>
    );
  }
}

export default withStyles(s)(MainPageStripe3);