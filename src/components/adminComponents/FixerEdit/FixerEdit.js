import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Form, FormControl, FormGroup, Col, ControlLabel, Button, HelpBlock} from 'react-bootstrap';
import { arrBuffToBase64 } from '../../../helpers/helpers.js';
import $ from 'jquery';
import s from './FixerEdit.css';

export default class FixerEdit extends Component {

	render() {

		let selectedAreas = [];
		let selectedCategories = [];
		this.props.fixersToAreas.map( (fixToArea, index) => {
			if (fixToArea.fixer_id === Number(this.props.id)) {
				selectedAreas.push(fixToArea.area_id - 1);
			} 
		});

		this.props.fixersToCategories.map( (fixToCat, index) => {
			if (fixToCat.fixer_id === Number(this.props.id)) {
				selectedCategories.push(fixToCat.category_id - 1);
			} 
		});

	  return (
	    <div>
	    	<Form horizontal>
	    		<FormGroup controlId="formControlsId">
			      <Col componentClass={ControlLabel} sm={2}>
			        ID
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.props.id} type="text" placeholder="Id" disabled/>
			      </Col>
			    </FormGroup>

	    		<FormGroup controlId="formControlsFirstName">
			      <Col componentClass={ControlLabel} sm={2}>
			        Nombre
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.props.firstName} type="text" placeholder="Nombre" onChange={this.props.update.bind(this, 'fixer', 'firstname')}/>
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formControlsLastName">
			      <Col componentClass={ControlLabel} sm={2}>
			        Apellido
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.props.lastName} type="text" placeholder="Apellido" onChange={this.props.update.bind(this, 'fixer', 'lastname')}/>
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formControlsPhone">
			      <Col componentClass={ControlLabel} sm={2}>
			        Teléfono
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.props.phone} type="text" placeholder="Teléfono" onChange={this.props.update.bind(this, 'fixer', 'phone')}/>
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formControlsEmail">
			      <Col componentClass={ControlLabel} sm={2}>
			        Email
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.props.email} type="email" placeholder="Email" onChange={this.props.update.bind(this, 'fixer', 'email')}/>
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formControlsSelect">
			    	<Col componentClass={ControlLabel} sm={2}>
			      	Género
			      </Col>
			      <Col sm={6}>
				      <FormControl value={this.props.gender} componentClass="select" onChange={this.props.update.bind(this, 'user', 'gender')}>
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
			        <FormControl value={this.props.age} type="text" placeholder="Edad" onChange={this.props.update.bind(this, 'fixer', 'age')}/>
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formControlsSelectMultipleAreas">
			      <Col componentClass={ControlLabel} sm={2}>
			      	Áreas
			      </Col>
			      <Col sm={6}>
				      <FormControl componentClass="select" multiple value={selectedAreas} onChange={this.props.updateAreaMultiselect.bind(this, 'fixer', 'fixersToAreas', Number(this.props.id))}>
				      	{this.props.areas.map( (area, index) =>  { return(
				      		<option value={index}>{area.description}</option>
				      	)})}
				      </FormControl>
			     	</Col>
			    </FormGroup>

			    <FormGroup controlId="formControlsSelectMultipleCategories">
			      <Col componentClass={ControlLabel} sm={2}>
			      	Categorías
			      </Col>
			      <Col sm={6}>
				      <FormControl componentClass="select" multiple value={selectedCategories} onChange={this.props.updateCategoryMultiselect.bind(this, 'fixer', 'fixersToCategories', Number(this.props.id))}>
				      	{this.props.categories.map( (category, index) =>  { return(
				      		<option value={index}>{category.description}</option>
				      	)})}
				      </FormControl>
			     	</Col>
			    </FormGroup>

			    <FormGroup controlId="formControlsDesc">
			      <Col componentClass={ControlLabel} sm={2}>
			        Descripción
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.props.description} type="text" componentClass="textarea" placeholder="Descripción" onChange={this.props.update.bind(this, 'fixer', 'description')}/>
			      </Col>
			    </FormGroup>

			    <div>
			    	<Col smOffset={2} sm={10}>
			    		<ul className={s.horizontalList}>
			    			<li className={s.horizontalListEle}>
					    		<img height='80px' width='80px' src={'data:image/png;base64,' + arrBuffToBase64(this.props.profilepic.data)} alt='image'/>
					    	</li>
					    	<li className={s.horizontalListEle}>
		            	<FormControl type="file" onChange={this.props.updateImage.bind(this, 'fixer', 'profilepic')} />
		            	<HelpBlock>Tamaño máximo es 2 MB</HelpBlock>
		            </li>
	            </ul>
            </Col>
          </div>

			    <FormGroup>
			      <Col smOffset={2} sm={10}>
			        <Button onClick={this.props.updateInDb}>
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