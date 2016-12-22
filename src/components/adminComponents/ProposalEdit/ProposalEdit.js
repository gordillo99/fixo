import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Row, Form, FormControl, FormGroup, Col, ControlLabel, Button, Panel, Table } from 'react-bootstrap';
import { RadioGroup, Radio } from 'react-radio-group';
import { arrBuffToBase64, catEnglishToSpanish } from '../../../helpers/helpers.js';
import AnswersDisplay from '../../questionComponents/AnswersDisplay';
import OfferEdit from '../OfferEdit';
import qs from 'qs';
import $ from 'jquery';
import s from './ProposalEdit.css';

export default class ProposalEdit extends Component {

	constructor(props) {
		super(props);
		let dateFormat = require('dateformat');
		const d = new Date(this.props.created_at);

		this.state = {
			id: this.props.id,
			user_id: this.props.user_id,
			u_firstname: this.props.u_firstname,
			u_lastname: this.props.u_lastname,
			phone: this.props.phone,
			//created_at: dateFormat(this.props.created_at, 'dd/mm/yyyy').toString(),
			created_at: `${d.getUTCDate()}/${d.getUTCMonth()+1}/${d.getUTCFullYear()}`,
			email: this.props.email,
			address: this.props.address,
			area: this.props.area,
			fixer_id: this.props.fixer_id,
			f_firstname: this.props.f_firstname,
			f_lastname: this.props.f_lastname,
			category: catEnglishToSpanish(this.props.category),
			status: this.props.status,
			open: false,
			selectedDate: null,
			attachedImage: null
		};
	}

	componentDidMount() {
		$.ajax({
			url: '/api/proposals/get/dates/' + this.state.id,
			type: 'GET',
			success: function(data) {
				let i;
				let selectedDate = null;
				for (i = 0; i < data.length; i++) {
					if (data[i] !== null && data[i] !== undefined) selectedDate = i; 
				}
				this.setState({ dates: data, selectedDate: selectedDate });
			}.bind(this),
			error: function(xhr, status, err) {
				console.log(err);
				alert('Error obteniendo las fechas de una propuesta.');
			}.bind(this)
		});
	}

	_updateProposalStatus() {
		let status = 0;
		let data = {};

		if (!this.state.status) {
			status = 1;
		}

		data.id = this.state.id;
		data.status = status;

		$.ajax({
    	url: '/api/proposals/updateProposalState',
    	type: 'POST',
    	data: JSON.stringify(data),
    	cache: false,
    	contentType:'application/json',
    	handleAs: 'json',
			processData: false,
    	success: function() {
    		alert('Propuesta fue actualizada exitosamente!');
    		this.setState({ status: status });
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
				alert('Error actualizando la propuesta.');
    	}.bind(this)
	  });
	}

	_deleteProposalInDb() {
		let data = {
			id: this.state.id
		};

		$.ajax({
    	url: '/api/proposals/crud',
    	type: 'DELETE',
    	data: JSON.stringify(data),
    	cache: false,
    	contentType:'application/json',
    	handleAs: 'json',
			processData: false,
    	success: function() {
    		alert('Propuesta fue borrada exitosamente!');
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
				alert('Error borrando la propuesta.');
    	}.bind(this)
	  });
	}

