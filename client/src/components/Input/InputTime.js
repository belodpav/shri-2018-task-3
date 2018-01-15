import React, { Component } from 'react';

import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import './TimePicker.css';

import moment from 'moment';


class InputTime extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: this.props.date,
			focused: false
		};
		
	}

	disabledHours() {
		return [0, 1, 2, 3, 4, 5, 6, 7, 24];
	}
	
	render() {
		return (
			<div className={"input input_size_md input_theme_normal"}>
				<TimePicker
					//value={this.props.date}
					defaultValue={this.props.date}
					onChange={this.props.onChange}
					showSecond={false}
					disabledHours={this.disabledHours}
				/>
			</div>
		);
	}
}


export default InputTime;