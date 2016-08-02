import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Panel, Form, FormControl, FormGroup, Col, Row, ControlLabel, Button} from 'react-bootstrap';
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
			usertype: this.props.usertype,
			open: false
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

	_deleteUserInDb() {
		if (confirm('Está seguro que desea borrar a este usuario?')) {
			$.ajax({
	    	url: '/api/users/crud/',
	    	type: 'DELETE',
	    	dataType: 'json',
	    	cache: false,
	    	data: {
	    		id: this.state.id
	    	},
	    	success: function() {
	    		console.log('User borrado successfully!');
	    		alert('El usuario fue borrado exitosamente!');
	    	}.bind(this),
	    	error: function(xhr, status, err) {
	    		alert(err);
	     		console.log(err);
	    	}.bind(this)
		  });
		}
	}

	render() {

	  return (
	    <div>
				<Col xs={12}>
					<Button onClick={() => this.setState({ open: !this.state.open })}>
						{`${this.state.id}.) ${this.state.firstname} ${this.state.lastname}, ${this.state.email}`}
					</Button>
					<Panel collapsible expanded={this.state.open}>
						<Form horizontal>
							<FormGroup controlId="formControlsId">
								<Col componentClass={ControlLabel} xs={12}>
									ID
								</Col>
								<Col xs={12}>
									<FormControl value={this.state.id} type="text" placeholder="Id" disabled/>
								</Col>
							</FormGroup>
							<FormGroup controlId="formControlsName">
								<Col componentClass={ControlLabel} xs={12}>
									Nombre
								</Col>
								<Col sm={6}>
									<FormControl value={this.state.firstname + ' ' + this.state.lastname} type="text" placeholder="Name" disabled/>
								</Col>
							</FormGroup>
							<FormGroup controlId="formControlsEmail">
								<Col componentClass={ControlLabel} xs={12}>
									Email
								</Col>
								<Col sm={6}>
									<FormControl value={this.state.email} type="email" placeholder="Email" disabled/>
								</Col>
							</FormGroup>
							<FormGroup controlId="formControlsSelect">
								<Col componentClass={ControlLabel} xs={12}>
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
								<Row className={s.row}>
									<Col smOffset={2} sm={5}>
										<ul className={classNames(s.noListStyle)}>
											<li className={classNames(s.inline)}>
												<Button onClick={this._updateUserInDb.bind(this)}>
													Actualizar
												</Button>
											</li>
											<li className={classNames(s.inline)}>
												<Button bsStyle="danger" onClick={this._deleteUserInDb.bind(this)}>
													Borrar
												</Button>
											</li>
										</ul>
									</Col>
								</Row>
							</FormGroup>
						</Form>
					</Panel>
				</Col>
	    </div>
	  );
	}
}

export default withStyles(s)(UserEdit);