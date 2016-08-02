import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { arrBuffToBase64, catEnglishToSpanish } from '../../../helpers/helpers.js';
import { Row, Panel, Form, FormControl, FormGroup, Col, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import $ from 'jquery';
import s from './FixerCreate.css';

export default class FixerCreate extends Component {

	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',
			phone: '',
			email: '',
			gender: 0,
			age: null,
			profilepic: null,
			fixersToAreas: [],
			fixersToCategories: [],
			open: false
		};
	}

	_updateProperty(property, event) {
		this.setState( { [property]: event.target.value } );
	}

	_updateMultiselect(property, event) {
		let fixersToElements = this.state[property];
		let newCategoryId = Number($(event.target)[0].value) + 1;
		let arrLength = fixersToElements.length;

		function removeIfAlreadyExists(fixToElement) {
		  return Number(fixToElement.category_id) !== Number(newCategoryId);
		}

		fixersToElements = fixersToElements.filter(removeIfAlreadyExists);

  	if (arrLength === fixersToElements.length) {
  		fixersToElements.push({ category_id: newCategoryId });
  	}
  	
  	this.setState({ [property]: fixersToElements });
	}

	_updatePicture(event) {
		var image = $(event.target)[0].files[0],
				reader = new FileReader(),
    		localThis = this;

    // if the image size is bigger than 2 MB, return
    if (image && image.size > 2000000) {
      alert('Este archivo no sera subido. El límite es 2 MB.');
      return;
    }

    reader.onload = function(){
			localThis.setState( { profilepic: { type: 'ArrayBuffer', data: new Uint8Array(reader.result), prevType: image.type, fileObject: image } } );
    };
    reader.readAsArrayBuffer($(event.target)[0].files[0]); 
	}

	_createFixer() {
		var formData = new FormData();
		formData.append('firstname', this.state.firstname);
		formData.append('lastname', this.state.lastname);
		formData.append('gender', this.state.gender);
		formData.append('email', this.state.email);
		formData.append('description', this.state.description);
		formData.append('age', this.state.age);
		formData.append('phone', this.state.phone);
		if (this.state.profilepic !== null && this.state.profilepic !== undefined) {
			formData.append('profilepic', this.state.profilepic.fileObject);
		}

		$.ajax({
    	url: '/api/fixers/crud',
    	type: 'POST',
    	dataType: 'json',
    	data: formData,
    	cache: false,
    	contentType: false,
			processData: false,
    	success: function(fixerId) {
    		let data = {};
    		data.fixer = {};
    		data.fixer.id = Number(fixerId[0].id);
				data.fixersToAreas = this.state.fixersToAreas.map((ele) => { return { fixer_id: Number(data.fixer.id), area_id: Number(ele.category_id) } });
				data.fixersToCategories = this.state.fixersToCategories.map((ele) => { return { fixer_id: Number(data.fixer.id), category_id: Number(ele.category_id) } });

    		$.ajax({
		    	url: '/api/fixers/crud/updateFixerCatsAndAreas',
		    	type: 'POST',
		    	data: JSON.stringify(data),
		    	cache: false,
		    	contentType:'application/json',
		    	handleAs: 'json',
					processData: false,
		    	success: function() {
		    		console.log('Fixer created successfully!');
		    		alert('El fixer fue creado exitosamente!');
		    		location.reload();
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

		this.state.fixersToAreas.map( (fixToArea, index) => {
			selectedAreas.push(fixToArea.category_id - 1);
		});

		this.state.fixersToCategories.map( (fixToCat, index) => {
			selectedCategories.push(fixToCat.category_id - 1);
		});

		if (this.state.profilepic !== null && this.state.profilepic !== undefined) {
			showImagePreview = <img height='80px' width='80px' src={'data:image/png;base64,' + arrBuffToBase64(this.state.profilepic.data)} alt='image'/>;
		}

	  return (
	    <div>
	    	<Button onClick={() => this.setState({ open: !this.state.open })}>
         	Crear nuevo fixer
        </Button>
        <Panel collapsible expanded={this.state.open}>
		    	<Form horizontal>
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
				        <FormControl value={this.props.lastname} type="text" placeholder="Apellido" onChange={this._updateProperty.bind(this, 'lastname')}/>
				      </Col>
				    </FormGroup>

				    <FormGroup controlId="formControlsPhone">
				      <Col componentClass={ControlLabel} sm={2}>
				        Teléfono
				      </Col>
				      <Col sm={6}>
				        <FormControl value={this.props.phone} type="text" placeholder="Teléfono" onChange={this._updateProperty.bind(this, 'phone')}/>
				      </Col>
				    </FormGroup>

				    <FormGroup controlId="formControlsEmail">
				      <Col componentClass={ControlLabel} sm={2}>
				        Email
				      </Col>
				      <Col sm={6}>
				        <FormControl value={this.props.email} type="email" placeholder="Email" onChange={this._updateProperty.bind(this, 'email')}/>
				      </Col>
				    </FormGroup>

				    <FormGroup controlId="formControlsSelect">
				    	<Col componentClass={ControlLabel} sm={2}>
				      	Género
				      </Col>
				      <Col sm={6}>
					      <FormControl value={this.props.gender} componentClass="select" onChange={this._updateProperty.bind(this, 'gender')}>
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
				        <FormControl value={this.props.age} type="text" placeholder="Edad" onChange={this._updateProperty.bind(this, 'age')}/>
				      </Col>
				    </FormGroup>

				    <FormGroup controlId="formControlsSelectMultipleAreas">
				      <Col componentClass={ControlLabel} sm={2}>
				      	Áreas
				      </Col>
				      <Col sm={6}>
					      <FormControl componentClass="select" multiple value={selectedAreas} onChange={this._updateMultiselect.bind(this, 'fixersToAreas')}>
					      	{this.props.areas.map( (area, index) =>  { return(
					      		<option key={'select-areas-fixer-' + index} value={index}>{area.description}</option>
					      	)})}
					      </FormControl>
				     	</Col>
				    </FormGroup>

				    <FormGroup controlId="formControlsSelectMultipleCategories">
				      <Col componentClass={ControlLabel} sm={2}>
				      	Categorías
				      </Col>
				      <Col sm={6}>
					      <FormControl componentClass="select" multiple value={selectedCategories} onChange={this._updateMultiselect.bind(this, 'fixersToCategories')}>
					      	{this.props.categories.map( (category, index) =>  { return(
					      		<option key={'select-cat-fixer-' + index} value={index}>{catEnglishToSpanish(category.description)}</option>
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
			            	<FormControl type="file" onChange={this._updatePicture.bind(this)}/>
			            	<HelpBlock>Tamaño máximo es 2 MB</HelpBlock>
			            </li>
		            </ul>
	            </Col>
	          </div>

				    <FormGroup>
				    	<Row className={s.row}>
					      <Col smOffset={2} sm={5}>
					      	<ul className={classNames(s.noListStyle)}>
					      		<li className={classNames(s.inline)}>
							        <Button onClick={this._createFixer.bind(this)}>
							          Crear Fixer
							        </Button>
							      </li>
							      <li className={classNames(s.inline)}>
							        <Button onClick={() => this.setState( { open: !this.state.open } )}>
							          Cancelar
							        </Button>
							      </li>
					        </ul>
					      </Col>
				      </Row>
				    </FormGroup>
				  </Form>
				</Panel>
	    </div>
	  );
	}
}

export default withStyles(s)(FixerCreate);