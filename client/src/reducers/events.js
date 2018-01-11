import {
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_ERROR
} from '../constants/ActionTypes';

const initialState = {
  dateRange: 228,
  events: [],
  fetching: false
};

export default function events(state = initialState, action) {

	switch(action.type) {
		
		case GET_EVENTS_REQUEST:
			return {...state, dateRange: action.payload, fetching: true};

		case GET_EVENTS_SUCCESS:
			return {...state, events: action.payload, fetching: false};

    case GET_EVENTS_ERROR:
      return {...state, events: action.payload, fetching: false};

		default:
        	return state;
  }
}