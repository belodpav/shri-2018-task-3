import React from 'react';

const TimeGridTime = ({timeWas, value}) => (
	<div 
		className={"timegrid__time" + (timeWas ?  " timegrid__time_past_true" : "")}
	>
		{value}
	</div>
);

export default TimeGridTime;