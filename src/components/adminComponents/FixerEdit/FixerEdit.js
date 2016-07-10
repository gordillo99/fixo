import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Form, FormControl, FormGroup, Col, ControlLabel, Button, HelpBlock} from 'react-bootstrap';
import { arrBuffToBase64, catEnglishToSpanish } from '../../../helpers/helpers.js';
import $ from 'jquery';
import s from './FixerEdit.css';

export default class FixerEdit extends Component {

	constructor(props) {
		super(props);
		let fixersToCategories = this.props.fixersToCategories.map(fixToCat => { 
			if (Number(fixToCat.fixer_id) === Number(this.props.id)) {
				return fixToCat;
			}
		});

		let fixersToAreas = this.props.fixersToAreas.map(fixToAr => { 
			if (Number(fixToAr.fixer_id) === Number(this.props.id)) {
				return fixToAr;
			}
		});

		this.state = {
			id: this.props.id,
			firstname: this.props.firstname,
			lastname: this.props.lastname,
			phone: this.props.phone,
			email: this.props.email,
			gender: this.props.gender,
			age: this.props.age,
			profilepic: this.props.profilepic,
			description: this.props.description,
			fixersToAreas: fixersToAreas,
			fixersToCategories: fixersToCategories
		};
	}

	_updateProperty(property, event) {
		this.setState( { [property]: event.target.value } );
	}

	_updateAttachedImage(event) {

		var image = $(event.target)[0].files[0],
				reader = new FileReader(),
    		localThis = this;

    // if the image size is bigger than 2 MB, return
    if (image && image.size > 2000000) {
      alert('Este archivo no sera subido. El límite es 2 MB.');
      return;
    }

    reader.onload = function(){
			this.setState( { profilepic:  { type: 'ArrayBuffer', data: new Uint8Array(reader.result), prevType: image.type, fileObject: image } } );
    }.bind(this);
    reader.readAsArrayBuffer($(event.target)[0].files[0]); 
  }

  _updateFromMultiselect(property, event) {
  	let fixersToEles = null;
  	let idPropName = null;
  	if (property === 'fixersToAreas') {
			fixersToEles	= this.state.fixersToAreas;
			idPropName = 'area_id';
  	} else {
  		fixersToEles	= this.state.fixersToCategories;
  		idPropName = 'category_id';
  	}
  	let alreadyExists = false;
  	let newId = Number($(event.target)[0].value) + 1;
  	let arrLength = fixersToEles.length;

  	function removeIfAlreadyExists(fixToArea) {
		  return (Number(fixToArea[idPropName]) !== Number(newId));
		}

  	fixersToEles = fixersToEles.filter(removeIfAlreadyExists);

  	if (arrLength === fixersToEles.length) {
  		fixersToEles.push({ fixer_id: this.state.id, [idPropName]: newId });
  	}
  	
  	this.setState({ [property]: fixersToEles });
  }

