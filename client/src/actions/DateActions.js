import * as types from '../constants/ActionTypes';
import { getEvents } from './EventActions';
import moment from 'moment';

export function setDate(date) {

  return (dispatch, getState) => {

    dispatch({
      type: types.SET_DATE,
      payload: date 
    });

    const startRange = moment([date.year(), date.month(), date.date(), 8, 0, 0, 0]);
    const endRange = moment([date.year(), date.month(), date.date(), 23, 0, 0, 0]);

    dispatch(getEvents({start: startRange, end: endRange}, true));   
  };
}