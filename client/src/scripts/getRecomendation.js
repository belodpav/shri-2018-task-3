import moment from 'moment';

/**
 *
 * Returns available rooms in the timeRanges. 
 * The funtion doesn't try to transfer events.
 *
 * @param {Object} data
 * @return {[Room]} 
 */
export function getRecomendation(data) {
  const { eventId, timeStart, timeEnd, members, rooms, events } = data;
  let usersSumWay = 0;
  let roomsAvailable;
  let recomendations = [];

  roomsAvailable = getFreeRoomsInTimeRange(eventId, timeStart, timeEnd, members, rooms, events);

  roomsAvailable.forEach( (room) => {
    recomendations.push({room: room, sumWay: countUsersSumWay(members, room.floor) })
  });

  recomendations.sort( (a, b) => a.sumWay - b.sumWay ); 

  return recomendations;
}

/**
 *
 * Returns swap informations about transfreings if it is possible to transfer
 * events and get a free room. The funtion tries to transfer events between 
 * rooms in order to free a room.
 *
 * @param {Object} data
 * @return {[Object] || []} 
 */

export function getRecomendation__2(data) {
  const { eventId, timeStart, timeEnd, members, rooms, events } = data;
  let eventsCross = getEventsCrossTimeRange(eventId, timeStart, timeEnd, members, rooms, events);
  let eventsByRoom = toListByRoom(eventsCross);
  let unCrossedRoomsPairs = getUnCrossedRooms(rooms, eventsByRoom);
  let variants = [];
 
  unCrossedRoomsPairs.forEach( pair => {
    const first = getSwapObj(pair.roomA, pair.roomB, members, eventsByRoom, events);
    const second = getSwapObj(pair.roomB, pair.roomA, members, eventsByRoom, events); 

    if (first) variants.push(first);
    if (second) variants.push(second);
  });

  variants.sort( (a, b) => a.sumWay - b.sumWay );

  let thebest = variants[0];
  let newE, copy;
  if (thebest) {
    copy = eventsByRoom[thebest.freeRoom.id];
   newE = [...copy];

   for (let i = 0; i < newE.length; i++) {
      newE[i].room = thebest.targetRoom;
    }

    return [{room: thebest.freeRoom, changedEvents: newE }];
  } else {
    return [];
  }
       
}

/**
 * Returns an object with information about summary way,
 * target and origin rooms for events the script can replace
 *
 * @param {Room} targetRoom
 * @param {Room} freeRoom
 * @param {[User]} members
 * @param {Object} eventsByRoom
 * @param {[Event]} events
 * @return {Object}
 */
function getSwapObj(targetRoom, freeRoom, members, eventsByRoom, events) {
  const obj = {
    targetRoom: targetRoom,
    sumWay: 0,
    freeRoom: freeRoom
  };

  if (members.length > freeRoom.capacity) {
      return;
  }

  let sumWay = countUsersSumWay(members, freeRoom.floor);

  let roomList = eventsByRoom[freeRoom.id];
  for (let i = 0; i < roomList.length; i++) {
    let event = roomList[i];

    let roomsAvailable = getFreeRoomsInTimeRange(event.id, event.dateStart, event.dateEnd, members, [targetRoom], events);

    if (!roomsAvailable.length) {
      return;
    }

    sumWay += countUsersSumWay(event.users, targetRoom.floor)
  }

  obj.sumWay = sumWay;
  
  return obj;
}

/**
 * Conver array of event's objects to an object with events sorted by room's ID
 *
 * @param {[Event]} events
 * @retrun {Object}  
 */
function toListByRoom(events) {
  const eventsByRoomId = {};

  events.map( event => {
    const copyEvent = {...event};
    const roomId = copyEvent.room.id;
    if (eventsByRoomId[roomId]) {
      eventsByRoomId[roomId].push(copyEvent);
    } else {
      eventsByRoomId[roomId] = [copyEvent];
    }
  });
  
  return eventsByRoomId;
}

/**
 * Returns array of rooms for which function isCrossRooms returns False
 *
 * @param {[Room]} rooms - Array of rooms
 * @param {Object} events - An objects with Events sorted by room's ID within reseching time ranges
 * @retrun {[Room]} 
 */
