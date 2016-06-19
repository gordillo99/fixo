import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Jumbotron, Button, Panel } from 'react-bootstrap';
import $ from 'jquery';
import s from './FixerFinder.css';

export default class FixerFinder extends Component {

	constructor() {
		super();
		this.state = {
			fixers: [],
			selectedFixer: {}
		}
	}

	componentWillMount() {
		$.ajax({
	      	url: '/api/fixers/crud',
	      	type: 'GET',
	      	dataType: 'json',
	      	cache: false,
	      	success: function(data) {
	      		data.map((fixer) => fixer['selected'] = false);
	      		this.setState( { fixers: data } );
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
		this.setState(
			{ selectedFixer: fixer, 
			  fixers: updatedFixers }
		);
	}

	_validateFixerSelection(fixer) {
		if (!$.isEmptyObject(fixer)) {
			this.props.changeFixer(fixer);
			this.props.toNextStage();
		} else {
			alert('Por favor escoja un fixer.');
		}
	}

	// TODO: move to appropriate file
	_createFixer() {
		let info = {
			firstname: 'John',
			lastname: 'Smith',
			phone: '56457452',
			email: 'rafa@gmail.com',
			age: 22,
			gender: 0,
			profilepic: 'person.png',
			description: 'es un cabron el hijo de la gran'
		};

		$.ajax({
	      url: '/api/fixers/crud',
	      dataType: 'json',
	      type: 'POST',
	      data: info,
	      success: function(data) {
	        console.log('created fixer');
	      }.bind(this),
	      error: function(err) {
	        console.error(err.toString());
	        res.send(err);
	      }.bind(this)
	    });
	}

	_arrayBufferToBase64( buffer ) {
	    let binary = '';
	    let bytes = new Uint8Array( buffer );
	    let len = bytes.byteLength;
	    let i;
	    for (i = 0; i < len; i++) {
	        binary += String.fromCharCode(bytes[ i ]);
	    }
	    return window.btoa(binary);
	}

	//TODO: remove this <Button onClick={this._createFixer}>Add fixers</Button> 

	render() {
		let fixerList = <div>
							<h1>Selecciona a tu fixer</h1>
							{this.state.fixers.map( (fixer, index) => {return(
								<div onClick={this._setFixer.bind(this, fixer, index)} key={'fixer-' + index} className={classNames(s.resultsWrapper)}>
									<Panel bsStyle='primary' header={fixer.firstname + ' ' + fixer.lastname} className={classNames(s.panelStyle, (fixer.selected) ? s.selectedPanel : '')}>
									<ul className={classNames(s.noListStyle)}>
										<li className={classNames(s.inlineFixerEles)}>
									      <img 
									      	src={'data:image/png;base64,' + this._arrayBufferToBase64(fixer.profilepic.data)}
									      	height='50px'
									      	weight='50px'
									      	className={classNames(s.fixerImage)}
									      />
									   	</li>
									    <li className={classNames(s.inlineFixerEles)}>
									      <p>{fixer.description}</p>
									    </li>
								      </ul>
								    </Panel>
								</div>
							)})}
							<Button className={classNames(s.acceptButton)} onClick={this._validateFixerSelection.bind(this, this.state.selectedFixer)}>Confirmar fixer </Button>
						</div>
		let loadingScreen = <h1 className={classNames(s.loadingTitlte)}>Cargando datos...</h1>
		return (
			<div>
				{(this.state.fixers.length === 0) ? loadingScreen : fixerList}
			</div>
		);
	}
}

export default withStyles(s)(FixerFinder);