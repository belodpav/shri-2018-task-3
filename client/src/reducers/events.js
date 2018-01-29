import {
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_ERROR,
  POST_EVENT_REQUEST,
  POST_EVENT_SUCCESS,
  POST_EVENT_ERROR,
  SET_EVENTS,
  SET_ACTIVE_EVENT,
  SHOW_MESSAGE_CREATED_EVENT,
  HIDE_MESSAGE_CREATED_EVENT
} from '../constants/ActionTypes';

const initialState = {
  dateRange: 228,
  eventsBuffer: {},
  events: {},
  fetching: false,
  isFetched: false,
  activeEvent: {},
  isModalCreated: false,
  errorMessage: ''
};

export default function events(state = initialState, action) {

	switch(action.type) {
		
		case GET_EVENTS_REQUEST:
			return {...state, dateRange: action.payload, fetching: true};

		case GET_EVENTS_SUCCESS:
			return {
        ...state,
        eventsBuffer: action.payload,
        fetching: false,
        isFetched: true,
        errorMessage: ''
      };

    case GET_EVENTS_ERROR:
      return {
        ...state,
        events: [],
        errorMessage: action.payload,
        fetching: false,
        isFetched: false
      };

    case POST_EVENT_REQUEST:
      return {...state, fetching: true};

    case POST_EVENT_SUCCESS:
      return {...state, fetching: false};

    case POST_EVENT_ERROR:
      return {...state, fetching: false};
      
    case SET_EVENTS:
    return {...state, events: action.payload, fetching: false};

    case SET_ACTIVE_EVENT:
    return {...state, activeEvent: action.payload};

    case SHOW_MESSAGE_CREATED_EVENT:
    return {...state, isModalCreated: true};

    case HIDE_MESSAGE_CREATED_EVENT:
    return {...state, isModalCreated: false};


		default:
      return state;
  }
}