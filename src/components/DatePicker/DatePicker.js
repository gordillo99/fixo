import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import DayPicker, { DateUtils } from 'react-day-picker';
//import s from './DatePicker.style';
import s from './DatePicker.css';

export default class DatePicker extends Component {
  
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
  }
  state = {
    selectedDay: null,
  };
  handleDayClick(e, day, { selected }) {
    this.setState({
      selectedDay: selected ? null : day,
    });
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

    const { selectedDay } = this.state;
    return (
      <div>
        <DayPicker
          selectedDays={day => DateUtils.isSameDay(selectedDay, day)}
          onDayClick={this.handleDayClick}
          locale='es' 
          localeUtils={ localeUtils }
          disabledDays={ DateUtils.isPastDay }
          selectedDays={day => DateUtils.isSameDay(selectedDay, day)}
        />
      </div>
    );
  }
}

export default withStyles(s)(DatePicker);

