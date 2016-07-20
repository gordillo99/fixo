import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { arrBuffToBase64 } from '../../../helpers/helpers.js';
import ProposalEdit from '../ProposalEdit';
import $ from 'jquery';
import s from './AdminProposal.css';

export default class AdminProposal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			proposals: [],
			addQuestionsTxt: [],
			addQuestionsImage: [],
			categories: [],
			areas: []
		};
	}

	componentDidMount() {
		/*let offerMap;
		let proposalArray = [];

		$.ajax({
    	url: '/api/offers/crud/',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(data) {
    		offerMap = new Map();
    		data.map((offer, index) => {
    			offerMap.set(offer.proposal_id, offer);
    		});
    		$.ajax({
		    	url: '/api/proposals/crud/',
		    	type: 'GET',
		    	dataType: 'json',
		    	cache: false,
		    	success: function(proposals) {
		    		proposals.map((proposal, index) => {
		    			console.log(proposal.id);
		    			proposal.offer = offerMap.get(Number(proposal.id));
		    			proposalArray.push(proposal);
		    		});
		    		this.setState( { proposals: proposalArray } );
		    	}.bind(this),
		    	error: function(xhr, status, err) {
		     		console.log(err);
		    	}.bind(this)
			  });
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });*/

	  $.ajax({
    	url: '/api/proposals/crud/',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(proposals) {
    		this.setState( { proposals: proposals } );
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });

	  $.ajax({
    	url: '/api/areas/crud/',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(data) {
    		this.setState( { areas: data } );
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });

	  $.ajax({
    	url: '/api/categories/crud/',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(data) {
    		this.setState( { categories: data } );
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
				{this.state.proposals.map( (proposal, index) => {
					return (
						<ProposalEdit className={classNames(s.tabContentElement)}
							key={'proposal-Edit-' + index}
							id={proposal.id}
							email={proposal.email}
							address={proposal.address}
							area={proposal.area}
							f_firstname={proposal.f_firstname}
							f_lastname={proposal.f_lastname}
							fixer_id={proposal.fixer_id}
							morning={proposal.morning}
							phone={proposal.phone_number}
							prop_date={proposal.prop_date}
							u_firstname={proposal.u_firstname}
							u_lastname={proposal.u_lastname}
							user_id={proposal.user_id}
							//offer={proposal.offer}
							created_at={proposal.created_at}
							status={proposal.status}
							category={proposal.category}
							categories={this.state.categories}
							areas={this.state.areas}
							addQuestionsTxt={this.state.addQuestionsTxt}
							addQuestionsImage={this.state.addQuestionsImage}
						/>);
			  })}
		  </div>
		);
	}
}

export default withStyles(s)(AdminProposal);