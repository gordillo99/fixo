import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Jumbotron } from 'react-bootstrap';
import s from './ProgressionStatus.css';

export default class ProgressionStatus extends Component {

  _showProgressDisplay() {
    let stages = [ 
      { id: 0, name: 'Describe tu BRproblema' } , 
      { id: 1, name: 'Encuentra a BRtu fixer' }, 
      { id: 2, name: 'Confirma' }
    ];
    let index = 0;
    

    return stages.map((stage, index) => {
      return (
        <li className={classNames(s.inlineStages, (index !== stages.length - 1 ? s.rightBorder : ''))} key={'stage-' + stage.id}>
          <h3 className={classNames(s.withRightPadding, (index === this.props.currentStage ? s.bolded : ''))}>
            {this._getStageNames(stage.name, index)}
          </h3> 
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
          <ul>
            {this._showProgressDisplay()}
          </ul>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProgressionStatus);