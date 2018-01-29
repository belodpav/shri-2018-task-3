import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import IconContainer from '../../containers/IconContainer/IconContainer';
import './InputDate.css';


class DatePickerButton extends Component {
  render() {
    return (
      <button
        className="input-date_size_md input-date__control"
        onClick={this.props.onClick}      
      >
        {this.props.valueN}
      </button>
   );
  }
}

 class InputDate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			date: this.props.date,
			focused: false
		};
		
	}
	getDayItemWidth() {
    const viewPortWidth = window.innerWidth;
    if (viewPortWidth >= 1280) return 24;
    return 36;
  }
	render() {
		return (
			<div className="input-date input-date_size_md input-date_theme_normal input-date_actions_true">
        <IconContainer
          cls="input-date__clear"
          type="calendar"
        />
				<DatePicker
          selected={this.props.date}
          onChange={this.props.onDateChange}
          monthsShown={1}
          popperPlacement={'bottom'}
          dateFormat="D MMMM, YYYY"
          customInput={<DatePickerButton valueN={this.props.date.format('D MMMM, YYYY')} />}
        />
			</div>
		);
	}
}

export default InputDate;