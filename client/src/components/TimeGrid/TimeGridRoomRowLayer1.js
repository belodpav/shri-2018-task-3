import React, { Component } from 'react';
import TimeGrid from './TimeGrid';
import TimeGridColumn from './TimeGridColumn';

import {TIME_START, TIME_END} from '../../constants/constants';


const TimeGridRoomRowLayer1 = ({children, className, title}) => {
	const columnsList = [];
	for (let i =  TIME_START; i <= TIME_END - 1; i++) {
		columnsList.push(
			<TimeGridColumn key={i} />
		);
	}

	return (
		<TimeGrid className={className}>
			<div className="room-row__meetings">
				{columnsList}
				{children}
			</div>
			
			
		</TimeGrid>
	);
};

export default TimeGridRoomRowLayer1;