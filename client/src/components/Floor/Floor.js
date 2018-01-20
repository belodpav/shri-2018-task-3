import React, { Component } from 'react';
import './Floor.css';
import RoomRowContainer from '../../containers/RoomRowContainer/RoomRowContainer';
import TimeGridFloorHeader from '../TimeGrid/TimeGridFloorHeader';


const Floor = ({ number, rooms}) => {

	return (
		<div className="floor">
			<div className="floor__header">
				<div className="floor__header-aside">
					<div className="floor__title">{number} этаж</div>
				</div>
				<TimeGridFloorHeader className="floor__header-timegrid" title={number + " этаж"} />
			</div>
			<div className="floor__rooms-list">
				{
					rooms.map( (room, index) => {
						return (
							<RoomRowContainer 
								cls="floor__room"
								key={index}
								id={room.id}
								name={room.title}
								capacity={room.capacity}
							/>
						);
					})
				}
			</div>
		</div>

	);
}

export default Floor;