	_updateFixerInDb() {

		let fixer = {
			id: this.state.id,
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			phone: this.state.phone,
			email: this.state.email,
			gender: this.state.gender,
			age: this.state.age,
			description: this.state.description,
			profilepic: this.state.profilepic
		};

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

		let selectedAreas = [];
		let selectedCategories = [];
		let showImagePreview = null;

		this.state.fixersToAreas.map( (fixToArea) => {
			selectedAreas.push(fixToArea.area_id - 1);
		});

		this.state.fixersToCategories.map( (fixToCat) => {
			selectedCategories.push(fixToCat.category_id - 1);
		});

		if (this.state.profilepic !== null && this.state.profilepic !== undefined) {
			showImagePreview = <img height='80px' width='80px' src={'data:image/png;base64,' + arrBuffToBase64(this.state.profilepic.data)} alt='image'/>;
		}

	  return (
	    <div>
	    	<Form horizontal>
	    		<FormGroup controlId="formControlsId">
			      <Col componentClass={ControlLabel} sm={2}>
			        ID
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.state.id} type="text" placeholder="Id" disabled/>
			      </Col>
			    </FormGroup>

	    		<FormGroup controlId="formControlsFirstName">
			      <Col componentClass={ControlLabel} sm={2}>
			        Nombre
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.state.firstname} type="text" placeholder="Nombre" onChange={this._updateProperty.bind(this, 'firstname')}/>
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formControlsLastName">
			      <Col componentClass={ControlLabel} sm={2}>
			        Apellido
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.state.lastname} type="text" placeholder="Apellido" onChange={this._updateProperty.bind(this, 'lastname')}/>
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formControlsPhone">
			      <Col componentClass={ControlLabel} sm={2}>
			        Teléfono
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.state.phone} type="text" placeholder="Teléfono" onChange={this._updateProperty.bind(this, 'phone')}/>
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formControlsEmail">
			      <Col componentClass={ControlLabel} sm={2}>
			        Email
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.state.email} type="email" placeholder="Email" onChange={this._updateProperty.bind(this, 'email')}/>
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formControlsSelect">
			    	<Col componentClass={ControlLabel} sm={2}>
			      	Género
			      </Col>
			      <Col sm={6}>
				      <FormControl value={this.state.gender} componentClass="select" onChange={this._updateProperty.bind(this, 'gender')}>
				        <option value="hombre">hombre</option>
				        <option value="mujer">mujer</option>
				      </FormControl>
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formControlsAge">
			      <Col componentClass={ControlLabel} sm={2}>
			        Edad
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.state.age} type="text" placeholder="Edad" onChange={this._updateProperty.bind(this, 'age')}/>
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formControlsSelectMultipleAreas">
			      <Col componentClass={ControlLabel} sm={2}>
			      	Áreas
			      </Col>
			      <Col sm={6}>
				      <FormControl componentClass="select" multiple value={selectedAreas} onChange={this._updateFromMultiselect.bind(this, 'fixersToAreas')}>
				      	{this.props.areas.map( (area, index) =>  { return(
				      		<option key={'sel-opt1-' + index} value={index}>{area.description}</option>
				      	)})}
				      </FormControl>
			     	</Col>
			    </FormGroup>

			    <FormGroup controlId="formControlsSelectMultipleCategories">
			      <Col componentClass={ControlLabel} sm={2}>
			      	Categorías
			      </Col>
			      <Col sm={6}>
				      <FormControl componentClass="select" multiple value={selectedCategories} onChange={this._updateFromMultiselect.bind(this, 'fixersToCategories')}>
				      	{this.props.categories.map( (category, index) =>  { 
				      		return(
				      			<option key={'sel-opt2-' + index} value={index}>{catEnglishToSpanish(category.description)}</option>
				      	)})}
				      </FormControl>
			     	</Col>
			    </FormGroup>

			    <FormGroup controlId="formControlsDesc">
			      <Col componentClass={ControlLabel} sm={2}>
			        Descripción
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.state.description} type="text" componentClass="textarea" placeholder="Descripción" onChange={this._updateProperty.bind(this, 'description')}/>
			      </Col>
			    </FormGroup>

			    <div>
			    	<Col smOffset={2} sm={10}>
			    		<ul className={s.horizontalList}>
			    			<li className={s.horizontalListEle}>
					    		{showImagePreview}
					    	</li>
					    	<li className={s.horizontalListEle}>
		            	<FormControl type="file" onChange={this._updateAttachedImage.bind(this)} />
		            	<HelpBlock>Tamaño máximo es 2 MB</HelpBlock>
		            </li>
	            </ul>
            </Col>
          </div>

			    <FormGroup>
			      <Col smOffset={2} sm={10}>
			        <Button onClick={this._updateFixerInDb.bind(this)}>
			          Actualizar
			        </Button>
			      </Col>
			    </FormGroup>
			  </Form>
	    </div>
	  );
	}
}

export default withStyles(s)(FixerEdit);