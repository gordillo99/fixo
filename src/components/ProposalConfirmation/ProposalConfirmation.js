import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Jumbotron, Button, Panel } from 'react-bootstrap';
import FixerPanel from '../FixerPanel';
import AnswersDisplay from '../questionComponents/AnswersDisplay';
import arrBuffToBase64 from '../../helpers/helpers.js';
import $ from 'jquery';
import s from './ProposalConfirmation.css';

export default class ProposalConfirmation extends Component {

	_createProposal(sel) {
		let image = false,
			object = sel.qsAndAs,
			stringQsAndAs = '';
		for (let property in object) {
		    if (object.hasOwnProperty(property)) {
		        if (object[property].type === 'upload') {
		        	image = object[property].q+'*'+object[property].a;
		        	delete object[property];
		        } else {
		        	console.log(object[property].a);
		        	stringQsAndAs += object[property].q + '*' + object[property].a + '*';
		        }
		    }
		}

		stringQsAndAs = stringQsAndAs.slice(0,-1);
		console.log(sel);
		console.log(image);
		$.ajax({
	      	url: '/api/proposals/crud/',
	      	type: 'POST',
	      	dataType: 'json',
	      	data: {
	      		address: sel.address,
	      		phone: sel.phone,
	      		email: sel.email,
	      		date: (sel.date.getMonth() + 1) + '/' + sel.date.getDate() + '/' + sel.date.getFullYear(),
	      		morning: sel.morning ? 0 : 1,
	      		qsAndAs: stringQsAndAs,
	      		fixer_id: sel.selectedFixer.fixer_id,
	      		user_id: 1, //TODO: change later
	      		area: sel.area,
	      		image: image
	      	},
	      	cache: false,
	      	success: function(data) {
	      		console.log('Proposal created successfully');
	      	}.bind(this),
	      	error: function(xhr, status, err) {
	       		console.log(err);
	      	}.bind(this)
	    });
	    this.props.toNextStage();
	}

	render() {
		let sel = this.props.selection;
		let areaDesc = sel.areas[Number(sel.area) - 1].description;
		return(
			<div className={classNames(s.containerDiv)}>
				<div className={classNames(s.leftAlignedDiv)}>
					<h1>Fixer seleccionado</h1>
					<FixerPanel fixer={sel.selectedFixer} showSelected={false} />
					<h1>Dirección</h1>
					<p>{sel.address}</p>
					<h1>Área</h1>
					<p>{areaDesc}</p>
					<h1>Número de teléfono</h1>
					<p>{sel.phone}</p>
					<h1>Correo Electrónico</h1>
					<p>{sel.email}</p>
					<h1>Potencial fecha</h1>
					<p>{sel.date.toLocaleDateString('es') + ' en la ' + ((sel.morning) ? 'manaña' : 'tarde')}</p>
					<h1>Preguntas adicionales</h1>
					<AnswersDisplay qsAndAs={sel.qsAndAs} />
					<div className={classNames(s.confirmBtnWrapper)}>
						<Button bsStyle='primary' onClick={this._createProposal.bind(this, sel)} className={classNames(s.confirmBtn)}>Confirmar propuesta</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(s)(ProposalConfirmation);