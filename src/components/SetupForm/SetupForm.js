import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { FormGroup, ControlLabel, FormControl, Button, Jumbotron, ButtonGroup } from 'react-bootstrap';
import s from './SetupForm.css';

export default class SetupForm extends Component {

  constructor(){
    super();
    let today = new Date();
    this.state = {
      address: '',
      date: today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(),
      morning: true
    };
  }

  _handleDayChange(date) {
    this.setState( { date: date } );
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
                <div >
                </div>
                <div className={classNames(s.centralizedDiv)}>
                  <div className={classNames(s.morningAfternoonButtons)}>
                    <ButtonGroup>
                      <Button disabled={this.state.morning}>Mañana</Button>
                      <Button disabled={!this.state.morning}>Tarde</Button>
                    </ButtonGroup>
                  </div>
                  <div className={classNames(s.dateDesc)}>
                    <p>
                      Ha seleccionado el {this.state.date} en la { (this.state.morning) ? 'mañana' : 'tarde' }
                    </p>
                  </div>
                  <Button type="submit" className={classNames(s.acceptBtn)}>
                    Aceptar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default withStyles(s)(SetupForm);