	_generatePDF() {
		let data = {
			id: this.state.id,
			dates: dates
		};

		$.ajax({
    	url: '/pdf/pdfGenerator/' + this.state.id,
    	type: 'GET',
    	success: function(response) {
    		console.log(response);
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });
	}

	_displayProposedDates() {
    let dateFormat = require('dateformat');
		
		if (!this.state.dates) return null;

    return this.state.dates.map((date, index) => {
			//const formattedDate = dateFormat(date.prop_date, 'longDate').toString();
			const d = new Date(date.prop_date);
			const formattedDate = `${d.getUTCDate()}/${d.getUTCMonth()+1}/${d.getUTCFullYear()}`;

			const time = date.prop_time;
			const mins = date.prop_mins;
			const ampm = date.prop_ampm;
			return (
				<tr>
					<td>{`${formattedDate}`}</td>
					<td>{`${time}:${mins} ${ampm}`}</td>
					<td>{date.selected ? 'si' : 'no'}</td>
				</tr>
			)});
  }

	_renderDateSelectionForm() {
		let dateFormat = require('dateformat');

		if (!this.state.dates) return null;

		return this.state.dates.map((date, index) => {
			const d = new Date(date.prop_date);
			return (
				<label className={s.radioButtonLabel}>
					<Radio className={s.radioButtonLabel} value={index} />  {`${d.getUTCDate()}/${d.getUTCMonth()+1}/${d.getUTCFullYear()}`}
				</label>
			)
		});
	}

	_handleChange(value) {
		let dates = this.state.dates;
		dates[this.state.selectedDate].selected = false;
		dates[value].selected = true;
    this.setState({ selectedDate: value, dates: dates });
  }

	_sendEmailUpdatedDateEmailToUser() {
		if (this.props.email === null || this.props.email === undefined || this.props.email.length === 0) {
			return false;
		}

		const selDate = this.state.dates[this.state.selectedDate];
		let dateFormat = require('dateformat');
		const d = new Date(selDate.prop_date);

		let data = {
			proposal: {
				f_firstname: this.state.f_firstname,
				f_lastname: this.state.f_lastname,
				category: this.state.category,
				email: this.props.email,
				address: this.props.address
			},
			//selectedDate: `${dateFormat(selDate.prop_date, 'dd/mm/yyyy').toString()}`,
			selectedDate: `${d.getUTCDate()}/${d.getUTCMonth()+1}/${d.getUTCFullYear()}`,
			selectedTime: `${selDate.prop_time}:${selDate.prop_mins} ${selDate.prop_ampm}`
		};

		$.ajax({
    	url: `/mail/updatedDate/sendEmail`,
    	type: 'POST',
    	data: JSON.stringify(data),
    	cache: false,
    	contentType:'application/json',
    	handleAs: 'json',
			processData: false,
    	success: function(data) {
				if (data) alert('Correo fue enviado al usuario.');
    	}.bind(this),
    	error: function(xhr, status, err) {
				alert('Error enviando correo al usuario.');
     		console.log(err);
    	}.bind(this)
	  });
		return true;
	}

	_updateSelectedDate() {
		if (this.state.selectedDate === null || this.state.selectedDate === undefined) {
			alert('Por favor escoger una fecha.');
			return;
		}
		console.log(this.state.dates[this.state.selectedDate]);
		let data = {
			id: this.state.dates[this.state.selectedDate].id
		};

		$.ajax({
    	url: `/api/proposals/updateSelectedDate/${this.state.id}`,
    	type: 'POST',
    	data: JSON.stringify(data),
    	cache: false,
    	contentType:'application/json',
    	handleAs: 'json',
			processData: false,
    	success: function(data) {
				if (!this._sendEmailUpdatedDateEmailToUser()) {
					alert('Email de usuario es incorrecto. No se pudo enviar correo avisando de nueva fecha. Por favor contactar a usuario directamente.');
				}
				//if (data) alert('Propuesta fue actualizada exitosamente!');
    	}.bind(this),
    	error: function(xhr, status, err) {
				alert('Error actualizando la fecha de la propuesta.');
     		console.log(err);
    	}.bind(this)
	  });
	}

	_showAttachedImages() {
		$.ajax({
    	url: `/api/proposals/get/attachedImages/${this.state.id}`,
    	type: 'GET',
    	cache: false,
    	success: function(data) {
				console.log(data);
				if (data.length === 0) this.setState({attachedImage: 'No hay imágenes añadidas.'}); 
				else this.setState({attachedImage: data});
    	}.bind(this),
    	error: function(xhr, status, err) {
				alert('Error mostrando imágenes añadidas.');
     		console.log(err);
    	}.bind(this)
	  });
	}

	render() {
		let areaDesc = this.props.areas[Number(this.state.area)] ? this.props.areas[Number(this.state.area)].description : '' ;
		let qsAndAs = [];
		let statusLabel = '';
		let buttonStatusText = '';
		let pdfParameters = this.state;
		let stringifiedState = '';
		let counter = 1;

		switch (this.state.status) {
			case 0:
				buttonStatusText = 'Marcar como "Enviada al fixer"';
				statusLabel = 'Propuesta no ha sido enviada al fixer';
				break;
			case 1:
				buttonStatusText = 'Marcar como "Aún no ha sido enviada al fixer"';
				statusLabel = 'El fixer ha sido notificado';
				break;
			default:
				buttonStatusText = 'Error: status desconocido';
				statusLabel = 'Error: status desconocido';
				break;
		}

		if (this.props.addQuestionsTxt) {
			this.props.addQuestionsTxt.map((question) => { 
				if (Number(question.proposal_id) === Number(this.props.id)) {
					pdfParameters[`qt${counter}`] = question.question;
					pdfParameters[`at${counter}`] = question.answer;
					counter++;
					qsAndAs.push({ q: question.question, a: question.answer, type: 'txt' });
				}
			});
		}
		
		if (this.props.addQuestionsImage) {
			this.props.addQuestionsImage.map((question) => { 
				if (Number(question.proposal_id) === Number(this.props.id)) {
					pdfParameters[`qt${counter}`] = question.question;
					pdfParameters[`at${counter}`] = question.answer;
					counter++;
					qsAndAs.push({ q: question.question, a: question.answer, type: 'upload' });
				}
			});
		}

		if (this.state.dates){
			this.state.dates.map((date, index) => {
				pdfParameters[`date${index}`] = date;
			});
		}

		let attachedImageComponent = null;
		if (this.state.attachedImage) {
			if(this.state.attachedImage === 'No hay imágenes añadidas.') {
				attachedImageComponent = <h4>No hay imágenes añadidas.</h4>
			} else if(this.state.attachedImage.length > 0){
				const image = 'data:image/png;base64,' + arrBuffToBase64(this.state.attachedImage[0].answer.data);
	      attachedImageComponent = <img height='80px' widt='80px' src={image} alt='image'/>
			}
		}

		pdfParameters.numberOfQs = counter;
		stringifiedState = qs.stringify(pdfParameters);

		return(
			<div>
				<Button onClick={() => this.setState({ open: !this.state.open })}>
         	{this.state.id + '.) ' + this.state.u_firstname + ' ' + this.state.u_lastname + ', ' + this.state.category}
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
				         <Table responsive striped={false} bordered={true} hover={false}>
										<tbody>
											<tr>
												<th>Fecha</th>
												<th>Hora</th>
												<th>Seleccionada</th>
											</tr>	
										{this._displayProposedDates()}
										</tbody>
									</Table>
				      </Col>
				    </FormGroup>

						<FormGroup>
							<Col componentClass={ControlLabel} sm={2}>
				        Fecha seleccionada
				      </Col>
							<Col sm={6}>
				        <RadioGroup
									className={s.radioGroup}
									name="selectedDateForm"
									selectedValue={this.state.selectedDate}
									onChange={this._handleChange.bind(this)}
								>
								{this._renderDateSelectionForm()}
								</RadioGroup>
								<Button onClick={this._updateSelectedDate.bind(this)}>Actualizar</Button>
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

				    <FormGroup controlId="formControlsId">
				      <Col componentClass={ControlLabel} sm={2}>
				        Fecha de creación
				      </Col>
				      <Col sm={6}>
				        <FormControl value={this.state.created_at} type="text" placeholder="fecha de creación" disabled/>
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
				    <FormGroup controlId="formUserId">
				      <Col componentClass={ControlLabel} sm={2}>
				        Estado de propuesta
				      </Col>
				      <Col sm={6}>
				        <FormControl value={statusLabel} type="text" placeholder="estado de propuesta" disabled/>
				      </Col>
				    </FormGroup>
				  </Form>
					{attachedImageComponent}
				  <Row className={s.row}>
			      <Col sm={10}>
			      	<ul className={cx(s.noListStyle)}>
								<li className={cx(s.inline)}>
									<Button onClick={this._showAttachedImages.bind(this)}>
										Mostrar Imagen 
									</Button>
					      </li>
			      		<li className={cx(s.inline)}>
			      			<a href={`/pdf/pdfGenerator?${stringifiedState}`}>
						        <Button>
									  	Exportar a PDF
									  </Button>
								 	</a>
					      </li>
					      <li className={cx(s.inline)}>
					        <Button onClick={this._updateProposalStatus.bind(this)}>
								  	{buttonStatusText}
								  </Button>
					      </li>
					      <li className={cx(s.inline)}>
					        <Button bsStyle="danger" onClick={this._deleteProposalInDb.bind(this)}>
								  	Borrar
								  </Button>
					      </li>
			        </ul>
			      </Col>
		      </Row>
        </Panel>	
	    </div>
		);
	}
}

export default withStyles(s)(ProposalEdit);