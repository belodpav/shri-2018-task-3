import {
  GET_DIAGRAM_DATA
} from '../constants/ActionTypes';

import moment from 'moment';

const initState = {
  diagram: {}
};

export default function date(state = initState, action) {

  switch(action.type) {

    case GET_DIAGRAM_DATA:
      return {...state, diagram: action.payload};

    default:
      return state;
      
  }
}