
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Jumbotron, Col, Row } from 'react-bootstrap';
import classNames from 'classnames';
import s from './About.css';

function About(props, context) {

  return (
    <div className={s.root}>
      <div className={s.container}>
        <Jumbotron className={s.headerJumbotron}>
          <h1 className={classNames(s.pageHeader, s.centeringDiv)}>Sobre fixo</h1>
        </Jumbotron>
        <Row className={s.row}>
          <Col md={6} xs={10} className={s.centerBlock}>
            <div className={s.leftAlignedDiv}>
              <div>
                <p className={s.topPadding}>fixo es una compañía dedicada a facilitar la búsqueda de personas para realizar trabajos en tu vivienda.</p>
                <br/>
                <p className={classNames(s.centeringDiv, s.boldedText)}>Equipo detrás de fixo</p>
                <Col md={6} mdOffset={3}>
                  <div className={s.leftAlignedDiv}>
                    <p>Desarrollador web: José Gordillo</p>
                    <p>Administrador general: Rafael Sologaistoa</p>
                    <p>Administrador de finanzas: Manuel Franco</p>
                  </div>
                </Col>
              </div>
            </div>
           </Col>
        </Row>
      </div>
    </div>
  );
}

About.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(About);
