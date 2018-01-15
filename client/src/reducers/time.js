import {
  UPDATE_CURRENT_TIME
} from '../constants/ActionTypes';

import moment from 'moment';

const initState = {
  currentTime: moment()
};

export default function date(state = initState, action) {

  switch(action.type) {

    case UPDATE_CURRENT_TIME:
      return {...state, currentTime: action.payload};

    default:
      return state;
      
  }
}