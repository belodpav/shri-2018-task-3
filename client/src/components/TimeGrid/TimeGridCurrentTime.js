import React, { Component } from 'react';

const TimeGridCurrentTime = ({posLeft, time}) => (
	<span 
		style={{left: posLeft + '%'}}
		className="timegrid__current-time current-time-marker"
	>
		{time}
	</span>
);

export default TimeGridCurrentTime;