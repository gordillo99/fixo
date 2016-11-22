import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Panel, Thumbnail, Button, Modal } from 'react-bootstrap';
import { arrBuffToBase64 } from '../../helpers/helpers.js';
import FixerReviewsDisplay from '../reviewComponents/FixerReviewsDisplay';
import FixerDetailsModal from '../FixerDetailsModal';
import $ from 'jquery';
import s from './FixerPanel.style';

export default class FixerPanel extends Component {

	constructor() {
		super();
		this.state = {
			showModal: false,
			//isLoggedIn: false
		};
	}

	 /*componentDidMount() {
		$.ajax({
			url: '/isLoggedIn',
			type: 'GET',
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({ isLoggedIn: data });
			}.bind(this),
			error: function(xhr, status, err) {
				console.log(err);
			}.bind(this)
		});
	}*/

	_confirmSelection() {
		/*const sel = this.props.selection;
		sel.selectedFixer = this.props.fixer;
		localStorage.setItem('fixer', this.props.fixer.id);
		localStorage.setItem('proposal', JSON.stringify(this.props.selection));
		localStorage.setItem('category', this.props.category);
		if (this.state.isLoggedIn) window.location.replace('/confirmation');
		else window.location.replace('/login?redirectTo=confirmation');*/
		this.props.confirmSelection(this.props.fixer);
	}

	_returnConfirmBtn() {
		if (this.props.showConfirmBtn) {
			return <Button bsStyle='primary' className={cx(s.acceptButton)} onClick={this._confirmSelection.bind(this)}>Confirmar fixer </Button>
		}
		return null;
	}

	_updateModalStatus(status) {
		this.setStatus({ showModal: status });
	}

	_closeModal() {
	  this.setState({ showModal: false });
	}

  _openModal() {
    this.setState({ showModal: true });
  }

	_showModal() {
		const Header = Modal.Header;
		const Title = Modal.Title;
		const Body = Modal.Body;
		const Footer = Modal.Footer;

		return (
			<Modal show={this.state.showModal} onHide={this._closeModal.bind(this)}>
				<FixerDetailsModal fixer={this.props.fixer} close={this._closeModal.bind(this)}/>
			</Modal>
		);
	}

	render() {
		let showImage = null;
		if (this.props.fixer.profilepic) {
			showImage = 'data:image/png;base64,' + arrBuffToBase64(this.props.fixer.profilepic.data);
		}

		return(
			<div>					
			  <Thumbnail src={showImage} alt='242x200'>
			  	<h3>{this.props.fixer.firstname + ' ' + this.props.fixer.lastname}</h3>
			  	<div className={s.leftAlignedDiv}>
				  <p>{this.props.fixer.description}</p>
				</div>
			  	<FixerReviewsDisplay 
			  		showMoreReviews={this.props.showReviews}
			  		fixerRating={this.props.fixer.avg_rating}
			  		numRatings={this.props.fixer.num_ratings}
			  		fixerId={this.props.fixer.id}
			  	/>
			  	{this._returnConfirmBtn()}
			  	<Button bsStyle='info' className={cx(s.acceptButton)} onClick={this._openModal.bind(this)}>Ver más detalles </Button>
			  	{this._showModal()}
			  </Thumbnail>
		 	</div>
		);
	}
}

export default withStyles(s)(FixerPanel);