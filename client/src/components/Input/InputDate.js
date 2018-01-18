import React, { Component } from 'react';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './SingleDatePicker.css';
 
import moment from 'moment';
 
import { IconCalendar } from '../Icon/Icon';

 class InputDate extends Component {
	constructor(props) {
		super(props);

		console.log(this.props.date.format('DD MMM'));
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
				<SingleDatePicker
				  date={this.props.date}
				  onDateChange={this.props.onDateChange}
				  focused={this.state.focused}
				  onFocusChange={({ focused }) => this.setState({ focused })}
				  numberOfMonths={1}
				  readOnly={true}
				  daySize={this.getDayItemWidth()}
				  displayFormat="D MMMM, YYYY"
				  hideKeyboardShortcutsPanel={true}
				/>
				<IconCalendar onClick={this.handleClick} className="input__clear" />
			</div>
		);
	}
}

export default InputDate;