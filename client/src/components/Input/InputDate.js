import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import IconContainer from '../../containers/IconContainer/IconContainer';


class DatePickerButton extends Component {
  render() {
    return (
      <button
        className="input_size_md input__control"
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
			<div className={"input input_size_md input_theme_normal" + (true ? " input_actions_true" : "") }>
				<DatePicker
          selected={this.props.date}
          onChange={this.props.onDateChange}
          monthsShown={1}
          popperPlacement={'bottom'}
          dateFormat="D MMMM, YYYY"
          customInput={<DatePickerButton valueN={this.props.date.format('D MMMM, YYYY')} />}
        />
				<IconContainer
          cls="input__clear"
          type="calendar"
          onClick={this.handleClick}
        />
			</div>
		);
	}
}

export default InputDate;