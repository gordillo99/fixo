import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { FormGroup, ControlLabel, FormControl, Button, Jumbotron, ButtonGroup, Row, Col } from 'react-bootstrap';
import DatePicker from './../DatePicker';
import $ from 'jquery';
import s from './SetupForm.style';

export default class SetupForm extends Component {

  constructor() {
		super();
		this.state = {
			showModal: false,
			isLoggedIn: false
		};
	}

	 componentDidMount() {
		$.ajax({
			url: '/isLoggedIn',
			type: 'GET',
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({ isLoggedIn: data });
			}.bind(this),
			error: function(xhr, status, err) {
				console.log(err);
			}.bind(this)
		});
	}

  _getValidationStateOfAddr() {
    if (this.props.address.length === 0 || this.props.address.length > 255) return 'error';
    return 'success';
  }

  _getValidationStateOfPhone() {
    if (this.props.phone.length < 8 || this.props.phone.length > 20) return 'error';
    return 'success';
  }

  _getValidationStateOfEmail() {
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (this.props.email.length === 0 || !re.test(this.props.email) || this.props.email > 255) return 'error';
    return 'success';
  }

  _confirm(evt) {
    evt.preventDefault();
    
    if (!this._validatePhone(this.props.phone)) return;
    if (!this._validateEmail(this.props.email)) return;
    if (!this._validateAddress(this.props.address)) return;
    if (!this._validateDates()) return;
    
    //this.props.toNextStage();
    const sel = this.props.selection;
		sel.selectedFixer = this.props.fixer;
		localStorage.setItem('fixer', this.props.fixer.id);
		localStorage.setItem('proposal', JSON.stringify(this.props.selection));
		localStorage.setItem('category', this.props.category);
		if (this.state.isLoggedIn) window.location.replace('/confirmation');
		else window.location.replace('/login?redirectTo=confirmation');
  }

  _validatePhone(phone) {
    if (phone.length > 20) {
      alert('Por favor ingresar un número de teléfono con menos de 20 caracteres.');
      return false;
    }
    if (phone.length === 0) {
      alert('Por favor ingresar un número de teléfono.');
      return false;
    }
    return true;
  }

  _validateAddress(address) {
    if (address.length > 255) {
      alert('Por favor ingresar un dirección con menos de 255 caracteres.');
      return false;
    }
    if (address.length === 0) {
      alert('Por favor ingresar una dirección.');
      return false;
    }
    return true;
  }

  _validateEmail(mail) {
    if (mail.length > 255) {
      alert('Por favor ingresar un email con menos de 255 caracteres.');
      return false;
    }

    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(mail)) {
      return true;
    } else {
      alert('Tu email es inválido. Por favor ingresar un email válido.');  
      return false;  
    } 
  }

  _validateDates() {
    console.log("dates " + this.props.dates.length);
    if (this.props.dates.length < 3) {
      alert('Por favor seleccionar 3 fechas diferentes.');
      return false;
    }

    let i = 0;
    for (; i < this.props.dates.length ; i++) {
      if (this.props.ampm[i] === 'AM') {
        if (parseInt(this.props.times[i]) < 9 || parseInt(this.props.times[i]) > 11) {
          alert('Por favor seleccionar una hora entre 9 AM y 5 PM.');
          return false;
        }
      } else if (this.props.ampm[i] === 'PM') {
        if (parseInt(this.props.times[i]) > 5 && parseInt(this.props.times[i]) !== 12) {
          alert('Por favor seleccionar una hora entre 9 AM y 5 PM.');
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
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
                    <FormControl value={this.props.area} componentClass='select' disabled>
                      {this.props.areas.map((opt, i) => { return <option key={'selOpt-' + i} value={opt.id}>{opt.description}</option> })}                      
                    </FormControl>
                    <h2 className={s.centralizedDiv}>¿Cuándo debería llegar el fixer?</h2>
                    <h4 className={s.centralizedDiv}>Para asegurar que tu fixer esté disponible, escoge 3 fechas y, luego, te confirmaremos qué fecha escogió tu fixer.</h4>
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
