import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Jumbotron, Button, Panel, Row, Col, Grid, FormControl } from 'react-bootstrap';
import { arrBuffToBase64 }from '../../helpers/helpers.js';
import FixerPanel from '../FixerPanel';
import $ from 'jquery';
import s from './FixerFinder.css';

export default class FixerFinder extends Component {

	constructor() {
		super();
		this.state = {
			selectedFixer: {},
			resultsTitle: "",
			showFixers: false,
			noResults: true,
			areas: null,
			selectedArea: null,
			fixers: []
		}
	}

	componentWillMount() {
		
	}

	_confirmFixerSelection(fixer, e) {
		this.props.changeFixer(fixer);
		this.props.toNextStage();
	}

	_updateFixers(e) {
		e.preventDefault();
		this.setState({showFixers: false, resultsTitle: <h1 className={cx(s.loadingTitle)}>Danos un ratito, estamos econtrando a los fixers más pilas...</h1>}, this._getFixersFromDB.bind(this));
	}

	_getFixersFromDB() {
		$.ajax({
			url: `/api/fixers/crud/${this.props.area}/${this.props.category}`,
			type: 'GET',
			dataType: 'json',
			cache: false,
			success: function(data) {
				let titleToShow = null;
				let noData = false;
				if (data.length === 0) {
					noData = true;
					titleToShow = <h1 className={cx(s.loadingTitle)}>Lo sentimos, no se encontraron resultados en tu área :(</h1>;
				}
				this.setState( { fixers: data, resultsTitle: titleToShow, noResults: noData, showFixers: true } );
			}.bind(this),
			error: function(xhr, status, err) {
				console.log(err);
			}.bind(this)
		});
	}

	render() {
		let fixerList = null;

		if (this.props.selectedArea !== null) {
			if (!this.state.showFixers) {
				fixerList = this.state.resultsTitle;
			} else {
				if (this.state.noResults) {
					fixerList = this.state.resultsTitle;
				}
				else {
					fixerList = <div>
									{this.state.fixers.map((fixer, index) => { return(
										<FixerPanel 
											key={`fixerPanel-${index}`}
											showReviews={true}
											fixer={fixer} 
											showSelected={true}
											confirmSelection={this._confirmFixerSelection.bind(this)}
											showConfirmBtn={true}
											selection={this.props.selection}
											category={this.props.category}
										/>
									)})}
								</div>
				}
			}
		} 
		
		return (
			<div>
				<Grid>
				  <Row className={s.row}>
				  	<Col md={6} xs={12} className={s.centerBlock}>
					  <h1>Elige un área para ver los fixers disponibles</h1>
					  <form>
					  	<Row className={s.centered}>
              				<Col md={8} xs={8}>
								<FormControl value={this.props.area ? this.props.area : 0} componentClass='select'onChange={this.props.updateArea.bind(this, 'area')}>
									{this.props.areas.map((opt, i) => { return <option key={'selOpt-' + i } value={opt.id}>{opt.description}</option> })}                      
								</FormControl>
							</Col>
							<Col md={4} xs={4}>
								<Button className={s.updateAreaBtn} bsStyle='primary' onClick={this._updateFixers.bind(this)} type="submit">
									Actualizar
								</Button>
							</Col>
					    </Row>
					  </form>
					  {fixerList}
					</Col>
				  </Row>
			  </Grid>
			</div>
		);
	}
}

export default withStyles(s)(FixerFinder);