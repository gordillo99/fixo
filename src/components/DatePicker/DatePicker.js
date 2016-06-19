import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import DayPicker, { DateUtils } from 'react-day-picker';
import s from './DatePicker.style';

export default class DatePicker extends Component {
  
  constructor(props) {
    super(props);
    selectedDay: this.props.selectedDay
  }
  
  _handleDayClick(e, day) {
    this.props.dayChange(day);
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
      "en": 0
    };

    let localeUtils = {
      formatDay: (d, locale='es') => `${WEEKDAYS_LONG[locale][d.getDay()]}, ${d.getDate()} ${MONTHS[locale][d.getMonth()]} ${d.getFullYear()}`,
      formatMonthTitle: (d, locale='es') => `${MONTHS[locale][d.getMonth()]} ${d.getFullYear()}`,
      formatWeekdayShort: (i, locale='es') => WEEKDAYS_SHORT[locale][i],
      formatWeekdayLong: (i, locale='es') => WEEKDAYS_LONG[locale][i],
      getFirstDayOfWeek: (locale='en') => FIRST_DAY[locale]
    };

    return (
      <div>
        <DayPicker 
          onDayClick={ this._handleDayClick.bind(this) } 
          locale='es' 
          localeUtils={ localeUtils }
          disabledDays={ DateUtils.isPastDay }
          firstDayOfWeek={0}
        />

      </div>
    )
  }
}

export default withStyles(s)(DatePicker);

