import * as types from '../constants/ActionTypes';

export function showToolTip() {
  return (dispatch) => {
    dispatch({
      type: types.SHOW_TOOLTIP,
      payload: true
    });
  }
};

export function hideToolTip() {
  return (dispatch) => {
    dispatch({
      type: types.HIDE_TOOLTIP,
      payload: false
    });
  }
}

export function setToolTipCoord(coord) {
  return (dispatch) => {
    dispatch({
      type: types.SET_TOOLTIP_COORD,
      payload: coord
    });
  }
}