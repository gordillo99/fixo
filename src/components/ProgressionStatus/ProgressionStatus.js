import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Jumbotron, Row, Col, Nav, NavItem } from 'react-bootstrap';
import s from './ProgressionStatus.style';

export default class ProgressionStatus extends Component {

  _showProgressDisplay() {
    let stages = [ 
      { id: 0, name: 'Describe tu BRproblema' },
      { id: 2, name: 'Encuentra BRa tu fixer' }, 
      { id: 3, name: 'Confirma' }
    ];

    return stages.map((stage, index) => {
      let bolded = '';
      
      if ((stage.id === this.props.currentStage) || (this.props.currentStage === 1 && stage.id === 0)) {
        bolded = s.bolded;
      }
    
      return (
        <li className={classNames(s.inlineStages)} key={'stage-' + stage.id}>
          <h4 className={classNames(s.withRightPadding, bolded)}>
            {this._getStageNames(stage.name, index)}
          </h4> 
        </li>
      );
    });
  }

  _getStageNames(name, index) {
    let nameArr = name.split('BR');
    let finalName = (index + 1).toString() + '. ';
    if (nameArr.length > 1) return (<div> {finalName + nameArr[0]} <br/> {nameArr[1]} </div>); 
    return <div>{finalName + name}</div>;
  }

  _showProgressInTabs() {
    let stages = [ 
      { id: 0, name: 'Describe tu problema' },
      { id: 1, name: 'Ingresa tus datos' },
      { id: 2, name: 'Encuentra a tu fixer' }, 
      { id: 3, name: 'Confirma' }
    ];

    return stages.map((stage, index) => {
      let tab = null;
      let tabStr = `${index + 1}.) ${stage.name}`;

      if ((stage.id === this.props.currentStage)) {
        tab = <NavItem eventKey={index}>{tabStr}</NavItem>
      } else {
        tab = <NavItem eventKey={index} disabled>{tabStr}</NavItem>
      }
    
      return (tab);
    });
  }

  render() {
    let activeKey = 0;

    switch(this.props.currentStage) {
      case 0:
        activeKey = 0;
        break;
      case 1:
        activeKey = 1;
        break;
      case 2:
        activeKey = 2;
        break;
      case 3:
        activeKey = 3;
        break;
    }

    return (
      <div className={s.root}>
        <div className={classNames(s.centralizedDiv)}>
          <Row className={s.row}>
            <Col md={8} xs={10} className={s.centerBlock}>
              <div className={s.centeringDiv}>
                <Nav bsStyle="tabs" justified activeKey={activeKey}>
                  {this._showProgressInTabs()}
                </Nav>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProgressionStatus);