import React from 'react';
import TimeGrid from './TimeGrid';

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