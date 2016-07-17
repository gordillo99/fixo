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
						<Button bsStyle='primary' onClick={this._createProposal.bind(this, sel)} className={classNames(s.confirmBtn)}>Informar al fixer</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(s)(ProposalConfirmation);