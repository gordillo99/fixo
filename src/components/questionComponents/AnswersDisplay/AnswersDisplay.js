import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import s from './AnswersDisplay.css';

export default class AnswersDisplay extends Component {

  render() {

    return (
    	<Panel collapsible header='Información adicional'>
	        <ListGroup fill>
	        	{this.props.qsAndAs.map((qAndA, index) => {
	        		if (qAndA.a === null || qAndA.a === '') return; 
	        		let answer = null;
	        		if (qAndA.type === 'upload') {
	        			answer = <img height='80px' widt='80px' src={URL.createObjectURL(qAndA.a)} alt='image'/>
	        		} else {
	        			answer = <p>{qAndA.a}</p>
	        		}
	        		return (
					<ListGroupItem key={'lgi-' + index}>
						<h4>{qAndA.q}</h4>
						{answer}
					</ListGroupItem>
				)})}
	        </ListGroup>
	    </Panel>
    );
  }
}

export default withStyles(s)(AnswersDisplay);