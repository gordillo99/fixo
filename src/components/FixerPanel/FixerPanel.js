import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Panel, Thumbnail, Button, Modal } from 'react-bootstrap';
import { arrBuffToBase64 } from '../../helpers/helpers.js';
import FixerReviewsDisplay from '../reviewComponents/FixerReviewsDisplay';
import FixerDetailsModal from '../FixerDetailsModal';
import s from './FixerPanel.css';

export default class FixerPanel extends Component {

	constructor() {
		super();
		this.state = {
			showModal: false
		};
	}

	_returnConfirmBtn() {
		if (this.props.showConfirmBtn) {
			return <Button bsStyle='primary' className={cx(s.acceptButton)} onClick={this.props.confirmSelection.bind(this, this.props.fixer)}>Confirmar fixer </Button>
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