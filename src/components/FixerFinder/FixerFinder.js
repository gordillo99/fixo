import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Jumbotron, Button, Panel, Row, Col, Grid } from 'react-bootstrap';
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
			url: `/api/fixers/crud/${this.props.area}/${this.props.category}`,
			type: 'GET',
			dataType: 'json',
			cache: false,
			success: function(data) {
				let titleToShow = null;
				let noData = false;
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

	_confirmFixerSelection(fixer, e) {
		this.props.changeFixer(fixer);
		this.props.toNextStage();
	}

	render() {
		let fixerList = null;

		if (!this.state.noResults) {
			fixerList = <div>
										<h1>Selecciona a tu fixer</h1>
										{this.state.fixers.map( (fixer, index) => {return(
											<FixerPanel 
												key={`fixerPanel-${index}`}
												showReviews={true}
												fixer={fixer} showSelected={true}
												confirmSelection={this._confirmFixerSelection.bind(this)}
												showConfirmBtn={true}
											/>
										)})}
									</div>
		}
		
		return (
			<div>
				<Grid>
				  <Row className={s.row}>
				  	<Col md={4} xs={12} className={s.centerBlock}>
					  <div className={s.centeringDiv}>
							{this.state.resultsTitle}
					  </div>
					  {fixerList}
					</Col>
				  </Row>
			  </Grid>
			</div>
		);
	}
}

export default withStyles(s)(FixerFinder);