import React, { Component } from 'react';
import moment from 'moment';
import './DateControl.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SingleDatePicker.css';

import { CircleButtonLeft, CircleButtonRight } from '../CircleButton/CircleButton';

class DatePickerButton extends Component {
    
  render() {
    return (
      <button
        className="react-datepicker__open-btn"
        onClick={this.props.onClick}      
      >
        {this.props.value}
      </button>
   );
  }
}

const DateControl = (props) => {

  const {
    className,
    date,
    dateStr,
    popperPlacement,
    numberOfMonths,
    onClickPrevDate,
    onClickNextDate,
    onChange,
    onFocus,
    onBlur } = props;

  return (
		<div className={className}>
			<CircleButtonLeft onClick={onClickPrevDate} />
			 <div 
          onFocus={onFocus}
          onBlur={onBlur}
          className="date-control__date-calendar"
        >
          <DatePicker
            selected={date}
            onChange={onChange}
            monthsShown={numberOfMonths}
            popperPlacement={popperPlacement}    
          />
          <span className="date-control__date">{dateStr}</span>
        </div>
        	<CircleButtonRight onClick={onClickNextDate} />
		</div>
  );

}


export default DateControl;
