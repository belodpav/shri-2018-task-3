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



function normalize(min, max, x) {
  const hours = x.hour() - min;
  const minutes = x.minutes() + hours*60;
  return 100 * ( minutes / ( (max - min)*60 ) );
}


function getRoomDiagram(room, date, events) {
  let timeRanges = [];
  let lastEnd = moment([date.year(), date.month(), date.date(), 8, 0, 0, 0]);
  const dayEnd = moment([date.year(), date.month(), date.date(), 23, 0, 0, 0]);

  let start, end;
  if (events.length === 0) {
    timeRanges.push(
        {
          event: {
            title: '',
            dateStart: lastEnd,
            dateEnd: dayEnd,
            room: room,
            users: []
          },
          width: 100
        }
    );
    return timeRanges;
  }
  events.forEach( event => {
    start = normalize(TIME_START, TIME_END, lastEnd);
    end = normalize(TIME_START, TIME_END, event.dateStart);
    if (end > start) {
      timeRanges.push(
        {
          event: {
            title: '',
            dateStart: lastEnd,
            dateEnd: event.dateStart,
            room: room,
            users: []
          },
          width: end - start
        }
      );
    }

    start = end;
    end = normalize(TIME_START, TIME_END, event.dateEnd);

    timeRanges.push(
      {
        event: event,
        width: end - start
      }
    );

    lastEnd = event.dateEnd;
  });

  start = normalize(TIME_START, TIME_END, lastEnd);
  end = normalize(TIME_START, TIME_END, dayEnd);

  if (start < end) {
    timeRanges.push(
      {
        event: {
          title: '',
          dateStart: lastEnd,
          dateEnd: dayEnd,
          room: room,
          users: []
        },
        width: end - start
      }
    );
  }

  return timeRanges;
}