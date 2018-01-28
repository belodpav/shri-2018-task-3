import * as types from '../constants/ActionTypes';
import moment from 'moment';

import { getDiagramData } from '../actions/DiagramActions';

export function createEvent(event) {
	return (dispatch) => {
			dispatch({
			type: types.POST_EVENT_REQUEST
		});

		// Converting Moment() date objects to ISO strings
		const dateStart = event.dateStart.toISOString(),
					dateEnd = event.dateEnd.toISOString();
		const usersIds = event.users.map( user => user.id );
		// Query request
		const url = '/graphgl';
		const query = `
			mutation {
				createEvent(input: {
					title: "${event.title}",
					dateStart: "${dateStart}",
					dateEnd: "${dateEnd}"
				},
					usersIds: [${usersIds}],
					roomId: ${event.room.id}
				) {
					id
				}
			}
		`;

		fetch(url, 
					{
						method: "POST",
				   		headers: {
						    Accept: 'application/json',
						    'Content-Type': 'application/json',
						  },
						  body: JSON.stringify({
						    query,
						    variables: {
						    },
						  }),
				   	}

				 )
			.then(res => res.json())
			.then(response => {	
			
				// Dispatch GET_EVENTS_SUCCESS
				dispatch({
					type: types.POST_EVENT_SUCCESS
				});

				const date = event.dateStart;
	 			const startRange = moment([date.year(), date.month(), date.date(), 8, 0, 0, 0]);
    		const endRange = moment([date.year(), date.month(), date.date(), 23, 0, 0, 0]);

				dispatch(getEvents({start: startRange, end: endRange}, true));
				
			})
			.catch( error => {
				dispatch({
					type: types.POST_EVENT_ERROR
				})
			})

	}
}

export function removeEvent(event) {
	return (dispatch) => {
			dispatch({
			type: types.POST_EVENT_REQUEST
		});

		// Query request
		const url = '/graphgl';
		const query = `
			mutation {
				removeEvent(id:${event.id}) {
					id
				}
			}
		`;

		fetch(url, 
					{
						method: "POST",
				   		headers: {
						    Accept: 'application/json',
						    'Content-Type': 'application/json',
						  },
						  body: JSON.stringify({
						    query,
						    variables: {
						    },
						  }),
				   	}

				 )
			.then(res => res.json())
			.then(response => {	

				dispatch({
					type: types.POST_EVENT_SUCCESS
				});

				const date = event.dateStart;
	 			const startRange = moment([date.year(), date.month(), date.date(), 8, 0, 0, 0]);
    		const endRange = moment([date.year(), date.month(), date.date(), 23, 0, 0, 0]);

				dispatch(getEvents({start: startRange, end: endRange}, true));
				

			})
			.catch( error => {
				dispatch({
					type: types.POST_EVENT_ERROR
				})
			})

	}
}


export function updateEvent(event) {
	return (dispatch) => {
			dispatch({
			type: types.POST_EVENT_REQUEST
		});

		// Converting Moment() date objects to ISO strings
		const dateStart = event.dateStart.toISOString(),
					dateEnd = event.dateEnd.toISOString();
		const usersIds = event.users.map( user => user.id );
		// Query request
		const url = '/graphgl';
		const query = `
			mutation {
				updateEventData(id:${event.id},
				input: {
					title: "${event.title}",
					dateStart: "${dateStart}",
					dateEnd: "${dateEnd}"
				},
					usersIds: [${usersIds}],
					roomId: ${event.room.id}
				) {
					id
				}
			}
		`;

		fetch(url, 
					{
						method: "POST",
				   		headers: {
						    Accept: 'application/json',
						    'Content-Type': 'application/json',
						  },
						  body: JSON.stringify({
						    query,
						    variables: {
						    },
						  }),
				   	}

				 )
			.then(res => res.json())
			.then(response => {	

				dispatch({
					type: types.POST_EVENT_SUCCESS
				});

				const date = event.dateStart;
	 			const startRange = moment([date.year(), date.month(), date.date(), 8, 0, 0, 0]);
    		const endRange = moment([date.year(), date.month(), date.date(), 23, 0, 0, 0]);

				dispatch(getEvents({start: startRange, end: endRange}, true));
				

			})
			.catch( error => {
				dispatch({
					type: types.POST_EVENT_ERROR
				})
			})

	}
}

export function showMessageCreatedEvent() {
	return (dispatch) => {
		dispatch({
			type: types.SHOW_MESSAGE_CREATED_EVENT
		})
	}
}

export function hideMessageCreatedEvent() {
	return (dispatch) => {
		dispatch({
			type: types.HIDE_MESSAGE_CREATED_EVENT
		})
	}
}

export function setActiveEvent(event) {
	return (dispatch) => {
		dispatch({
			type: types.SET_ACTIVE_EVENT,
			payload: event
		})
	}
}

export function getEvents(dateRange, isAllDay) {
	return (dispatch, getState) => {
		dispatch({
			type: types.GET_EVENTS_REQUEST,
			payload: dateRange
		});

		// Converting Moment() date objects to ISO strings
		const dateStart = dateRange.start.toISOString(),
					dateEnd = dateRange.end.toISOString();
		
		// Query request
		const query = `/graphgl?query=
			{
				eventsByDateRange(dateStart:"${dateStart}",dateEnd:"${dateEnd}") {
					id,
					dateStart,
					dateEnd,
					title,
					users {
						id,
						login,
						homeFloor,
						avatarUrl
					},
					room {
						id,
						title,
						floor,
						capacity
					}
				}
			}
			`;

		fetch(query)
			.then(res => res.json())
			.then(response => {	
				// Convert ISO Date strings to Moment() date objects
				const eventsOrigin = response.data.eventsByDateRange;
				const eventsList = eventsOrigin.map( event => {
					return {
						...event,
						dateStart: strDateToMoment(event.dateStart),
						dateEnd: strDateToMoment(event.dateEnd)
					}
				});
				const events = sortEventsByDate(eventsList);
				
				const eventsByRoomId = toListByRoom(events);
				
				// Dispatch GET_EVENTS_SUCCESS
				dispatch({
					type: types.GET_EVENTS_SUCCESS,
					payload: eventsByRoomId
				});
				
				if (isAllDay) {
					dispatch({
						type: types.SET_EVENTS,
						payload: eventsByRoomId
					});		
					
					dispatch(getDiagramData());
				}
			})
			.catch( error => {
				dispatch({
					type: types.GET_EVENTS_ERROR,
					payload: []
				})
			})
	}
}

/**
 * Returns Moment object for the date
 *
 * @param {string} dateStr
 * @return {Moment}
 */
function strDateToMoment(dateStr) {
	return moment(dateStr);
}

/**
 * Converts events array to an object with events sorted by room ID
 *
 * @param {[Event]} events
 * @return {Object}
 */
function toListByRoom(events) {
  const eventsByRoomId = {};

  events.map( event => {
    const roomId = event.room.id;
    if (eventsByRoomId[roomId]) {
      eventsByRoomId[roomId].push(event);
    } else {
      eventsByRoomId[roomId] = [event];
    }
  });
  
  return eventsByRoomId;
}

/**
 * Return events array sorted by date
 *
 * @param {[Event]} events
 * @return {[Event]}
 */
function sortEventsByDate(events) {
  const sEvents = [ ...events];
  sEvents.sort( (a, b) =>  {
  	const aTime = a.dateStart;
  	const bTime = b.dateStart;

  	return (aTime.isBefore(bTime) ? -1 : 1) 

	});
  return sEvents;
}

