import * as types from '../constants/ActionTypes';

export function updateCurrentTime(date) {

  return {
    type: types.UPDATE_CURRENT_TIME,
    payload: date
  };
}