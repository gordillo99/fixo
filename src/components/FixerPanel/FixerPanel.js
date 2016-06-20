import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Panel } from 'react-bootstrap';
import arrBuffToBase64 from '../../helpers/helpers.js';
import s from './FixerPanel.css';

export default class FixerPanel extends Component {

	render() {
		return(						
			<Panel bsStyle='primary' header={this.props.fixer.firstname + ' ' + this.props.fixer.lastname} className={classNames(s.panelStyle, (this.props.fixer.selected && this.props.showSelected) ? s.selectedPanel : '')}>
			<ul className={classNames(s.noListStyle)}>
				<li className={classNames(s.inlineFixerEles)}>
			      <img 
			      	src={'data:image/png;base64,' + arrBuffToBase64(this.props.fixer.profilepic.data)}
			      	height='50px'
			      	weight='50px'
			      	className={classNames(s.fixerImage)}
			      />
			   	</li>
			    <li className={classNames(s.inlineFixerEles)}>
			      <p>{this.props.fixer.description}</p>
			    </li>
		      </ul>
		    </Panel>
		);
	}
}

export default withStyles(s)(FixerPanel);