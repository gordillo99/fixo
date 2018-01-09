import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Jumbotron, Col, Row, Image } from 'react-bootstrap';
import cx from 'classnames';
import s from './Contact.css';
import fixo from './fixo.png';
import banner from './images/banner.png';
import bannermobile from './images/bannermobile.png';
import email from './images/correo.png';
import fb from './images/facebook.png';

function Contact(props, context) {

  const contactArray = [
    { desc: 'teayudamos@fixo.gt', pic: email, width: 60 },
    { desc: 'facebook.com/fixoempresa', pic: fb, width: 50 }
  ];

  const contactInfo = contactArray.map((contact, i) => {
    return (
      <li key={`contact-li-${i}`} className={s.inlineEles}>
        <Image key={`contact-img-${i}`} height={50} width={contact.width} src={contact.pic} />
        <p key={`contact-name-${i}`} className={s.contactInfo}>{contact.desc}</p>
      </li>
    );
  });

  return (
    <div className={s.root}>
      <div className={s.container}>
        <img className={cx(s.stripeImage, s.mobileInvisible)} src={banner} />
        <img className={cx(s.stripeImage, s.mobileVisible)} src={bannermobile} />
          <div className={s.centeringDiv}>
            <ul className={cx(s.noListStyle, s.topPadding)}>
              {contactInfo}
            </ul>
          </div>
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