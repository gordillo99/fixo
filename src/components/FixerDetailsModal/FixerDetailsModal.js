import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Modal, Button, Image, Table } from 'react-bootstrap';
import { arrBuffToBase64 } from '../../helpers/helpers.js';
import FixerReviewsDisplay from '../reviewComponents/FixerReviewsDisplay';
import s from './FixerDetailsModal.css';

export class FixerDetailsModal extends Component {

	_closeModal(event) {
		this.props.changeModalStatus(false);
	}

	render() {
		const Header = Modal.Header;
		const Title = Modal.Title;
		const Body = Modal.Body;
		const Footer = Modal.Footer;
		const fixer = this.props.fixer;
		console.log(fixer);
		return(
			<div>					
				<Header closeButton>
          <Title>Perfil de {fixer.firstname + ' ' + fixer.lastname}</Title>
        </Header>
        <Body>
          <div className={s.fixerPic} >
         		<Image src={'data:image/png;base64,' + arrBuffToBase64(fixer.profilepic.data)} responsive thumbnail/> 
          </div>

          <hr />

          <h4>Descripción</h4>
          <p>{fixer.description}</p>
          <h4>Información adicional</h4>
          <Table responsive striped={true} bordered={false} hover={false}>
				    <tbody>
				      <tr>
				        <th>Edad</th>
				        <td>{fixer.age}</td>
				      </tr>
				      <tr>
				        <th>Género</th>
				        <td>{(fixer.gender) ? 'hombre' : 'mujer'}</td>
				      </tr>
				      <tr>
				        <th>Calidad de servicio</th>
				        <td>{parseFloat(fixer.avg_rating).toFixed(1)} / 5</td>
				      </tr>
				      <tr>
				        <th>Número de reseñas</th>
				        <td>{fixer.num_ratings}</td>
				      </tr>
				    </tbody>
  				</Table>

        </Body>
        <Footer>
          <Button bsStyle='primary' onClick={this.props.close.bind(this)}>Cerrar</Button>
        </Footer>
		 	</div>
		);
	}
}

export default withStyles(s)(FixerDetailsModal);