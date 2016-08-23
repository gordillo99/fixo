import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { FormGroup, ControlLabel, FormControl, Button, Jumbotron, ButtonGroup, Row, Col } from 'react-bootstrap';
import DatePicker from './../DatePicker';
import s from './SetupForm.style';

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

  _createSelectTimeForms() {
    const hoursArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const minsArray = ['00', '30'];

    return this.props.dates.map((date, index) => {
      return(
        <Row className={s.row}>
         <Col md={3} xs={3} className={s.colStyle}>
            <p className={s.chosenDate}>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</p>
          </Col>
          <Col md={3} xs={3}>
            <FormControl value={this.props.times[index]} componentClass='select' onChange={this.props.updateDateArray.bind(this, 'times', index)}>
              {hoursArray.map((opt, i) => { return <option key={'selOptTime-' + i} value={opt}>{opt}:</option> })}                   
            </FormControl>
          </Col>
          <Col md={3} xs={3}>
            <FormControl value={this.props.mins[index]} componentClass='select' onChange={this.props.updateDateArray.bind(this, 'mins', index)}>
              {minsArray.map((opt, i) => { return <option key={'selOptMins-' + i} value={opt}>{opt}</option> })}                      
            </FormControl>
          </Col>
          <Col md={3} xs={3}>
            <FormControl value={this.props.ampm[index]} componentClass='select' onChange={this.props.updateDateArray.bind(this, 'ampm', index)}>
              <option value={'AM'}>AM</option>
              <option value={'PM'}>PM</option>               
            </FormControl>
          </Col>
        </Row>
      );
    });
  }

  render() {
    return (
      <div>
        <Jumbotron className={cx(s.stripeJumbotron)}>
          <div className={cx(s.root)}>
            <Row className={s.row}>
              <Col md={4} xs={12} className={s.centerBlock}>
                <div className={cx(s.formWrapper)}>
                  <h2 className={s.centralizedDiv}>Ingresa tus datos</h2>
                  <form>
                    <FormGroup validationState={this._getValidationStateOfPhone()} controlId="formControlsTextarea">
                      <FormControl onChange={this.props.updatePhone.bind(this, 'phone')} type="text" placeholder="Número de teléfono" />
                    </FormGroup>
                    <FormGroup validationState={this._getValidationStateOfEmail()} controlId="formControlsTextarea">
                      <FormControl onChange={this.props.updateEmail.bind(this, 'email')} type="text" placeholder="Correo electrónico" />
                    </FormGroup>
                    <FormGroup validationState={this._getValidationStateOfAddr()} controlId="formControlsText">
                      <FormControl value={this.props.address} onChange={this.props.updateAddress.bind(this, 'address')} type="text" placeholder="Dirección" />
                    </FormGroup>
                    <FormControl value={this.props.area} componentClass='select' onChange={this.props.updateArea.bind(this, 'area')}>
                      {this.props.areas.map((opt, i) => { return <option key={'selOpt-' + i} value={opt.id}>{opt.description}</option> })}                      
                    </FormControl>
                    <h2 className={s.centralizedDiv}>¿Qué fecha prefieres?</h2>
                    <div className={cx(s.datePicker)}>
                      <DatePicker
                        isSameDate={this.props.isSameDate}
                        dayChange={this.props.updateDay}
                        selectedDay={this.props.dates}
                      />
                    </div>
                    <div className={cx(s.centralizedDiv)}>
                      {this._createSelectTimeForms()}
                      <Button bsStyle='primary' onClick={this._confirm.bind(this)} type="submit" className={cx(s.acceptBtn)}>
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

/*  
<div className={cx(s.dateDesc)}>
    <p>
      {this.state.dates.map(date => {
        
      })}
      Ha seleccionado el {this.props.date.getDate() + '/' + (this.props.date.getMonth() + 1) + '/' + this.props.date.getFullYear()} en la { (this.props.morning) ? 'mañana' : 'tarde' }
    </p>
  </div>


*/