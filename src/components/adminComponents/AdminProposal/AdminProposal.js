import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
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
		let areas = null;
		let categories = null;
		let txtQsAndAs = null;
		let imgQsAndAs = null;

	  let getAreas = $.ajax({
    	url: '/api/areas/crud/',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(areasData) {
    		areas = areasData;
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });

	  let getCategories = $.ajax({
    	url: '/api/categories/crud/',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(categoriesData) {
    		categories = categoriesData;
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });

	  let getTxtQsAndAs = $.ajax({
    	url: '/api/proposals/crud/addQuestionsTxt',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(txtQsAndAsData) {
    		txtQsAndAs = txtQsAndAsData;
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });

	  let getImgQsAndAs = $.ajax({
    	url: '/api/proposals/crud/addQuestionsImage',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(imgQsAndAsData) {
    		imgQsAndAs = imgQsAndAsData;
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });

	  let getProposals = $.ajax({
    	url: '/api/proposals/crud/',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(proposals) {
    		this.setState({ 
    			proposals: proposals.sort(function(a, b) { return Number(a.id) - Number(b.id) }),
    			areas: areas,
    			categories: categories,
    			addQuestionsTxt: txtQsAndAs,
    			addQuestionsImage: imgQsAndAs
    		});
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });

	  $.when(getAreas, getCategories, getTxtQsAndAs, getImgQsAndAs).then(getProposals);
	}

	render() {
		return(
			<div className={cx(s.tabContent)}>
				<h2>Ver Propuestas</h2>
				{this.state.proposals.map( (proposal, index) => {
					return (
						<ProposalEdit className={cx(s.tabContentElement)}
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
							u_firstname={proposal.u_firstname}
							u_lastname={proposal.u_lastname}
							user_id={proposal.user_id}
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