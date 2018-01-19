import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {TIME_START, TIME_END} from '../../constants/constants';
import Meeting from '../../components/Meeting/Meeting';
import FreeTimeRange from '../../components/FreeTimeRange/FreeTimeRange';
import RoomRow from '../../components/RoomRow/RoomRow';


class RoomRowContainer extends Component {

  getStringCapacity(capacity) {
    if (capacity > 30) return 'более 30 человек';
    if (capacity >= 20) return '20 — 30 человек';
    if (capacity > 10) return 'до 20 человек';
    if (capacity > 6) return 'до 10 человек';
    if (capacity >= 3) return '3 — 6 человек';
    return 'до 3 человек';
  }

  getDiagramItems = (roomId, diagram) => {
    let eventElements = [];
    let isFree = false;
    if (diagram.hasOwnProperty(roomId)) {
      eventElements = diagram[roomId];
    }

    const diagramItems = eventElements.map( event => {
        if (event.event.id) {
        return (
          <Meeting
            event={event.event}
            key={event.event.dateStart.valueOf()}
            width={event.width + '%'}
          />
          );
      } else {
        isFree = true;
        return (
          <FreeTimeRange
            event={event.event}
            key={event.event.dateStart.valueOf()}
            width={event.width + '%'}
            />
        );
      }
    });
  
    return {isFree: isFree, items: diagramItems};
  };
  

  render() {
    let className = 'room-row';
    let isFree, diagramItems;
    const { cls, id, name, capacity } = this.props;
    const { diagram } = this.props.diagram;
    const { getDiagramItems, getStringCapacity } = this;
    const { room } = this.props.storeEvents.activeEvent;
    const isActiveTooltip = this.props.tooltip.isActive;
    const roomData = getDiagramItems(id, diagram);
    const isActive = (isActiveTooltip && room && room.id === id) ? true : false;

    isFree = roomData.isFree;
    diagramItems = roomData.items;

    className += ' ' + cls;
    className += !isFree ? ' room-row_state_full' : '';
    className += isActive ? ' room-row_state_active' : '';

    return (
      <RoomRow
        className={className}
        name={name}
        capacityStr={getStringCapacity(capacity)}
        diagramItems={diagramItems}
      />

    );
  }
}

RoomRowContainer.propTypes = {
  name: PropTypes.string.isRequired,
  capacity: PropTypes.number.isRequired,
};

function mapStateToProps (state) {
  return {
    diagram: state.diagram,
    tooltip: state.tooltip,
    storeEvents: state.events
  }
}

export default connect(mapStateToProps)(RoomRowContainer);

