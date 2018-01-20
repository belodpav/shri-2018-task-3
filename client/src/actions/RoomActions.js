import * as types from '../constants/ActionTypes';
import { getEvents } from '../actions/EventActions';
import { getUsers } from '../actions/UserActions';
import shortCutFollowActivate from '../scripts/shortCutFollow';
import moment from 'moment';

export function getRooms(dateRange) {
  return (dispatch) => {
    dispatch({
      type: types.GET_ROOMS_REQUEST
    });

    const url = '/graphgl?query={rooms{id,title,capacity,floor}}';
    fetch(url)
      .then(res => res.json())
      .then(response => {
        
        dispatch({
          type:types.SET_ROOMS,
          payload: response.data.rooms
        })

        const roomsByFloor = toListByFloor(response.data.rooms);

        dispatch({
          type: types.GET_ROOMS_SUCCESS,
          payload: roomsByFloor
        });

        dispatch({
          type:types.SET_FLOORS,
          payload: converToFloorList(roomsByFloor)
        })

        const startRange = dateRange.dateStart;
        const endRange = dateRange.dateEnd;
        
        // Activate ShortCuts names of rooms
        shortCutFollowActivate();

        dispatch(getEvents({start: startRange, end: endRange}, true));

        dispatch(getUsers());

      })
      .catch( error => {
        dispatch({
          type: types.GET_ROOMS_ERROR,
          payload: []
        })
      })
  }
}


function converToFloorList(roomsByFloor) {
  const floors = [];
  for (let key in roomsByFloor) {
    if (roomsByFloor.hasOwnProperty(key)) {
      floors.push(+key);
    }
  }
  floors.sort((a, b) => ( b - a ));
  
  return floors;
}

function toListByFloor(rooms) {
  const roomsByFloor = {};

  rooms.map( room => {
    const floor = room.floor;
    if (roomsByFloor[floor]) {
      roomsByFloor[floor].push(room);
    } else {
      roomsByFloor[floor] = [room];
    }
  });
  
  return roomsByFloor;
}
