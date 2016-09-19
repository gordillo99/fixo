import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { ListGroupItem } from 'react-bootstrap';
import StarDisplayer from '../StarDisplayer';
import $ from 'jquery';
import s from './ReviewCard.css';

export default class ReviewCard extends Component {

	render() {

		return(
			<div className={s.leftAligned}>
				<ListGroupItem>
					<p className={s.noBottomMargin}>Nombre: {this.props.review.firstname} {this.props.review.lastname[0] + '.'}<br/></p>
					<ul className={s.noListStyle}>
						<li className={s.inlineEles}><p className={s.noBottomMargin}>Puntuación:</p></li>
						<li className={s.inlineEles}><StarDisplayer starAmount={this.props.review.rating}/></li>
					</ul>
					<p className={s.noBottomMargin}>Comentario: {this.props.review.comment}</p>
				</ListGroupItem>
			</div>
		);
	}
}

export default withStyles(s)(ReviewCard);