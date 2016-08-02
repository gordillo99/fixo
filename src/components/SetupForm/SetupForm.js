import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { FormGroup, ControlLabel, FormControl, Button, Jumbotron, ButtonGroup, Row, Col } from 'react-bootstrap';
import DatePicker from './../DatePicker';
import s from './SetupForm.css';

export default class SetupForm extends Component {

  _getValidationStateOfAddr() {
    const length = this.props.address.length;
    if (length === 0) return 'error';
    return 'success';
  }

  _getValidationStateOfPhone() {
    const length = this.props.phone.length;
    if (length < 8) return 'error';
    return 'success';
  }

  _getValidationStateOfEmail() {
    const length = this.props.email.length;
    if (length === 0) return 'error';
    return 'success';
  }

  _confirm(evt) {
    evt.preventDefault();
    this.props.toNextStage();
  }

  render() {
    return (
      <div>
        <Jumbotron className={classNames(s.stripeJumbotron)}>
          <div className={classNames(s.root)}>
            <Row className={s.row}>
              <Col md={4} xs={10} className={s.centerBlock}>
                <div className={classNames(s.formWrapper)}>
                  <form>
                    <FormGroup validationState={this._getValidationStateOfPhone()} controlId="formControlsTextarea">
                      <FormControl onChange={this.props.updatePhone} type="text" placeholder="Número de teléfono" />
                    </FormGroup>
                    <FormGroup validationState={this._getValidationStateOfEmail()} controlId="formControlsTextarea">
                      <FormControl onChange={this.props.updateEmail} type="text" placeholder="Correo electrónico" />
                    </FormGroup>
                    <FormGroup validationState={this._getValidationStateOfAddr()} controlId="formControlsText">
                      <FormControl value={this.props.address} onChange={this.props.updateAddress} type="text" placeholder="Dirección" />
                    </FormGroup>
                    <FormControl value={this.props.area} componentClass='select' onChange={this.props.updateArea}>
                      {this.props.areas.map((opt, i) => { return <option key={'selOpt-' + i} value={opt.id}>{opt.description}</option> })}                      
                    </FormControl>
                    <div className={classNames(s.datePicker)}>
                      <DatePicker
                        dayChange={this.props.updateDay}
                        selectedDay={this.props.date}
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
                          Ha seleccionado el {this.props.date.getDate() + '/' + (this.props.date.getMonth() + 1) + '/' + this.props.date.getFullYear()} en la { (this.props.morning) ? 'mañana' : 'tarde' }
                        </p>
                      </div>
                      <Button bsStyle='primary' onClick={this._confirm.bind(this)} type="submit" className={classNames(s.acceptBtn)}>
                        Aceptar
                      </Button>
                    </div>
                  </form>
                </div>
              </Col>
            </Row>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default withStyles(s)(SetupForm);