import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RoomRow.css';

import TimeGridRoomRowLayer1 from '../TimeGrid/TimeGridRoomRowLayer1';
import TimeGridRoomRowLayer2 from '../TimeGrid/TimeGridRoomRowLayer2';


const RoomRow = (props) => {
	const {
		className,
		name,
		diagramItems,
		capacityStr
	} = props;

	return (
		<div className={className}>
			<div className="room-row__aside">
				<div className="room-row__title">{name}</div>
				<div className="room-row__people-count">{capacityStr}</div>
			</div>
			<div className="room-row__main">
				<TimeGridRoomRowLayer1 className="room-row__timegrid_layer_1 room-row__timegrid app__timegrid">
					<div className="room-row__meeting-back">
						{ diagramItems }
					</div>
					<div className="shortcut-item room-row__shortcut-title">{name}</div>
				</TimeGridRoomRowLayer1>
				<TimeGridRoomRowLayer2 className="room-row__timegrid_layer_2 room-row__timegrid">
					{ diagramItems }
				</TimeGridRoomRowLayer2>

			</div>
		</div>
	);
};


export default RoomRow;

