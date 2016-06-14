import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { FormGroup, ControlLabel, FormControl, Button, Jumbotron } from 'react-bootstrap';
import s from './SetupForm.css';

export default class SetupForm extends Component {

  constructor(){
    super();
    this.state = {
      address: '',
      date: ''
    };
  }

  render() {
    return (
      <div>
        <Jumbotron className={classNames(s.stripeJumbotron)}>
          <div className={classNames(s.root)}>
            <div className={classNames(s.formWrapper)}>
              <form>
                <FormGroup controlId="formControlsText">
                  <FormControl type="text" placeholder="Dirección" />
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                  <FormControl componentClass="textarea" placeholder="Detalles sobre el trabajo" />
                </FormGroup>
                <Button type="submit">
                  Aceptar
                </Button>
              </form>
            </div>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default withStyles(s)(SetupForm);