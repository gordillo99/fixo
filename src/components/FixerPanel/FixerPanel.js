import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Panel } from 'react-bootstrap';
import { arrBuffToBase64 } from '../../helpers/helpers.js';
import FixerReviewsDisplay from '../reviewComponents/FixerReviewsDisplay';
import s from './FixerPanel.css';

export default class FixerPanel extends Component {

	render() {
		let showImage = null;
		if (this.props.fixer.profilepic) {
			showImage = <img 
							      	src={'data:image/png;base64,' + arrBuffToBase64(this.props.fixer.profilepic.data)}
							      	height='50px'
							      	weight='50px'
							      	className={classNames(s.fixerImage)}
							      />;
		}

		return(						
			<Panel bsStyle='primary' header={this.props.fixer.firstname + ' ' + this.props.fixer.lastname} className={classNames(s.panelStyle, (this.props.fixer.selected && this.props.showSelected) ? s.selectedPanel : '')}>
			<ul className={classNames(s.noListStyle)}>
				<li className={classNames(s.inlineFixerEles)}>
			    {showImage}
		   	</li>
		    <li className={classNames(s.inlineFixerEles)}>
		      <p>{this.props.fixer.description}</p>
		    </li>
	  	</ul>
		  	<FixerReviewsDisplay 
		  		showMoreReviews={this.props.showReviews}
		  		fixerRating={this.props.fixer.avg_rating}
		  		numRatings={this.props.fixer.num_ratings}
		  		fixerId={this.props.fixer.id}
		  	/>
		  </Panel>
		);
	}
}

export default withStyles(s)(FixerPanel);