import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Form, FormControl, FormGroup, Col, ControlLabel, Button} from 'react-bootstrap';
import $ from 'jquery';
import s from './UserEdit.css';

export default class UserEdit extends Component {

	constructor(props) {
		super(props);
		this.state ={
			id: this.props.id,
			email: this.props.email,
			firstname: this.props.firstname,
			lastname: this.props.lastname,
			usertype: this.props.usertype
		};
	}

	_updateProperty(property, event) {
		this.setState( { [property]: event.target.value } );
	}

	_updateUserInDb() {

		$.ajax({
    	url: '/api/users/crud/',
    	type: 'POST',
    	dataType: 'json',
    	cache: false,
    	data: {
    		id: this.state.id,
    		usertype: this.state.usertype
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

	render() {

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
	    		<FormGroup controlId="formControlsName">
			      <Col componentClass={ControlLabel} sm={2}>
			        Nombre
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.state.firstname + ' ' + this.state.lastname} type="text" placeholder="Name" disabled/>
			      </Col>
			    </FormGroup>
			    <FormGroup controlId="formControlsEmail">
			      <Col componentClass={ControlLabel} sm={2}>
			        Email
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.state.email} type="email" placeholder="Email" disabled/>
			      </Col>
			    </FormGroup>
			    <FormGroup controlId="formControlsSelect">
			    	<Col componentClass={ControlLabel} sm={2}>
			      	Tipo
			      </Col>
			      <Col sm={6}>
				      <FormControl value={this.state.usertype} componentClass="select" onChange={this._updateProperty.bind(this, 'usertype')}>
				        <option value="regular">regular</option>
				        <option value="fixer">fixer</option>
				        <option value="admin">admin</option>
				      </FormControl>
			      </Col>
			    </FormGroup>

			    <FormGroup>
			      <Col smOffset={2} sm={10}>
			        <Button onClick={this._updateUserInDb.bind(this)}>
			          Actualizar
			        </Button>
			      </Col>
			    </FormGroup>
			  </Form>
	    </div>
	  );
	}
}

export default withStyles(s)(UserEdit);