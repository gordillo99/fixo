import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Jumbotron, Button, Panel, Row, Col, Table, HelpBlock, FormControl } from 'react-bootstrap';
import FixerPanel from '../FixerPanel';
import AnswersDisplay from '../questionComponents/AnswersDisplay';
import arrBuffToBase64 from '../../helpers/helpers.js';
import ProgressionStatus from './../../components/ProgressionStatus';
import { catEnglishToSpanish } from '../../helpers/helpers.js';
import $ from 'jquery';
import s from './ProposalConfirmation.style';

export class ProposalConfirmation extends Component {

	constructor() {
		super();
		this.state = {
			category: null,
			selection: null,
			fixer: null
		}
	}

	componentDidMount() {
		this.setState({
			category: localStorage.getItem('category'),
			selection: JSON.parse(localStorage.getItem('proposal')),
			fixer: localStorage.getItem('fixer')
		});
	}

	_updateAttachedImage(event) {
		let tempQsAndAs = this.state.selection.qsAndAs;
		tempQsAndAs.push({ q: 'Selecciona una imagen (opcional)', a: '', type: 'upload'});
		tempQsAndAs[tempQsAndAs.length - 1].a = $(event.target)[0].files[0];
		// if the image size is bigger than 2 MB, return
		if (tempQsAndAs[tempQsAndAs.length - 1].a.size > 200000) {
			alert('Este archivo no sera subido. El límite es 2 MB.');
			return;
		}
		//this.props.updateAnswers(tempQsAndAs);

	}

	_showProposedDates() {
		return this.state.selection.dates.map((date, index) => {
			const d = new Date(date);
			const formattedDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
			const time = this.state.selection.times[index];
			const mins = this.state.selection.mins[index];
			const ampm = this.state.selection.ampm[index];
			return (
				<tr>
					<td>{`${formattedDate}`}</td>
					<td>{`${time}:${mins} ${ampm}`}</td>
				</tr>
			)});
	}

	_createProposal(sel) {
		localStorage.removeItem('category');
		localStorage.removeItem('selection');
		localStorage.removeItem('fixer');

		var image = false,
			object = sel.qsAndAs,
			stringQsAndAs = '',
			datesObject = {},
			proposal_id = '';

		for (let property in object) {
			if (object.hasOwnProperty(property)) {
				if (object[property].type === 'upload') {
					image = object[property].a;
					delete object[property];
				} else {
					stringQsAndAs += object[property].q + '*' + object[property].a + '*';
				}
			}
		}

		stringQsAndAs = stringQsAndAs.slice(0,-1);

		sel.dates.map((date, index) => {
			const d = new Date(date);
			datesObject[index] = {
				date: `${(d.getMonth() + 1)}/${d.getDate()}/${d.getFullYear()}`,
				time: this.state.selection.times[index],
				mins: this.state.selection.mins[index],
				ampm: this.state.selection.ampm[index]
			};
		});

		$.ajax({
			url: '/getUserId',
			type: 'GET',
			dataType: 'json',
			cache: false,
			success: function(user) {
				var formData = new FormData();
					formData.append('address', sel.address);
					formData.append('phone', sel.phone);
					formData.append('email', sel.email);
					formData.append('dates', JSON.stringify(datesObject));
					formData.append('qsAndAs', stringQsAndAs);
					formData.append('fixer_id', Number(sel.selectedFixer.id));
					formData.append('user_id', user.id);
					formData.append('area', sel.area);
					formData.append('category', this.state.category);
					formData.append('image', image);

					if (!user.id) {
						alert('Por favor inicia sesión antes de crear una propouesta.');
						return;
					}

				$.ajax({
					url: '/api/proposals/crud/',
					type: 'POST',
					dataType: 'json',
					data: formData,
					cache: false,
					contentType: false,
						processData: false,
					success: function(data) {
						console.log('Proposal created successfully');
					}.bind(this),
					error: function(xhr, status, err) {
						console.log(err);
						alert('Error creando la propuesta. Por favor refresque la página y vuelva a intentar.');
					}.bind(this)
				});
				//this.props.toNextStage();
				window.location.replace(`/thankyou?category=${this.state.category}`);
			}.bind(this),
			error: function(xhr, status, err) {
				console.log(err);
			}.bind(this)
	  });
	}

	render() {
		if (!this.state.category || !this.state.fixer || !this.state.selection) return null; 
		let sel = this.state.selection;
		let areaDesc = sel.areas[Number(sel.area) - 1].description;
		return(
			<div className={cx(s.containerDiv)}>
				<div className={cx(s.leftAlignedDiv)}>
					<Jumbotron className={s.stripeJumbotron}>
						<h1 className={s.pageHeader}>{catEnglishToSpanish(this.state.category)}</h1>
						<div className={s.underline}/>
						<ProgressionStatus currentStage={3}/>
						<hr className={s.hrSeparator} />
					</Jumbotron>
					<Row className={s.row}>
						<Col md={4} xs={10} className={s.centerBlock}>
							<h2 className={s.centeringDiv}>Confirma tu solicitud</h2>
							<div className={s.leftAlignedDiv}>
								<h3>Fixer seleccionado</h3>
								<FixerPanel fixer={sel.selectedFixer} showSelected={false} confirmSelection={() => null} showConfirmBtn={false}/>
								<div className={s.leftAlignedDiv}>
									<h3>Dirección</h3>
									<p>{sel.address}</p>
									<h3>Área</h3>
									<p>{areaDesc}</p>
									<h3>Número de teléfono</h3>
									<p>{sel.phone}</p>
									<h3>Correo Electrónico</h3>
									<p>{sel.email}</p>
									<h3>Fechas propuestas</h3>
									<Table responsive striped={false} bordered={true} hover={false}>
										<tbody>
											<tr>
												<th>Fecha</th>
												<th>Hora</th>
											</tr>	
										{this._showProposedDates()}
										</tbody>
									</Table>
									<h3>Preguntas adicionales</h3>
									<AnswersDisplay qsAndAs={sel.qsAndAs} />
									<h3>Añade una imagen (opcional)</h3>
									<FormControl type="file" onChange={this._updateAttachedImage.bind(this)} />
                        			<HelpBlock>Tamaño máximo es 2 MB</HelpBlock>
									<div className={cx(s.confirmBtnWrapper)}>
										<Button bsStyle='primary' onClick={this._createProposal.bind(this, sel)} className={cx(s.confirmBtn)}>Informar al fixer</Button>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

export default withStyles(s)(ProposalConfirmation);