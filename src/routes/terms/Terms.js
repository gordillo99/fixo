
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Jumbotron, Col, Row } from 'react-bootstrap';
import cx from 'classnames';
import s from './Terms.css';

function Terms(props, context) {

  return (
    <div className={s.root}>
      <div className={s.container}>
        <Jumbotron className={s.headerJumbotron}>
          <h1 className={cx(s.centeringDiv, s.pageHeader)}>Términos de servicio</h1>
        </Jumbotron>
        <Row className={s.row}>
          <Col md={6} xs={10} className={s.centerBlock}>
            <div className={s.centeringDiv}>
              <div className={cx(s.leftAlignedDiv)}>
                <h2 className={s.centeringDiv}>fixo es un prototipo</h2>
                <p>Es un prototipo así que no nos hacemos responsables por ningún tipo de falla.</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

Terms.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Terms);
