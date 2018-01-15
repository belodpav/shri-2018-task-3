import * as types from  '../constants/ActionTypes';

export function openHomePage() {
  return {
    type: types.OPEN_HOME_PAGE
  }
};

export function openChangeEventPage() {
  return {
    type: types.OPEN_CHANGE_EVENT_PAGE
  }
};

export function openNewEventPage() {
  return {
    type: types.OPEN_NEW_EVENT_PAGE
  }
};