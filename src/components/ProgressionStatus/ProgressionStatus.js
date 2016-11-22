import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Jumbotron, Row, Col, Nav, NavItem } from 'react-bootstrap';
import s from './ProgressionStatus.style';

export default class ProgressionStatus extends Component {

  _showProgressInTabs() {
    let stages = [ 
      { id: 0, name: 'Dinos qué necesitas' },
      { id: 1, name: 'Encuentra a tu fixer' },
      { id: 2, name: 'Ingresa tus datos' }, 
      { id: 3, name: 'Confirma' }
    ];

    return stages.map((stage, index) => {
      let tab = null;
      let tabStr = `${index + 1}. ${stage.name}`;

      if ((stage.id === this.props.currentStage)) {
        tab = <NavItem key={'stage-' + stage.id} eventKey={index}>{tabStr}</NavItem>
      } else {
        tab = <NavItem key={'stage-' + stage.id} eventKey={index} disabled>{tabStr}</NavItem>
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
        <div className={cx(s.centralizedDiv)}>
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