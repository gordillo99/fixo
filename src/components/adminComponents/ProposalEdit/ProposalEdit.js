import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Form, FormControl, FormGroup, Col, ControlLabel, Button, Panel } from 'react-bootstrap';
import { arrBuffToBase64, catEnglishToSpanish } from '../../../helpers/helpers.js';
import AnswersDisplay from '../../questionComponents/AnswersDisplay';
import $ from 'jquery';
import s from './ProposalEdit.css';

export default class ProposalEdit extends Component {

	constructor(props) {
		super(props);
		let dateFormat = require('dateformat');

		this.state = {
			id: this.props.id,
			user_id: this.props.user_id,
			u_firstname: this.props.u_firstname,
			u_lastname: this.props.u_lastname,
			phone: this.props.phone,
			prop_date: dateFormat(this.props.prop_date, 'dd/mm/yyyy').toString(),
			morning: this.props.morning,
			email: this.props.email,
			address: this.props.address,
			area: this.props.area,
			fixer_id: this.props.fixer_id,
			f_firstname: this.props.f_firstname,
			f_lastname: this.props.f_lastname,
			category: catEnglishToSpanish(this.props.category),
			open: false
		};
	}

	render() {
		let areaDesc = this.props.areas[Number(this.state.area)] ? this.props.areas[Number(this.state.area)].description : '' ;
		let qsAndAs = [];

		this.props.addQuestionsTxt.map((question) => { 
			if (Number(question.proposal_id) === Number(this.props.id)) {
				qsAndAs.push({ q: question.question, a: question.answer, type: 'txt' });
			}
		});

		this.props.addQuestionsImage.map((question) => { 
			if (Number(question.proposal_id) === Number(this.props.id)) {
				qsAndAs.push({ q: question.question, a: question.answer, type: 'upload' });
			}
		});

		return(
			<div>
				<Button onClick={() => this.setState({ open: !this.state.open })}>
         	{this.state.id + '.) ' + this.state.u_firstname + ' ' + this.state.u_lastname + ', ' + this.state.prop_date + ', ' + this.state.category}
        </Button>
        <Panel collapsible expanded={this.state.open}>
        	<h3>Descripción de propuesta</h3>
          <Form horizontal>
		    		<FormGroup controlId="formControlsId">
				      <Col componentClass={ControlLabel} sm={2}>
				        ID de propuesta
				      </Col>
				      <Col sm={6}>
				        <FormControl value={this.state.id} type="text" placeholder="Id" disabled/>
				      </Col>
				    </FormGroup>

				    <FormGroup controlId="formUserId">
				      <Col componentClass={ControlLabel} sm={2}>
				        ID de usuario
				      </Col>
				      <Col sm={6}>
				        <FormControl value={this.state.user_id} type="text" placeholder="id de usuario" disabled/>
				      </Col>
				    </FormGroup>

				    <FormGroup controlId="formControlsId">
				      <Col componentClass={ControlLabel} sm={2}>
				        Nombre de usuario
				      </Col>
				      <Col sm={6}>
				        <FormControl value={this.state.u_firstname + ' ' + this.state.u_lastname} type="text" placeholder="nombre de usuario" disabled/>
				      </Col>
				    </FormGroup>

				    <FormGroup controlId="formControlsId">
				      <Col componentClass={ControlLabel} sm={2}>
				        Fecha (dd/mm/yyyy)
				      </Col>
				      <Col sm={6}>
				        <FormControl value={this.state.prop_date} type="text" placeholder="fecha propuesta" disabled/>
				      </Col>
				    </FormGroup>

				    <FormGroup controlId="formControlsId">
				      <Col componentClass={ControlLabel} sm={2}>
				        Teléfono de usuario
				      </Col>
				      <Col sm={6}>
				        <FormControl value={this.state.phone} type="text" placeholder="teléfono de usuario" disabled/>
				      </Col>
				    </FormGroup>

				    <FormGroup controlId="formControlsEmail">
				      <Col componentClass={ControlLabel} sm={2}>
				        Email de usuario
				      </Col>
				      <Col sm={6}>
				        <FormControl value={this.state.email} type="email" placeholder="Email" disabled/>
				      </Col>
				    </FormGroup>

				    <FormGroup controlId="formControlsId">
				      <Col componentClass={ControlLabel} sm={2}>
				        Dirección
				      </Col>
				      <Col sm={6}>
				        <FormControl value={this.state.address} type="text" placeholder="dirección de usuario" disabled/>
				      </Col>
				    </FormGroup>

				    <FormGroup controlId="formControlsId">
				      <Col componentClass={ControlLabel} sm={2}>
				        Área
				      </Col>
				      <Col sm={6}>
				        <FormControl value={areaDesc} type="text" placeholder="área de usuario" disabled/>
				      </Col>
				    </FormGroup>

				    <FormGroup controlId="formUserId">
				      <Col componentClass={ControlLabel} sm={2}>
				        ID de fixer
				      </Col>
				      <Col sm={6}>
				        <FormControl value={this.state.fixer_id} type="text" placeholder="id de fixer" disabled/>
				      </Col>
				    </FormGroup>

				    <FormGroup controlId="formControlsId">
				      <Col componentClass={ControlLabel} sm={2}>
				        Nombre de fixer
				      </Col>
				      <Col sm={6}>
				        <FormControl value={this.state.f_firstname + ' ' + this.state.f_lastname} type="text" placeholder="nombre de fixer" disabled/>
				      </Col>
				    </FormGroup>

				    <AnswersDisplay rawImages={true} qsAndAs={qsAndAs} />

				    <FormGroup>
				      <Col smOffset={2} sm={10}>
				        <Button>
				          Crear Oferta
				        </Button>
				      </Col>
				    </FormGroup>
				  </Form>
        </Panel>	
	    </div>
		);
	}
}

export default withStyles(s)(ProposalEdit);