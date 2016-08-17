import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import DayPicker, { DateUtils } from 'react-day-picker';
import s from './DatePicker.style';

export default class DatePicker extends Component {
  
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: null,
    };
  }
  
  handleDayClick(e, day, { selected }) {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    if (day >= today) {
      this.setState({
        selectedDay: selected ? null : day
      });
      this.props.dayChange(day); 
    }
  }

  _disableDays(d) {
    var targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(0, 0, 0, 0);
    return d < targetDate;
  }

  render() {
    let WEEKDAYS_LONG = {
      "en": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "es": ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]
    };
    let WEEKDAYS_SHORT = {
      "en": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      "es": ["D", "L", "M", "M", "J", "V", "S"]
    };
    let MONTHS = {
      "en": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      "es": ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    };
    let FIRST_DAY = {
      "en": 0,
      "es": 0
    };

    let localeUtils = {
      formatDay: (d, locale='es') => `${WEEKDAYS_LONG[locale][d.getDay()]}, ${d.getDate()} ${MONTHS[locale][d.getMonth()]} ${d.getFullYear()}`,
      formatMonthTitle: (d, locale='es') => `${MONTHS[locale][d.getMonth()]} ${d.getFullYear()}`,
      formatWeekdayShort: (i, locale='es') => WEEKDAYS_SHORT[locale][i],
      formatWeekdayLong: (i, locale='es') => WEEKDAYS_LONG[locale][i],
      getFirstDayOfWeek: (locale='en') => FIRST_DAY[locale]
    };

    const { selectedDay } = this.state;

    return (
      <div>
        <DayPicker
          selectedDays={day => DateUtils.isSameDay(selectedDay, day)}
          onDayClick={this.handleDayClick}
          locale='es' 
          localeUtils={ localeUtils }
          disabledDays={ this._disableDays }
          selectedDays={day => DateUtils.isSameDay(selectedDay, day)}
        />
      </div>
    );
  }
}

export default withStyles(s)(DatePicker);

