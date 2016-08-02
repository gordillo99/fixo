import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Jumbotron, Row, Col } from 'react-bootstrap';
import s from './ProgressionStatus.css';

export default class ProgressionStatus extends Component {

  _showProgressDisplay() {
    let stages = [ 
      { id: 0, name: 'Describe tu BRproblema' },
      { id: 2, name: 'Encuentra BRa tu fixer' }, 
      { id: 3, name: 'Confirma' }
    ];
    let index = 0;

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

  render() {
    return (
      <div className={s.root}>
        <div className={classNames(s.centralizedDiv)}>
          <Row className={s.row}>
            <Col md={8} xs={10} className={s.centerBlock}>
              <div className={s.centeringDiv}>
                <ul className={classNames(s.listStyle)}>
                  {this._showProgressDisplay()}
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProgressionStatus);