import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { FormGroup, ControlLabel, FormControl, Button, Jumbotron, ButtonGroup } from 'react-bootstrap';
import DatePicker from './../DatePicker';
import s from './SetupForm.css';

export default class SetupForm extends Component {

  _getValidationStateOfAddr() {
    const length = this.props.address.length;
    if (length == 0) return 'error';
    return 'success';
  }

  _getValidationStateOfDetails() {
    const length = this.props.details.length;
    if (length == 0) return 'error';
    return 'success';
  }

  render() {
    return (
      <div>
        <Jumbotron className={classNames(s.stripeJumbotron)}>
          <div className={classNames(s.root)}>
            <div className={classNames(s.formWrapper)}>
              <form>
                <FormGroup validationState={this._getValidationStateOfAddr()} controlId="formControlsText">
                  <FormControl value={this.props.address} onChange={this.props.updateAddress} type="text" placeholder="Dirección" />
                </FormGroup>
                <FormGroup validationState={this._getValidationStateOfDetails()} controlId="formControlsTextarea">
                  <FormControl onChange={this.props.updateDetails} componentClass="textarea" placeholder="Detalles sobre el trabajo" />
                </FormGroup>
                <div className={classNames(s.datePicker)}>
                  <DatePicker
                    dayChange={this.props.updateDay}
                  />
                </div>
                <div className={classNames(s.centralizedDiv)}>
                  <div className={classNames(s.morningAfternoonButtons)}>
                    <ButtonGroup>
                      <Button 
                        onClick={this.props.updateTime} 
                        disabled={this.props.morning}>
                          Mañana
                      </Button>
                      <Button
                        onClick={this.props.updateTime}
                        disabled={!this.props.morning}>
                          Tarde
                      </Button>
                    </ButtonGroup>
                  </div>
                  <div className={classNames(s.dateDesc)}>
                    <p>
                      Ha seleccionado el {this.props.date} en la { (this.props.morning) ? 'mañana' : 'tarde' }
                    </p>
                  </div>
                  <Button onClick={this.props.toNextStage} type="submit" className={classNames(s.acceptBtn)}>
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