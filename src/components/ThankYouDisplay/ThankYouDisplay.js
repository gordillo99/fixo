import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Button } from 'react-bootstrap';
import DatePicker from './../DatePicker';
import s from './ThankYouDisplay.css';

export default class ThankYouDisplay extends Component {

  render() {

    return (
      <div>
        <h1 className={cx(s.headingDecoration)}>¡Gracias por usar fixo!</h1>
        <h4 className={cx(s.headingDecoration)}>
          El fixer que has escogido será notificado de esta propuesta. <br/>
          Te contactaremos por correo o teléfono.
        </h4>
        <Button bsStyle='primary'  className={cx(s.homeButton)} href='/'>Ir a la página principal</Button>
      </div>
    );
  }
}

export default withStyles(s)(ThankYouDisplay);