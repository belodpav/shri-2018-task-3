import React, { Component } from 'react';
import TimeGrid from './TimeGrid';
import TimeGridColumn from './TimeGridColumn';

import {TIME_START, TIME_END} from '../../constants/constants';


const TimeGridRoomRowLayer2 = ({children, className}) => {
	return (
		<TimeGrid className={className}>
			<div className="room-row__meetings">
				{children}
			</div>
		</TimeGrid>
	);
};

export default TimeGridRoomRowLayer2;