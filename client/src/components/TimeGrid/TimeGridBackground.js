import React from 'react';
import TimeGrid from './TimeGrid';
import TimeGridColumn from './TimeGridColumn';

import {TIME_START, TIME_END} from '../../constants/constants';

const TimeGridBackground = ({className}) => {
	const columnsList = [];
	for (let i =  TIME_START; i <= TIME_END; i++) {
		columnsList.push(
			<TimeGridColumn key={i} />
		);
	}

	return (
		<TimeGrid className={className}>
			{columnsList}
		</TimeGrid>
	);
};

export default TimeGridBackground;