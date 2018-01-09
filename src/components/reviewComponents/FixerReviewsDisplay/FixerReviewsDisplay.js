import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';
import ReviewDisplay from '../ReviewDisplay';
import StarDisplayer from '../StarDisplayer';
import $ from 'jquery';
import s from './FixerReviewsDisplay.style';

export class FixerReviewsDisplay extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showAllReviews: false,
			reviews: []
		};
	}

	_getAllReviewsFromDb() {
		if (this.state.reviews.length === 0) {
			$.ajax({
	    	url: `/api/reviews/crud/fixer/${this.props.fixerId}`,
	    	type: 'GET',
	    	dataType: 'json',
	    	cache: false,
	    	success: function(data) {
	    		this.setState({ reviews: data, showAllReviews: true });
	    	}.bind(this),
	    	error: function(xhr, status, err) {
	     		console.log(err);
	    	}.bind(this)
	    });
		} else {
			this.setState({ showAllReviews: true });
		}
	}

	_hideReviews() {
		this.setState({ showAllReviews: false });
	}

	_handleReviewsDisplay() {
		if (this.state.showAllReviews) {
			return <ReviewDisplay reviews={this.state.reviews} hideReviews={this._hideReviews.bind(this)} fixerId={this.props.fixerId}/>;
		} else if (this.props.numRatings > 1) {
			if (this.props.showMoreReviews) {
				return <div className={cx(s.leftAligned, s.paddingAbove)}>
					       <a onClick={this._getAllReviewsFromDb.bind(this)}>Ver reseñas</a>
				       </div>
			}
		}
		return null;
	}

	render() {
		let seeMoreReviews = null;
		return(
			<div>
				<ul className={s.noListStyle}>
					<li className={s.inlineEles}><StarDisplayer starAmount={this.props.fixerRating}/></li>
				</ul>
				<p className={s.leftAligned}> {this.props.numRatings} {(this.props.numRatings > 1 ? "reseñas" : "reseña")}</p>
				{this._handleReviewsDisplay()}
			</div>
		);
	}
}

export default withStyles(s)(FixerReviewsDisplay);