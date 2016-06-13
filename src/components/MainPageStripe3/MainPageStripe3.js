import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Jumbotron } from 'react-bootstrap';
import s from './MainPageStripe3.css';

export default class MainPageStripe3 extends Component {

  _createReasons() {
    let reasons = [ 
      { id: 0, name: 'Resuelve rápido', desc: 'Encuentra soluciones BRfácilmente', icon: require('./images/bulb.png') } , 
      { id: 1, name: 'Seguridad y confianza', desc: 'Seguridad y BRconfianza', icon: require('./images/lock.png') }, 
      { id: 2, name: 'Garantía de servicio', desc: 'Garantía de BRservicio', icon: require('./images/service.png') }
    ];
    let index = 0;

    return reasons.map((reason, index) => {
      return <li className={classNames(s.inlineReasons)} key={'reason-' + reason.id}> {this._createReasonEles(reason.id, reason.name, reason.desc, reason.icon, index++, reasons.length)} </li>
    });
  }

  _createReasonEles(id, name, desc, icon, index, len) {
    let descArr = desc.split('BR');

    return (
      <ul className={classNames(s.listElement)}>
        <li className={classNames(s.inlineReasons, s.nameWithIcon)}>
          <ul key={id} className={classNames(s.noListStyle)}>
            <li><img src={icon} height='40px' width='40px'/></li>
            <li><h3>{name}</h3></li>  
            <li className={classNames(s.reasonDesc)}><p >{descArr[0]}<br/>{descArr[1]}</p></li>
          </ul>
        </li>
      </ul>
    );
  }

  render() {

    return (
      <Jumbotron className={classNames(s.stripe3Jumbotron)}>
        <h1 className={classNames(s.welcomePageHeader)}>¿Por qué fixo?</h1>
        <ul>
          {this._createReasons()}
        </ul>
      </Jumbotron>
    );
  }
}

export default withStyles(s)(MainPageStripe3);