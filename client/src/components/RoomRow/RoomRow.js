import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RoomRow.css';

import { connect } from 'react-redux';

import TimeGridRoomRowLayer1 from '../TimeGrid/TimeGridRoomRowLayer1';
import TimeGridRoomRowLayer2 from '../TimeGrid/TimeGridRoomRowLayer2';

import Meeting from '../Meeting/Meeting';
import FreeTimeRange from '../FreeTimeRange/FreeTimeRange';

import {TIME_START, TIME_END} from '../../constants/constants';

import moment from 'moment';


const RoomRow = (props) => {
	let eventElements = [];
	let isFreeTime = false;
	const { diagram } = props.diagram;

	if (diagram.hasOwnProperty(props.id)) {
		eventElements = diagram[props.id];
	} 
	const diagramItems = eventElements.map( event => {
		if (event.event.id) {
			return <Meeting event={event.event} key={event.event.dateStart.valueOf()} width={event.width + '%'} />
		} else {
			isFreeTime = true;
			return <FreeTimeRange event={event.event} key={event.event.dateStart.valueOf()} width={event.width + '%'} />
		}
	});

	const {room} = props.storeEvents.activeEvent;
	const isActiveTooltip = props.tooltip.isActive;
	const isActive = (isActiveTooltip && room && room.id === props.id) ? true : false;


	
	return (
		<div className={"room-row " + 
				(isActive ? "room-row_state_active " : "") +
				(!isFreeTime ? "room-row_state_full " : "") + props.className}
		>
			<div className="room-row__aside">
				<div className="room-row__title">{props.name}</div>
				<div className="room-row__people-count">{getStringCapacity(props.capacity)}</div>
			</div>
			<div className="room-row__main">
				<TimeGridRoomRowLayer1 className="room-row__timegrid_layer_1 room-row__timegrid app__timegrid">
					<div className="room-row__meeting-back">
						{ diagramItems }
					</div>
					<div className="shortcut-item room-row__shortcut-title">{props.name}</div>
				</TimeGridRoomRowLayer1>
				<TimeGridRoomRowLayer2 className="room-row__timegrid_layer_2 room-row__timegrid">
					{ diagramItems }
				</TimeGridRoomRowLayer2>

			</div>
		</div>
	);
};

RoomRow.propTypes = {
	name: PropTypes.string.isRequired,
	capacity: PropTypes.number.isRequired,
	events: PropTypes.array.isRequired
};

function mapStateToProps (state) {
  return {
    diagram: state.diagram,
    tooltip: state.tooltip,
    storeEvents: state.events
  }
}

export default connect(mapStateToProps)(RoomRow);

function getStringCapacity(capacity) {
	if (capacity > 30) return 'более 30 человек';
	if (capacity >= 20) return '20 — 30 человек';
	if (capacity > 10) return 'до 20 человек';
	if (capacity > 6) return 'до 10 человек';
	if (capacity >= 3) return '3 — 6 человек';
	return 'до 3 человек';
}


