import React, { Component } from 'react';
import TimeGrid from './TimeGrid';
import TimeGridColumn from './TimeGridColumn';
import TimeGridTime from './TimeGridTime';
import TimeGridCurrentTime from './TimeGridCurrentTime';

import {TIME_START, TIME_END} from '../../constants/constants';

import moment from 'moment';

class TimeLineRule extends Component {
	constructor(props) {
		super(props);

		const today = moment();
		
		this.state = {
			currentTime: today
		};
	}
	runClock() {
		this.setState({currentTime: moment()})
	}
	componentDidMount() {
		this.timeInterval = setInterval(() => {
			this.runClock();
		}, 1000)
	}
	componentWillUnmount() {
		clearInterval(this.timeInterval);
	}
	render() {
		let columnsList = [];
		const { date } = this.props;
		let normalizedTime = normalize(TIME_START, TIME_END, this.state.currentTime);

		const today = moment();
		let isToday = date.isSame(today, 'days');
		let isBefore = date.isBefore(today, 'days');

		columnsList.push(
			<TimeGridColumn key={TIME_START}>
				<TimeGridTime 
					timeWas={((isToday && this.state.currentTime.hour()) >= TIME_START || isBefore) ? true : false}
					value={'8:00'}
				/>
			</TimeGridColumn>
		);

		for (let i = TIME_START + 1; i <= TIME_END; i++) {
			const isPast =  ((isToday && this.state.currentTime.hour() >= i) || isBefore) ? true : false;
			columnsList.push(
				<TimeGridColumn key={i}>
					<TimeGridTime
						timeWas={isPast}
						value={i}
					/>
				</TimeGridColumn>
			);
		}


		return (
			<TimeGrid className={this.props.className}>
				{ isToday && normalizedTime >= 0 && normalizedTime <= 100 ?
					<TimeGridCurrentTime 
					posLeft={normalizedTime}
					time={this.state.currentTime.format('HH:mm')}
					/> : ""}
				{columnsList}
			</TimeGrid>
		);
	}
	
}

function normalize(min, max, x) {
	return 100 * (x.hour() + x.minutes() / 60 - min) / (max - min);
}

export default TimeLineRule;