
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Jumbotron, Col, Row } from 'react-bootstrap';
import classNames from 'classnames';
import s from './Contact.css';

function Contact(props, context) {

  return (
    <div className={s.root}>
      <div className={s.container}>
        <Jumbotron className={s.headerJumbotron}>
          <h1 className={s.centeringDiv}>Contáctanos</h1>
        </Jumbotron>
        <Row>
          <Col sm={4} xsOffset={4}>
            <div className={s.centeringDiv}>
              <div className={classNames(s.leftAlignedDiv)}>
                <h2>¡Queremos escuchar de ti!</h2>
                <p>Si tienes dudas o comentarios por favor escríbenos. Apreciamos cualquier comentario que nos pueda ayudar a darte un mejor servicio. :)</p>
                <br/>
                <p className={classNames(s.centeringDiv, s.boldedText)}>Información de contacto</p>
                <p>Email: fixo.comercial@gmail.com</p>
                <p>Número de teléfono: 4586 8659</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

Contact.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Contact);
