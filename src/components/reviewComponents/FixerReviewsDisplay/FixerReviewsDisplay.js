import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';
import ReviewDisplay from '../ReviewDisplay';
import $ from 'jquery';
import s from './FixerReviewsDisplay.css';

export default class FixerReviewsDisplay extends Component {

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

	render() {
		let seeMoreReviews = null;

		if (this.state.showAllReviews) {
			seeMoreReviews = <ReviewDisplay reviews={this.state.reviews} hideReviews={this._hideReviews.bind(this)} fixerId={this.props.fixerId}/>;
		} else if (this.props.numRatings > 1) {
			seeMoreReviews = <div className={classNames(s.centralizedDiv, s.paddingAbove)}>
									       <a onClick={this._getAllReviewsFromDb.bind(this)}>Ver más las reseñas</a>
								       </div>
		}

		return(
			<ListGroup>
		    <ListGroupItem bsStyle="info">Promedio de reseñas: <Glyphicon glyph="star" />{this.props.fixerRating}<br/> Número de reseñas: {this.props.numRatings}</ListGroupItem>
		    {seeMoreReviews}
		  </ListGroup>
		);
	}
}

export default withStyles(s)(FixerReviewsDisplay);