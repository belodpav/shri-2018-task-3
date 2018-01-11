import * as types from '../constants/ActionTypes';

export function getEvents(dateRange) {
	return (dispatch) => {
		dispatch({
			type: types.GET_EVENTS_REQUEST,
			payload: dateRange
		});

		const url = '/graphgl?query={events{title,users{login}}}';
		fetch(url)
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: types.GET_EVENTS_SUCCESS,
					payload: response.data.events
				});		
			})
			.catch( error => {
				dispatch({
					type: types.GET_EVENTS_ERROR,
					payload: []
				})
			})
	}
}

