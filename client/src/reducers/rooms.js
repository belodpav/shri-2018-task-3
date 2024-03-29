import {
  GET_ROOMS_REQUEST,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_ERROR,
  SET_FLOORS,
  SET_ROOMS
} from '../constants/ActionTypes';

const initialState = {
  roomsByFloor: [],
  floors: [],
  fetching: false,
  isFetched: false,
  errorMessage: ''
};

export default function rooms(state = initialState, action) {

  switch(action.type) {
    
    case GET_ROOMS_REQUEST:
      return {...state, fetching: true};

    case GET_ROOMS_SUCCESS:
      return {
        ...state,
        roomsByFloor: action.payload,
        isFetched: true,
        fetching: false
      };

    case GET_ROOMS_ERROR:
      return {
        ...state,
        roomsByFloor: [],
        errorMessage: action.payload,
        isFetched: false,
        fetching: false
      };
    
    case SET_FLOORS:
      return {...state, floors: action.payload }

    case SET_ROOMS:
      return {...state, rooms: action.payload }

    default:
      return state;
  }
}

