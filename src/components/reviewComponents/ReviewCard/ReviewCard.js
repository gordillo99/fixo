import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { ListGroupItem } from 'react-bootstrap';
import $ from 'jquery';
import s from './ReviewCard.css';

export default class ReviewCard extends Component {

	render() {

		return(
			<div>
				<ListGroupItem>
					Nombre: {this.props.review.firstname} {this.props.review.lastname}<br/>
					Puntuación: {this.props.review.rating}/5<br/>
					Comentario: {this.props.review.comment}
				</ListGroupItem>
			</div>
		);
	}
}

export default withStyles(s)(ReviewCard);