function getUnCrossedRooms(rooms, events) {
  let swaps = [];
  for (let i = 0; i < rooms.length; i++) {
    for (let j = i + 1; j < rooms.length; j++) {
      if (!isCrossRooms(rooms[i],rooms[j],events)) {
        swaps.push({roomA: rooms[i], roomB: rooms[j]});
      }
    }
  }

  return swaps;
}

/**
 * Returns True if events in rooms A and B have crossings in time ranges.
 * Events here are from crossEvents array but like object by room IDs 
 *
 * @param {Room} roomA
 * @param {Room} roomB
 * @param {Object} - An objects with Events sorted by room's ID within reseching time ranges
 * @retrun {boolean} 
 */
function isCrossRooms(roomA, roomB, events) {
  let setA = events[roomA.id];
  let setB = events[roomB.id];

  if (!setA || !setB) return true;

  for(let j = 0; j < setA.length; j++) {
    let event = setA[j];
    for (let i = 0; i < setB.length; i++) {
      if (isCrossTimeRanges(event.dateStart, event.dateEnd, setB[i])) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Return free rooms within the timerange [timeStart, timeEnd] 
 *
 * @param {string} eventId - Event's ID
 * @param {Moment} timeStart
 * @param {Moment} timeEnd
 * @param {[User]} members
 * @param {[Room]} rooms
 * @param {Object} events - An objects with Events sorted by room's ID
 * @return {[Room]}
 */
function getFreeRoomsInTimeRange(eventId, timeStart, timeEnd, members, rooms, events) {
  let roomsAvailable;

  roomsAvailable = rooms.filter( room => {
    let roomEvents;
    if(room.capacity < members.length) {
      return false
    } 
    if (events.hasOwnProperty(room.id)) {
      roomEvents = events[room.id];

      for (let i = 0; i < roomEvents.length; i++) {
        if (roomEvents[i].id !== eventId && isCrossTimeRanges(timeStart, timeEnd, roomEvents[i])) {
          return false;
        }
      }
      return true;
    } else {
      return true;
    }
  });

  return roomsAvailable;
}


/**
 * Return events which cross the timerange [timeStart, timeEnd] 
 *
 * @param {string} eventId - Event's ID
 * @param {Moment} timeStart
 * @param {Moment} timeEnd
 * @param {[User]} members
 * @param {[Room]} rooms
 * @param {Object} events - An objects with Events sorted by room's ID
 * @return {Object} - An objects with Events sorted by room's ID
 */
function getEventsCrossTimeRange(eventId, timeStart, timeEnd, members, rooms, events) {
  let eventsCrossTimeRange = [];

  rooms.forEach( room => {
    let roomEvents;
    if (events.hasOwnProperty(room.id)) {
      roomEvents = events[room.id];

      for (let i = 0; i < roomEvents.length; i++) {
        if (roomEvents[i].id !== eventId && isCrossTimeRanges(timeStart, timeEnd, roomEvents[i])) {
          eventsCrossTimeRange.push(roomEvents[i]);
        }
      }
    }
     
  });

  return eventsCrossTimeRange;
}

/**
 * Returns True if the event crosses time range
 *
 * @param {Moment} timeStart - Start time of the time range
 * @param {Moment} timeEnd - End time of the time range
 * @param {Event} event
 * @return {Boolean}
 */
function isCrossTimeRanges(timeStart, timeEnd, event) {
  if (   (timeStart.isBefore(event.dateStart) && timeEnd.isAfter(event.dateStart))
      || (timeStart.isBefore(event.dateEnd) && timeEnd.isAfter(event.dateEnd))
      || ((timeStart.isAfter(event.dateStart) || timeStart.isSame(event.dateStart))
       && (timeEnd.isBefore(event.dateEnd) || timeEnd.isSame(event.dateEnd)))
      ) {
      return true;
  }
  return false;
}

/**
 * Returns summary way for certain members
 *
 * @param {[User]} members - An array of memeber's objects
 * @param {Number} baseFloor - Base floor all memebers will go to
 * @return {Number}
 */
function countUsersSumWay(members, baseFloor) {
  return members.reduce( (sum, member) => {
          return sum + Math.abs(member.homeFloor - baseFloor)
  }, 0);
}


