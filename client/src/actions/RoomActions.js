import * as types from '../constants/ActionTypes';
import { getEvents } from '../actions/EventActions';
import { getUsers } from '../actions/UserActions';
import shortCutFollowActivate from '../scripts/shortCutFollow';

function parseJSON(response) {
  return response.json();
}

export function getRooms(dateRange) {
  return (dispatch) => {
    dispatch({
      type: types.GET_ROOMS_REQUEST
    });

    const url = '/graphgl?query={rooms{id,title,capacity,floor}}';
    fetch(url)
      .then( response => {
      
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {

        var error = new Error(response.statusText)
        error.response = response
        throw error
      }

      })
      .then(parseJSON)
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
        console.log(error);
        dispatch({
          type: types.GET_ROOMS_ERROR,
          payload: error.message
        })
      })
  }
}

/**
 * Returns array of Floor numbers
 * 
 * @param {Object} roomsByFloor - An Object with rooms sorted by Floor number
 * @return {[number]}
 */
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

/**
 * Returns an Object with rooms sorted by Floor number
 * 
 * @param {[Room]} rooms
 * @return {Object}
 */
function toListByFloor(rooms) {
  const roomsByFloor = {};

  rooms.forEach( room => {
    const floor = room.floor;
    if (roomsByFloor[floor]) {
      roomsByFloor[floor].push(room);
    } else {
      roomsByFloor[floor] = [room];
    }
  });
  
  return roomsByFloor;
}
