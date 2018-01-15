import * as types from '../constants/ActionTypes';

export function getUsers(dateRange) {
  return (dispatch) => {
    dispatch({
      type: types.GET_USERS_REQUEST
    });

    const url = '/graphgl?query={users{id,login,avatarUrl,homeFloor}}';
    fetch(url)
      .then(res => res.json())
      .then(response => {
      
        dispatch({
          type: types.GET_USERS_SUCCESS,
          payload: response.data.users
        });

      })
      .catch( error => {
        dispatch({
          type: types.GET_USERS_ERROR,
          payload: []
        })
      })
  }
}