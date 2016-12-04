
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Jumbotron, Col, Row, Media, Image } from 'react-bootstrap';
import rightImage from './images/right-new-image.png';
import leftImage from './images/left-new-image.png';
import josePic from './images/jj-pic.jpg';
import manuelPic from './images/meme-pic.jpg';
import rafaPic from './images/rafa-pic.png';
import programming from './images/programming.png';
import banner from './images/banner.png';
import bannermobile from './images/bannermobile.png';
import contract from './images/contract.png';
import worker from './images/worker.png';
import computer from './images/computer.png';
import cx from 'classnames';
import s from './About.css';

function About() {
  const Left = Media.Left;
  const Right = Media.Right;
  const Body = Media.Body;
  const Heading = Media.Heading;
  const MediaQuery = require('react-responsive');

  const socialText = 'Nos apasiona poder ayudar a los fixers a encontrar mejores oportunidades. Existimos para potenciar a individuos por medio del crowdsourcing.';
  const serviceText = 'Nuestro objetivo es que los servicios para el hogar sean lo más sencillo que puedan ser. ¡Estamos comprometidos con dar el mejor servicio para ti!';
  const technologyText = 'Nosotros nos enfocamos en crear un producto usando tecnología de punta. ¡Queremos crear un producto excelente para ti!';

  const profileArray = [
    { name: 'José Gordillo', pic: josePic, title: 'CTO' },
    { name: 'Rafael Sologaistoa', pic: rafaPic, title: 'CEO' },
    { name: 'Manuel Franco', pic: manuelPic, title: 'COO' },
  ];

  const descArary = [
    { title: 'Cuéntanos qué necesitas', desc1: 'Escoge la categoría apropiada.', desc2: 'Contesta unas preguntas sobre el trabajo.', pic: contract },
    { title: 'Compara fixers', desc1: 'Te mostramos fixers disponibles en tu área​.', desc2: 'Compara evaluaciones y perfiles de los fixers.', pic: computer },
    { title: 'Selecciona al fixer ideal', desc1: 'Te ponemos en contacto con el fixer​.', desc2: 'El fixer se encarga de todo.', pic: worker },
  ];

  const profilePics = profileArray.map((profile, i) => {
    return (
      <li key={`profile-li-${i}`} className={s.inlineEles}>
        <Image key={`profile-img-${i}`} height='200px' width='200px' src={profile.pic} circle />
        <p key={`profile-name-${i}`} className={s.workerName}>{profile.name}</p>
        <p key={`profile-title-${i}`} className={s.positionTitle}>{profile.title}</p>
      </li>
    );
  });

  const processDesc = descArary.map((desc, i) => {
    return (
      <li key={`desc-li-${i}`} className={s.leftAlignedDiv}>
        <ul key={`desc-ul-${i}`} className={cx(s.noListStyle)}>
          <li className={cx(s.inlineEles, s.centeringDiv)}>
            <div className={cx(s.descImg)}><Image key={`desc-img-${i}`} height='200px' width='200px' src={desc.pic} /></div>
          </li>
          <li className={s.inlineEles}>
            <ul className={cx(s.noListStyle)}>
              <li className={s.leftAlignedDiv}><h3 key={`desc-title-${i}`} className={s.positionTitle}>{desc.title}</h3></li>
              <li className={s.leftAlignedDiv}><p key={`desc1-${i}`} className={cx(s.workerName)}>{desc.desc1}</p></li>
              <li className={s.leftAlignedDiv}><p key={`desc2-${i}`} className={cx(s.workerName)}>{desc.desc2}</p></li>
            </ul>
          </li>
        </ul>
      </li>
    );
  });

  return (
    <div className={s.root}>
      <div className={s.container}>
        <img className={cx(s.stripeImage, s.mobileInvisible)} src={banner} />
        <img className={cx(s.stripeImage, s.mobileVisible)} src={bannermobile} />
          <div className={s.leftAlignedDiv}>
            <div>
              <br/>
              <div className={cx(s.centeringDiv)}>
                <h1>¿Cómo funciona fixo?</h1>
                <Col md={12} xs={12} className={s.centerBlock}>
                  <div className={s.leftAlignedDiv}>
                    <ul className={cx(s.leftAlignedDiv, s.noListStyle)}>
                      {processDesc}
                    </ul>
                  </div>
                </Col>
                <h1>Conoce a nuestro equipo</h1>
                <ul className={s.noListStyle}>
                  {profilePics}
                </ul>
              </div>
              <br/>
              <div className={cx(s.centeringDiv)}>
                <h1>Agradecimientos</h1>
                <p>Agradecemos profundamente a <a href='https://www.facebook.com/JPGPhoto7/?hc_ref=NEWSFEED'>JPG Photography</a> por varias de las fotos en la página.</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default withStyles(s)(About);


/*

<div className={s.mobileInvisible}>
  <div className={s.topMargin}>
    <Media>
      <Left>
        <img className={cx(s.textImage, s.hidden_xs)} width={250} height={150} src={leftImage} alt="Image"/>
      </Left>
      <Body>
        <Heading className={cx(s.boldedText)}>Social</Heading>
        <p>{socialText}</p>
      </Body>
    </Media>
    <Media>
      <Body>
        <Heading className={cx(s.boldedText)}>Servicio</Heading>
        <p>{serviceText}</p>
      </Body>
      <Right>
        <img className={cx(s.textImage, s.hidden_xs)} width={250} height={150} src={rightImage} alt="Image"/>
      </Right>
    </Media>
    <Media>
      <Left>
        <img className={cx(s.textImage, s.hidden_xs)} width={250} height={150} src={programming} alt="Image"/>
      </Left>
      <Body>
        <Heading className={cx(s.boldedText)}>Tecnología</Heading>
        <p>{technologyText}</p>
      </Body>
    </Media>
  </div>
</div>
*/