import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Jumbotron } from 'react-bootstrap';
import $ from 'jquery';
import s from './FixerFinder.css';

export default class FixerFinder extends Component {

	constructor() {
		super();
		this.state = {
			data: {},
		}
	}

	componentWillMount() {
		$.ajax({
	      	url: '/api/users/',
	      	type: 'GET',
	      	dataType: 'json',
	      	cache: false,
	      	success: function(data) {
	      		this.setState( { data: data } );
	      	  	console.log(data);
	      	}.bind(this),
	      	error: function(xhr, status, err) {
	       		console.log(err);
	       		alert(err);
	      	}.bind(this)
	    });
	}

	render() {
		return (
			<div>
				<p>{this.state.data.name}</p>
			</div>
		);
	}
}

export default withStyles(s)(FixerFinder);