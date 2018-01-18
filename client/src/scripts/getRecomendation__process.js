import moment from 'moment';

export function getRecomendation(eventId, timeStart, timeEnd, members, rooms, events) {
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

export function getRecomendation__2(eventId, timeStart, timeEnd, members, rooms, events) {

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
    console.log(newE);
    return [{room: thebest.freeRoom, changedEvents: newE }];
  } else {
    return [];
  }
       
}


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

// events here are from crossEvents array but like object by room IDs 
function isCrossRooms(roomA, roomB, events) {
  console.log(roomA, roomB);
  let setA = events[roomA.id];
  let setB = events[roomB.id];

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

function countUsersSumWay(members, baseFloor) {
  return members.reduce( (sum, member) => {
          return sum + Math.abs(member.homeFloor - baseFloor)
  }, 0);
}


