import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Form, FormControl, FormGroup, Col, ControlLabel, Button} from 'react-bootstrap';
import $ from 'jquery';
import s from './FixerCreate.css';

export default class FixerCreate extends Component {

	render() {

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
	    		<FormGroup controlId="formControlsName">
			      <Col componentClass={ControlLabel} sm={2}>
			        Nombre
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.props.firstName + ' ' + this.props.lastName} type="text" placeholder="Name" disabled/>
			      </Col>
			    </FormGroup>
			    <FormGroup controlId="formControlsEmail">
			      <Col componentClass={ControlLabel} sm={2}>
			        Email
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.props.email} type="email" placeholder="Email" disabled/>
			      </Col>
			    </FormGroup>
			    <FormGroup controlId="formControlsSelect">
			    	<Col componentClass={ControlLabel} sm={2}>
			      	Tipo
			      </Col>
			      <Col sm={6}>
				      <FormControl value={this.props.userType} componentClass="select" onChange={this.props.update.bind(this, 'user', 'usertype')}>
				        <option value="regular">regular</option>
				        <option value="fixer">fixer</option>
				        <option value="admin">admin</option>
				      </FormControl>
			      </Col>
			    </FormGroup>

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

export default withStyles(s)(FixerCreate);