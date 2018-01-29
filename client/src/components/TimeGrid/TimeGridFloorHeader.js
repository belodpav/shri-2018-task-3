import React from 'react';
import TimeGrid from './TimeGrid';
import TimeGridColumn from './TimeGridColumn';

import {TIME_START, TIME_END} from '../../constants/constants';


const TimeGridFloorHeader = ({className, title}) => {
	const columnsList = [];
	for (let i =  TIME_START; i <= TIME_END; i++) {
		columnsList.push(
			<TimeGridColumn key={i} className="timegrid__column_border_false" />
		);
	}

	return (
		<TimeGrid className={className}>
			{columnsList}
			<div className="shortcut-item floor__shortcut-title">{ title }</div>
		</TimeGrid>
	);
};

export default TimeGridFloorHeader;