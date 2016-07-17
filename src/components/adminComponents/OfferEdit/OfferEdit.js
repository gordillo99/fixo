import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Form, FormControl, FormGroup, Col, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import { arrBuffToBase64 } from '../../../helpers/helpers.js';
import $ from 'jquery';
import s from './OfferEdit.css';

export default class OfferEdit extends Component {

	constructor(props) {
		super(props);
		let dateFormat = require('dateformat');

		this.state = {
			id: this.props.id,
			actual_date: dateFormat(this.props.prop_date, 'dd/mm/yyyy').toString(),
			actual_time: this.props.actual_time,
			am_pm: this.props.am_pm,
			cost: parseFloat(this.props.cost).toFixed(2),
			state: this.props.state
		};
	}

	_updateProperty(property, event) {
		this.setState({ [property]: event.target.value });
	}

	_stateToNameConversion() {
		switch(this.state.state) {
			case 0:
				return 'Draft';
			case 1:
				return 'Oferta enviada a usuario';
			case 2:
				return 'Oferta aceptada por usuario';
			case 3:
				return 'Oferta rechazada por usuario';
		}
	}

	_sendEmailToUser() {
		let data = {};
		data.proposal = this.props.proposal;
		data.offer = this.state;
		console.log(data);
		$.ajax({
    	url: '/offerMailer/mail/offer',
    	type: 'POST',
    	data: JSON.stringify(data),
    	cache: false,
    	contentType:'application/json',
    	handleAs: 'json',
			processData: false,
    	success: function() {
    		alert('Email fue enviado!');
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });
	}

	render() {
		let emailButton = null;

		if (this.state.state == 0) {
			emailButton = <Button onClick={this._sendEmailToUser.bind(this)}>
											Enviar oferta a usuario (vía email)
										</Button>
		}

		return (
			<div>
				<h3>Descripción de oferta</h3>
				<Form horizontal>
	    		<FormGroup controlId="formControlsId">
			      <Col componentClass={ControlLabel} sm={2}>
			        ID de Oferta
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.state.id} type="text" placeholder="ID" disabled/>
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formControlsCost">
			      <Col componentClass={ControlLabel} sm={2}>
			       	Costo (Q)
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.state.cost} type="text" placeholder="Costo" onChange={this._updateProperty.bind(this, 'cost')}/>
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formControlsActualDate">
			      <Col componentClass={ControlLabel} sm={2}>
			        Fecha decidida
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.state.actual_date} type="text" placeholder="Fecha decidida" onChange={this._updateProperty.bind(this, 'actual_date')}/>
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formControlsActualTime">
			      <Col componentClass={ControlLabel} sm={2}>
			        Hora
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this.state.actual_time} type="text" placeholder="Hora decidida" onChange={this._updateProperty.bind(this, 'actual_time')}/>
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formControlsSelect">
			    	<Col componentClass={ControlLabel} sm={2}>
			      	am/pm
			      </Col>
			      <Col sm={6}>
				      <FormControl value={this.state.am_pm} componentClass="select" onChange={this._updateProperty.bind(this, 'am_pm')}>
				        <option value="am">am</option>
				        <option value="pm">pm</option>
				      </FormControl>
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formControlsActualTime">
			      <Col componentClass={ControlLabel} sm={2}>
			        Estado
			      </Col>
			      <Col sm={6}>
			        <FormControl value={this._stateToNameConversion()} type="text" placeholder="Actual estado" disabled/>
			      </Col>
			    </FormGroup>
			  </Form>
			  {emailButton}
			</div>
		);
	}
}

export default withStyles(s)(OfferEdit);