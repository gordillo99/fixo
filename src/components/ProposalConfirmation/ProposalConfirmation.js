import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Jumbotron, Button, Panel, Row, Col } from 'react-bootstrap';
import FixerPanel from '../FixerPanel';
import AnswersDisplay from '../questionComponents/AnswersDisplay';
import arrBuffToBase64 from '../../helpers/helpers.js';
import $ from 'jquery';
import s from './ProposalConfirmation.css';

export default class ProposalConfirmation extends Component {

	_createProposal(sel) {
		var image = false,
			object = sel.qsAndAs,
			stringQsAndAs = '',
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
				formData.append('date', (sel.date.getMonth() + 1) + '/' + sel.date.getDate() + '/' + sel.date.getFullYear());
				formData.append('morning', sel.morning ? 0 : 1);
				formData.append('qsAndAs', stringQsAndAs);
				formData.append('fixer_id', Number(sel.selectedFixer.id));
				formData.append('user_id', user.id);
				formData.append('area', sel.area);
				formData.append('category', this.props.category);
				formData.append('image', image);

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
	      	}.bind(this)
		    });
		    this.props.toNextStage();
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });
	}

	render() {
		let sel = this.props.selection;
		let areaDesc = sel.areas[Number(sel.area) - 1].description;
		return(
			<div className={cx(s.containerDiv)}>
				<div className={cx(s.leftAlignedDiv)}>
					<Row className={s.row}>
						<Col md={4} xs={10} className={s.centerBlock}>
							<h2 className={s.centeringDiv}>Confirma tu solicitud</h2>
							<div className={s.leftAlignedDiv}>
								<h3>Fixer seleccionado</h3>
								<FixerPanel fixer={sel.selectedFixer} showSelected={false} />
								<div className={s.leftAlignedDiv}>
									<h3>Dirección</h3>
									<p>{sel.address}</p>
									<h3>Área</h3>
									<p>{areaDesc}</p>
									<h3>Número de teléfono</h3>
									<p>{sel.phone}</p>
									<h3>Correo Electrónico</h3>
									<p>{sel.email}</p>
									<h3>Potencial fecha</h3>
									<p>{sel.date.toLocaleDateString('es') + ' en la ' + ((sel.morning) ? 'manaña' : 'tarde')}</p>
									<h3>Preguntas adicionales</h3>
									<AnswersDisplay qsAndAs={sel.qsAndAs} />
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