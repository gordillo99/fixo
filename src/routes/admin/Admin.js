import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Jumbotron, Tabs, Tab} from 'react-bootstrap';
import { arrBuffToBase64 } from '../../helpers/helpers.js';
import UserEdit from '../../components/adminComponents/UserEdit';
import FixerEdit from '../../components/adminComponents/FixerEdit';
import FixerCreate from '../../components/adminComponents/FixerCreate';
import $ from 'jquery';
import s from './Admin.css';

export default class Admin extends Component {

	constructor(props) {
		super(props);
		this.state = {
			fixers: [],
			users: [],
			proposals: [],
			areas: [],
			categories: [],
			newFixer: {
				firstname: '',
				lastname: '',
				email: '',
				age: 0,
				gender: 0,
				description: '',
				phone: '',
				profilepic: null
			},
			fixersToAreas: [],
			fixersToCategories: []
		};
	}

	_updateProperty(index, targetType, property, event) {
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
		arr[index][property] = event.target.value;
		this.setState( { [targetType]: arr } );
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

	_updateUserInDb(index) {
		let user = this.state.users[index];
		$.ajax({
    	url: '/api/users/crud/',
    	type: 'POST',
    	dataType: 'json',
    	cache: false,
    	data: {
    		id: user.id,
    		usertype: user.usertype
    	},
    	success: function() {
    		console.log('User updated successfully!');
    		alert('El usuario fue actualizado exitosamente!');
    	}.bind(this),
    	error: function(xhr, status, err) {
    		alert(err);
     		console.log(err);
    	}.bind(this)
	  });
	}

	_updateFixerInDb(index) {

		let fixer = this.state.fixers[index];
		let data = {};

		function relatedToFixer(fixToEle) {
		  return Number(fixToEle.fixer_id) === Number(fixer.id);
		}

		let fixersToCategories = this.state.fixersToCategories.filter(relatedToFixer);
		let fixersToAreas = this.state.fixersToAreas.filter(relatedToFixer);

		data.fixer = fixer;
		data.fixer.profilepic = fixer.profilepic.fileObject;
		data.fixersToCategories = fixersToCategories;
		data.fixersToAreas = fixersToAreas;

		$.ajax({
    	url: '/api/fixers/crud/updateFixer',
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
	}

	componentDidMount() {
		$.ajax({
    	url: '/api/users/crud/',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(data) {
    		this.setState( { users: data } );
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
    		console.log(data);
    		this.setState( { fixers: data.sort(function(a, b) {
		        return Number(a.id) - Number(b.id);
		    }) } );
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

	}

	render() {

		let userContent = <div className={classNames(s.tabContent)}>
												{this.state.users.map( (user, index) => {
													return (
																<UserEdit className={classNames(s.tabContentElement)}
																	id={user.id}
																	email={user.email}
																	firstName={user.firstname}
																	lastName={user.lastname}
																	userType={user.usertype}
																	update={this._updateProperty.bind(this, index)}
																	updateInDb={this._updateUserInDb.bind(this, index)}
																/>);
												})}
											</div>

		let fixerContent = <div className={classNames(s.tabContent)}>

												{this.state.fixers.map( (fixer, index) => {
													return (
																<FixerEdit className={classNames(s.tabContentElement)}
																	id={fixer.id}
																	email={fixer.email}
																	firstName={fixer.firstname}
																	lastName={fixer.lastname}
																	update={this._updateProperty.bind(this, index)}
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

		let proposalContent = <div>
													</div>
		let offerContent = <div>
											 </div>							

		const tabsInstance = (
		  <Tabs defaultActiveKey={1} id='admin-tabs'>
		    <Tab eventKey={1} title='Usuarios'>
		    	{userContent}
		    </Tab>
		    <Tab eventKey={2} title='Fixers'>
		    	{fixerContent}
		    </Tab>
		    <Tab eventKey={3} title='Propuestas'>
		    	{proposalContent}
		    </Tab>
		    <Tab eventKey={4} title='Ofertas'>
		    	{offerContent}
		    </Tab>
		  </Tabs>
		);

	  return (
	    <div className={s.root}>
	    	<Jumbotron className={s.stripeJumbotron}>
		      <div className={s.container}>
		      	<h1 className={s.adminPageHeader}>Admin</h1>
		      	{tabsInstance}

		        <div className={s.leftAligned}>

		        </div>
		      </div>
	     </Jumbotron>
	    </div>
	  );
	}
}

export default withStyles(s)(Admin);