import React, { Component } from 'react';
import './NewEvent.css';
import Header from '../Header/Header';
import Logo from '../Logo/Logo';
import EditorContainer from '../../containers/EditorContainer/EditorContainer';

const NewEvent = (props) => {
  const {
    className,
    date,
    event,
    users,
    title,
    events,
    rooms,
    onGoHome,
    onCreateEvent,
    onUpdateChangedEvents
  } = props;
	
  return (
		<div>
			<Header>
				<Logo />
			</Header>
			<div className={className}>
				<EditorContainer
					date={date}
					event={event}
					users={users}
					cls="new-meeting__editor"
					title={title}
					events={events}
					rooms={rooms}
					onGoHome={onGoHome}
					onCreateEvent={onCreateEvent}
          onUpdateChangedEvents={onUpdateChangedEvents}
				/>
			</div>
		</div>
	);
}


export default NewEvent;

