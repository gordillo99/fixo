import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { arrBuffToBase64 } from '../../../helpers/helpers.js';
import ProposalEdit form '../ProposalEdit';
import $ from 'jquery';
import s from './AdminProposal.css';

export default class AdminProposal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			proposals: [],
			addQuestionsTxt: [],
			addQuestionsImage: []
		};
	}

	componentDidMount() {
		$.ajax({
    	url: '/api/proposals/crud/',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(data) {
    		this.setState( { proposals: data } );
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });

	  $.ajax({
    	url: '/api/proposals/crud/addQuestionsTxt',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(data) {
    		this.setState( { addQuestionsTxt: data } );
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });

	  $.ajax({
    	url: '/api/proposals/crud/addQuestionsImage',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(data) {
    		this.setState( { addQuestionsImage: data } );
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });
	}

	render() {
		return(
			<div className={classNames(s.tabContent)}>
				<h2>Ver Propuestas</h2>

				
		  </div>
		);
	}
}

export default withStyles(s)(AdminProposal);