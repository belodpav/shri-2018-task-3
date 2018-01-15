import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
} from '../constants/ActionTypes';

const initialState = {
  users: []
};

export default function events(state = initialState, action) {

  switch(action.type) {
    
    case GET_USERS_REQUEST:
      return {...state, dateRange: action.payload, fetching: true};

    case GET_USERS_SUCCESS:
      return {...state, users: action.payload, fetching: false};

    case GET_USERS_ERROR:
      return {...state, events: action.payload, fetching: false};
      
    default:
      return state;
  }
}