import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { arrBuffToBase64 } from '../../../helpers/helpers.js';
import FixerEdit from '../FixerEdit';
import FixerCreate from '../FixerCreate';
import $ from 'jquery';
import s from './AdminFixer.css';

export default class AdminFixer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			fixers: [],
			fixersToAreas: [],
			fixersToCategories: [],
			areas: [],
			categories: []
		};
	}

	componentDidMount() {
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
    	url: '/api/fixers/getAllAreas/',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(data) {
    		this.setState( { fixersToAreas: data } );
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });

	  $.ajax({
    	url: '/api/fixers/getAllCategories/',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(data) {
    		this.setState( { fixersToCategories: data } );
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });

	  $.ajax({
    	url: '/api/fixers/crud/',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(data) {
    		this.setState( { fixers: data.sort(function(a, b) {
		      return Number(a.id) - Number(b.id);
		    })});
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });
	}

	render() {
		return(
			<div className={cx(s.tabContent)}>
				<h2>Crear Fixer</h2>
				<FixerCreate 
					areas={this.state.areas}
					categories={this.state.categories}
				/>
				<h2>Actualizar Fixers</h2>
				{this.state.fixers.map( (fixer, index) => {
					return (
						<FixerEdit className={cx(s.tabContentElement)}
							key={'fixerEdit-' + index}
							id={fixer.id}
							email={fixer.email}
							firstname={fixer.firstname}
							lastname={fixer.lastname}
							description={fixer.description}
							age={fixer.age}
							gender={fixer.gender}
							phone={fixer.phone}
							profilepic={fixer.profilepic}
							areas={this.state.areas}
							categories={this.state.categories}
							fixersToAreas={this.state.fixersToAreas}
							fixersToCategories={this.state.fixersToCategories}
						/>);
			  })}
		  </div>
		);
	}
}

export default withStyles(s)(AdminFixer);