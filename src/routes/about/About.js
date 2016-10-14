
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Jumbotron, Col, Row, Media, Image } from 'react-bootstrap';
import rightImage from './images/right-new-image.png';
import leftImage from './images/left-new-image.png';
import josePic from './images/jj-pic.jpg';
import manuelPic from './images/meme-pic.jpg';
import rafaPic from './images/rafa-pic.png';
import programming from './images/programming.png';
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

  const profilePics = profileArray.map((profile, i) => {
    return (
      <li key={`profile-li-${i}`} className={s.inlineEles}>
        <Image key={`profile-img-${i}`} height='150px' width='150px' src={profile.pic} circle />
        <p key={`profile-name-${i}`} className={s.workerName}>{profile.name}</p>
        <p key={`profile-title-${i}`}>{profile.title}</p>
      </li>
    );
  });

  return (
    <div className={s.root}>
      <div className={s.container}>
        <Jumbotron className={s.headerJumbotron}>
          <h1 className={cx(s.pageHeader, s.centeringDiv)}>Sobre fixo</h1>
        </Jumbotron>
        <Row className={s.row}>
          <Col md={6} xs={10} className={s.centerBlock}>
            <div className={s.leftAlignedDiv}>
              <div>
                <div>
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
                          <p>{socialText}</p>
                        </Body>
                      </Media>
                    </div>
                  </div>
                  <div className={s.mobileVisible}>
                    <h2>Social</h2>
                    <p>{socialText}</p>
                    <h2>Servicio</h2>
                    <p>{serviceText}</p>
                  </div>
                </div>
                <br/>
                <div className={cx(s.centeringDiv)}>
                  <h4 className={cx(s.boldedText)}>Equipo</h4>
                  <p >¡Conoce al equipo detrás de fixo!</p>
                  <ul className={s.noListStyle}>
                    {profilePics}
                  </ul>
                </div>
                <br/>
                <div className={cx(s.centeringDiv)}>
                  <h4 className={cx(s.boldedText)}>Agradecimientos</h4>
                  <p>Agradecemos profundamente a <a href='https://www.facebook.com/JPGPhoto7/?hc_ref=NEWSFEED'>JPG Photography</a> por varias de las fotos en la página.</p>
                </div>
              </div>
            </div>
           </Col>
        </Row>
      </div>
    </div>
  );
}

export default withStyles(s)(About);
