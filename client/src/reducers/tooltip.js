import {
  SHOW_TOOLTIP,
  HIDE_TOOLTIP,
  SET_TOOLTIP_COORD
} from '../constants/ActionTypes';


const initState = {
  isActive: false,
  top: 0,
  left: 0,
  triangleLeft: '50%'
};

export default function tooltip(state = initState, action) {

  switch(action.type) {

    case SHOW_TOOLTIP:
      return {...state, isActive: action.payload};

    case HIDE_TOOLTIP:
      return {...state, isActive: action.payload};

    case SET_TOOLTIP_COORD:
      return {
              ...state,
              top: action.payload.top,
              left: action.payload.left,
              triangleLeft: action.payload.triangleLeft,
              classN: action.payload.classN
            }

    default:
      return state;
      
  }
}