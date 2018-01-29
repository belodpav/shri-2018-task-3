import React from 'react';
import './TimeGrid.css';


function TimeGrid({className, children}) {
	return (
		<div className={"timegrid " + className } >
			<div className="timegrid__offset-left"></div>
			<div className="timegrid__body">
				{children}
			</div>
			<div className="timegrid__offset-right"></div>
		</div>
	);
}

export default TimeGrid;

