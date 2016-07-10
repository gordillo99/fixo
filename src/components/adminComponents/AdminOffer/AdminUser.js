import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Form, FormControl, FormGroup, Col, ControlLabel, Button, HelpBlock} from 'react-bootstrap';
import { arrBuffToBase64 } from '../../../helpers/helpers.js';
import $ from 'jquery';
import s from './FixerEdit.css';

export default class FixerEdit extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {

	}
}

export default withStyles(s)(FixerEdit);