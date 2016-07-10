import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
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
		    }) } );
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });
	}

	_updateAttachedImage(index, targetType, property, event) {
		let arr;

    switch(targetType) {
			case 'fixer':
				arr = this.state.fixers;
				break;
			case 'user':
				arr = this.state.users;
				break;
			case 'proposal':
				arr = this.state.proposals;
				break;
			default:
				arr = null;
		}

		var image = $(event.target)[0].files[0],
				reader = new FileReader(),
    		localThis = this;

    // if the image size is bigger than 2 MB, return
    if (image && image.size > 2000000) {
      alert('Este archivo no sera subido. El límite es 2 MB.');
      return;
    }

    reader.onload = function(){
      arr[index][property] = { type: 'ArrayBuffer', data: new Uint8Array(reader.result), prevType: image.type, fileObject: image };
			localThis.setState( { [targetType]: arr } );
    };
    reader.readAsArrayBuffer($(event.target)[0].files[0]); 
  }

  _updateFromAreaMultiselect(index, targetType, property, fixerId, event) {
  	let fixersToAreas = this.state.fixersToAreas;
  	let alreadyExists = false;
  	let newAreaId = Number($(event.target)[0].value) + 1;
  	let arrLength = fixersToAreas.length;

  	function removeIfAlreadyExists(fixToArea) {
		  return (Number(fixToArea.fixer_id) !== Number(fixerId)) || 
		  			 (Number(fixToArea.fixer_id) === Number(fixerId) && Number(fixToArea.area_id) !== Number(newAreaId));
		}

  	fixersToAreas = fixersToAreas.filter(removeIfAlreadyExists);

  	if (arrLength === fixersToAreas.length) {
  		fixersToAreas.push({ fixer_id: fixerId, area_id: newAreaId });
  	}
  	
  	this.setState({ fixersToAreas: fixersToAreas });
  }

  _updateFromCategoryMultiselect(index, targetType, property, fixerId, event) {
  	let fixersToCategories = this.state.fixersToCategories;
  	let alreadyExists = false;
  	let newCategoryId = Number($(event.target)[0].value) + 1;
  	let arrLength = fixersToCategories.length;

  	function removeIfAlreadyExists(fixToCategory) {
		  return (Number(fixToCategory.fixer_id) !== Number(fixerId)) || 
		  			 (Number(fixToCategory.fixer_id) === Number(fixerId) && Number(fixToCategory.category_id) !== Number(newCategoryId));
		}

  	fixersToCategories = fixersToCategories.filter(removeIfAlreadyExists);

  	if (arrLength === fixersToCategories.length) {
  		fixersToCategories.push({ fixer_id: fixerId, category_id: newCategoryId });
  	}
  	
  	this.setState({ fixersToCategories: fixersToCategories });
  }

	_updateFixerInDb(index) {

		let fixer = this.state.fixers[index];
		let data = {};

		function relatedToFixer(fixToEle) {
		  return Number(fixToEle.fixer_id) === Number(fixer.id);
		}

		let fixersToCategories = this.state.fixersToCategories.filter(relatedToFixer);
		let fixersToAreas = this.state.fixersToAreas.filter(relatedToFixer);

		var formData = new FormData();
		formData.append('id', fixer.id);
		formData.append('firstname', fixer.firstname);
		formData.append('lastname', fixer.lastname);
		formData.append('gender', fixer.gender);
		formData.append('email', fixer.email);
		formData.append('description', fixer.description);
		formData.append('age', fixer.age);
		formData.append('phone', fixer.phone);
		formData.append('profilepic', fixer.profilepic.fileObject);

		data.fixer = fixer;
		data.fixersToCategories = fixersToCategories;
		data.fixersToAreas = fixersToAreas;

		$.ajax({
    	url: '/api/fixers/crud/updateFixerAtributes',
    	type: 'POST',
    	dataType: 'json',
    	data: formData,
    	cache: false,
    	contentType: false,
			processData: false,
    	success: function() {
    		$.ajax({
		    	url: '/api/fixers/crud/updateFixerCatsAndAreas',
		    	type: 'POST',
		    	data: JSON.stringify(data),
		    	cache: false,
		    	contentType:'application/json',
		    	handleAs: 'json',
					processData: false,
		    	success: function() {
		    		console.log('Fixer updated successfully!');
		    		alert('El fixer fue actualizado exitosamente!');
		    	}.bind(this),
		    	error: function(xhr, status, err) {
		    		alert(err);
		     		console.log(err);
		    	}.bind(this)
			  });
    	}.bind(this),
    	error: function(xhr, status, err) {
    		console.log(err);
     		alert(err);
    	}.bind(this)
	  });
	}

	render() {
		return(
			<div className={classNames(s.tabContent)}>
				<h2>Crear Fixer</h2>
				<FixerCreate 
					areas={this.state.areas}
					categories={this.state.categories}
				/>
				<h2>Actualizar Fixers</h2>
				{this.state.fixers.map( (fixer, index) => {
					return (
								<FixerEdit className={classNames(s.tabContentElement)}
									id={fixer.id}
									email={fixer.email}
									firstName={fixer.firstname}
									lastName={fixer.lastname}
									update={this.props._updateProperty.bind(this, index)}
									description={fixer.description}
									age={fixer.age}
									gender={fixer.gender}
									phone={fixer.phone}
									profilepic={fixer.profilepic}
									areas={this.state.areas}
									categories={this.state.categories}
									updateImage={this._updateAttachedImage.bind(this, index)}
									fixersToAreas={this.state.fixersToAreas}
									fixersToCategories={this.state.fixersToCategories}
									updateAreaMultiselect={this._updateFromAreaMultiselect.bind(this, index)}
									updateCategoryMultiselect={this._updateFromCategoryMultiselect.bind(this, index)}
									updateInDb={this._updateFixerInDb.bind(this, index)}
								/>);
			  })}
		  </div>	
		);
	}
}

export default withStyles(s)(AdminFixer);