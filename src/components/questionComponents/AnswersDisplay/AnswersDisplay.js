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
	        	{this.props.qsAndAs.map((qAndA, index) => { return (
					<ListGroupItem key={'lgi-' + index}>
						<h4>{qAndA.q}</h4>
						<p>{qAndA.a}</p>
					</ListGroupItem>
				)})};
	        </ListGroup>
	    </Panel>
    );
  }
}

export default withStyles(s)(AnswersDisplay);