import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Jumbotron, Button, Panel, Row, Col } from 'react-bootstrap';
import { arrBuffToBase64 }from '../../helpers/helpers.js';
import FixerPanel from '../FixerPanel';
import $ from 'jquery';
import s from './FixerFinder.css';

export default class FixerFinder extends Component {

	constructor() {
		super();
		this.state = {
			fixers: [],
			selectedFixer: {},
			resultsTitle: <h1 className={cx(s.loadingTitle)}>Cargando datos...</h1>,
			noResults: true
		}
	}

	componentWillMount() {
		$.ajax({
			url: '/api/fixers/crud/' + this.props.area + '/' + this.props.category,
			type: 'GET',
			dataType: 'json',
			cache: false,
			success: function(data) {
				let titleToShow = null;
				let noData = false;
				data.map((fixer) => fixer['selected'] = false);
				if (data.length === 0) {
					noData = true;
					titleToShow = <h1 className={cx(s.loadingTitle)}>No se encontraron resultados.</h1>;
				}
				this.setState( { fixers: data, resultsTitle: titleToShow, noResults: noData } );
			}.bind(this),
			error: function(xhr, status, err) {
				console.log(err);
			}.bind(this)
		});
	}

	_setFixer(fixer, index) {
		let updatedFixers = this.state.fixers;
		updatedFixers.map( fixer => { fixer.selected = false; return fixer });
		updatedFixers[index].selected = true;
		this.setState({ 
			selectedFixer: fixer, 
			fixers: updatedFixers
		});
	}

	_validateFixerSelection(fixer) {
		if (!$.isEmptyObject(fixer)) {
			this.props.changeFixer(fixer);
			this.props.toNextStage();
		} else {
			alert('Por favor escoja un fixer.');
		}
	}

	render() {
		let fixerList = null;

		if (!this.state.noResults) {
			fixerList = <div>
							<h1>Selecciona a tu fixer</h1>
							{this.state.fixers.map( (fixer, index) => {return(
								<div onClick={this._setFixer.bind(this, fixer, index)} key={'fixer-' + index} className={cx(s.resultsWrapper)}>
									<FixerPanel showReviews={true} fixer={fixer} showSelected={true}/>
								</div>
							)})}
							<Button bsStyle='primary' className={cx(s.acceptButton)} onClick={this._validateFixerSelection.bind(this, this.state.selectedFixer)}>Confirmar fixer </Button>
						</div>
		}
		
		return (
			<div>
			  <Row className={s.row}>
			  	<Col md={4} xs={10} className={s.centerBlock}>
				  <div className={s.centeringDiv}>
					{this.state.resultsTitle}
					{fixerList}
				  </div>
				</Col>
			  </Row>
			</div>
		);
	}
}

export default withStyles(s)(FixerFinder);