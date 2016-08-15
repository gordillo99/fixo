import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
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
		let areas = null;
		let categories = null;
		let fixersToAreas = null;
		let fixersToCategories = null;
		let fixers = null;

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

	  let getFixerToAreas = $.ajax({
    	url: '/api/fixers/getAllAreas/',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(fixersToAreasData) {
    		fixersToAreas = fixersToAreasData;
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });

	  let getFixerToCategories = $.ajax({
    	url: '/api/fixers/getAllCategories/',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(fixersToCategoriesData) {
    		fixersToCategories = fixersToCategoriesData;
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });

	  let getFixers = $.ajax({
    	url: '/api/fixers/crud/',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(fixers) {
    		this.setState({
    			fixers: fixers.sort(function(a, b) { return Number(a.id) - Number(b.id) }),
    			areas: areas,
    			categories: categories,
    			fixersToAreas: fixersToAreas,
    			fixersToCategories: fixersToCategories
    		});
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });

	  $.when(getAreas, getCategories, getFixerToAreas, getFixerToCategories).then(getFixers);
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