
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Jumbotron, Col, Row } from 'react-bootstrap';
import cx from 'classnames';
import s from './Contact.css';
import fixo from './fixo.png';

function Contact(props, context) {

  return (
    <div className={s.root}>
      <div className={s.container}>
        <Jumbotron className={s.headerJumbotron}>
          <h1 className={cx(s.centeringDiv, s.pageHeader)}>Contáctanos</h1>
        </Jumbotron>
         <Row className={s.row}>
          <Col md={6} xs={10} className={s.centerBlock}>
            <div className={s.centeringDiv}>
              <div className={cx(s.leftAlignedDiv)}>
                <h2 className={s.centeringDiv}>¡Nos encanta escuchar tu opinión!</h2>
                <div className={s.centeringDiv}>
                  <img src={fixo} width={180} height={140} />
                </div>
                <p className={cx(s.centeringDiv, s.boldedText)}>Contáctanos: fixo.comercial@gmail.com</p>
                
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


/*
<div className={cx(s.leftAlignedDiv)}>
  <h2 className={s.centeringDiv}>¡Queremos escucharte!</h2>
  <p>Si tienes dudas o comentarios por favor escríbenos. Apreciamos cualquier comentario que nos pueda ayudar a darte un mejor servicio. :)</p>
  <br/>
  <p className={cx(s.centeringDiv, s.boldedText)}>Información de contacto</p>
  <Col md={6} mdOffset={3}>
    <p>Email: fixo.comercial@gmail.com</p>
  </Col>
</div>

<Col md={6} mdOffset={3}>
  <p>Email: fixo.comercial@gmail.com</p>
</Col>
*/