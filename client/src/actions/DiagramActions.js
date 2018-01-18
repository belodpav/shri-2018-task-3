import * as types from '../constants/ActionTypes';
import moment from 'moment';
import {TIME_START, TIME_END} from '../constants/constants';

export function getDiagramData() {
  return (dispatch, getState) => {
    const diagram = {};
    const date = getState().date.date;
    const eventsByRoomId = getState().events.events;
    const rooms = getState().rooms.rooms;

    rooms.forEach( room => {
      const key = room.id;
      let roomDiagram, roomEvents;

      if (eventsByRoomId.hasOwnProperty(key)) {
        roomEvents = eventsByRoomId[key];
      } else {
        roomEvents = [];
      }

      roomDiagram = getRoomDiagram(room, date, roomEvents);

      diagram[key] = roomDiagram;
    });

    dispatch({
      type: types.GET_DIAGRAM_DATA,
      payload: diagram
    });
  }
}


function getSlot(event, width) {
  return {
    event: event,
    width: width
  }
}


function getFreeSlots(dateStart, dateEnd, room) {
  const freeSlots = [];
  let oldStart = dateStart.clone();
  let newStart = dateStart.clone();
  let event, width;

  newStart.add(1,'hour');
  newStart.set('minute',0);

  while(newStart.isBefore(dateEnd)) {
    event = getFreeEvent(oldStart, newStart, room);
    width = getWidth(oldStart, newStart);

    freeSlots.push(getSlot( event, width ));
  
    oldStart = newStart.clone();
    newStart.add(1,'hour');
  }

  event = getFreeEvent(oldStart, dateEnd, room);
  width = getWidth(oldStart, dateEnd);

  freeSlots.push(getSlot( event, width ));

  return freeSlots;
}

function getFreeEvent(dateStart, dateEnd, room) {
  return {
    title: '',
    dateStart: dateStart.clone(),
    dateEnd: dateEnd.clone(),
    room: room,
    users: []
  }
}

function getWidth(dateStart, dateEnd) {
  const start = normalize(TIME_START, TIME_END, dateStart);
  const end = normalize(TIME_START, TIME_END, dateEnd);

  return end - start;
}

function normalize(min, max, x) {
  const hours = x.hour() - min;
  const minutes = x.minutes() + hours*60;
  return 100 * ( minutes / ( (max - min)*60 ) );
}


function getRoomDiagram(room, date, events) {
  let timeRanges = [];
  let lastEnd = moment([date.year(), date.month(), date.date(), 8, 0, 0, 0]);
  const dayEnd = moment([date.year(), date.month(), date.date(), 23, 0, 0, 0]);
  let start, end, width;

  if (events.length === 0) {
    timeRanges.push(...getFreeSlots( lastEnd, dayEnd, room ));
    return timeRanges;
  }

  events.forEach( event => {
    width = getWidth(lastEnd, event.dateStart);

    if (width > 0) {
      timeRanges.push(...getFreeSlots( lastEnd, event.dateStart, room ));
    }

    width = getWidth(event.dateStart, event.dateEnd);
    timeRanges.push(getSlot( event, width ));

    lastEnd = event.dateEnd;
  });

  width = getWidth(lastEnd, dayEnd);

  if (width > 0) {
    timeRanges.push(...getFreeSlots( lastEnd, dayEnd, room ));
  }

  return timeRanges;
}