import React, { Component } from 'react';
import './DateControl.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

import CircleButtonContainer from '../../containers/CircleButtonContainer/CircleButtonContainer';
 
class DatePickerButton extends Component {
    
  render() {
    return (
      <button
        className="react-datepicker__open-btn"
        onClick={this.props.onClick}      
      >
        <span className="">{this.props.valueN}</span>
        <span className="react-datepicker__open-btn-week-day">{this.props.valueW}</span>
      </button>
   );
  }
}

const DateControl = (props) => {

  const {
    className,
    date,
    dateStr,
    dateStrDay,
    popperPlacement,
    numberOfMonths,
    onClickPrevDate,
    onClickNextDate,
    onChange,
    onFocus,
    onBlur } = props;

  return (
		<div className={className}>
			<CircleButtonContainer 
        size='lg'
        hasIcon={true}
        iconType='arrow-left'
        onClick={onClickPrevDate}
      />
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
          customInput={<DatePickerButton valueN={dateStr} valueW={dateStrDay} />}   
        />
      </div>
      <CircleButtonContainer
        size='lg'
        hasIcon={true}
        iconType='arrow-right'
        onClick={onClickNextDate}
      />
		</div>
  );

}


export default DateControl;
