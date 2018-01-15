import {
  OPEN_HOME_PAGE,
  OPEN_CHANGE_EVENT_PAGE,
  OPEN_NEW_EVENT_PAGE
} from '../constants/ActionTypes';

import {
  HOME_PAGE,
  CHANGE_EVENT_PAGE,
  NEW_EVENT_PAGE
} from '../constants/appConstants';

const initState = {
  page: HOME_PAGE
};

export default function page(state = initState, action) {

  switch(action.type) {

    case OPEN_HOME_PAGE:
      return {...state, page: HOME_PAGE};
    
    case OPEN_CHANGE_EVENT_PAGE:
      return {...state, page: CHANGE_EVENT_PAGE};
    
    case OPEN_NEW_EVENT_PAGE:
      return {...state, page: NEW_EVENT_PAGE};
    
    default:
      return state;
  }
}