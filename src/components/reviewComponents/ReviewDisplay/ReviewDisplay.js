import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Jumbotron, Button, Panel } from 'react-bootstrap';
import ReviewCard from '../ReviewCard';
import $ from 'jquery';
import s from './ReviewDisplay.css';

export default class ReviewDisplay extends Component {

	constructor() {
		super();
		this.state ={
			showAllReviews: false
		};
	}

	render() {

		let reviewCards = this.props.reviews.map((review, index) => {
			return <ReviewCard
						key={`reviewCard-${index}`}
						review={review}
					/>
		});

		return(
			<div>
				{reviewCards}
				<div className={cx(s.leftAligned, s.paddingAbove)}>  
				  <a onClick={this.props.hideReviews}>Ocultar reseñas</a>
				</div>
			</div>
		);
	}
}

export default withStyles(s)(ReviewDisplay);