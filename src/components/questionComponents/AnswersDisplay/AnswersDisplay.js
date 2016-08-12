import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { arrBuffToBase64 } from '../../../helpers/helpers.js';
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
	        		let image = null;
	        		if (qAndA.type === 'upload') {
	        			if (this.props.rawImages) {
		        			image = 'data:image/png;base64,' + arrBuffToBase64(qAndA.a.data);
		        		} else {
		        			image = URL.createObjectURL(qAndA.a);
		        		}
	        			answer = <img height='80px' widt='80px' src={image} alt='image'/>
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