import moment from 'moment';

export default function getRecomendation(eventId, timeStart, timeEnd, members, rooms, events) {

  let usersSumWay = 0;

  let roomsAvailable;
  let recomendations = [];
  console.log(rooms);
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
 
    
  })

  roomsAvailable.forEach( (room) => {
    recomendations.push({room: room, sumWay: countUsersSumWay(members, room.floor) })
  });
  recomendations.sort( (a, b) => a.sumWay - b.sumWay );
  console.log(recomendations); 

  return recomendations;

}

function isCrossTimeRanges(timeStart, timeEnd, event) {
  if (   (timeStart.isBefore(event.dateStart) && timeEnd.isAfter(event.dateStart))
      || (timeStart.isBefore(event.dateEnd) && timeEnd.isAfter(event.dateEnd))
      || ((timeStart.isAfter(event.dateStart) || timeStart.isSame(event.dateStart))
       && (timeEnd.isBefore(event.dateEnd) || timeEnd.isSame(event.dateEnd)))
      /*|| (timeStart.isSame(event.dateStart) && timeEnd.isSame(event.dateEnd))*/
      ) {
    console.log(event,'in time ranges', timeStart.format('D HH:mm'), timeEnd.format('D HH:mm'));
      return true;
  }
  return false;
}

function countUsersSumWay(members, baseFloor) {
  return members.reduce( (sum, member) => {
          return sum + Math.abs(member.homeFloor - baseFloor)
  }, 0);
}


