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

	render() {
		let sel = this.props.selection;
		return(
			<div className={classNames(s.containerDiv)}>
				<div className={classNames(s.leftAlignedDiv)}>
					<h1>Fixer seleccionado</h1>
					<FixerPanel fixer={sel.selectedFixer} showSelected={false} />
					<h1>Preguntas adicionales</h1>
					<AnswersDisplay qsAndAs={sel.qsAndAs} />
					<h1>Dirección</h1>
					<p>{sel.address}</p>
					<h1>Correo Electrónico</h1>
					<p>{sel.email}</p>
					<h1>Potencial fecha</h1>
					<p>{sel.date.toLocaleDateString('es') + ' en la ' + ((sel.morning) ? 'manaña' : 'tarde')}</p>
					<div className={classNames(s.confirmBtnWrapper)}>
						<Button onClick={this.props.toNextStage} className={classNames(s.confirmBtn)}>Confirmar propuesta</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(s)(ProposalConfirmation);