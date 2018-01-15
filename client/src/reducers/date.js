import {
  SET_DATE
} from '../constants/ActionTypes';

import moment from 'moment';

const initState = {
  date: moment(),
};

export default function date(state = initState, action) {

  switch(action.type) {

    case SET_DATE:
      return {...state, date: action.payload};

    default:
      return state;
      
  }
}
