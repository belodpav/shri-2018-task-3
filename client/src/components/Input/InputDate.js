import React, { Component } from 'react';
 
import moment from 'moment';

import DatePicker from 'react-datepicker';
 
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
				<DatePicker
          selected={this.props.date}
          onChange={this.props.onDateChange}
          monthsShown={1}
          popperPlacement={'bottom-center'}
          dateFormat="D MMMM, YYYY"
        />
				<IconCalendar onClick={this.handleClick} className="input__clear" />
			</div>
		);
	}
}

export default InputDate;