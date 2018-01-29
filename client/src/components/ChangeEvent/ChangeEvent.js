import React from 'react';
import './ChangeEvent.css';
import Header from '../Header/Header';
import Logo from '../Logo/Logo';
import EditorContainer from '../../containers/EditorContainer/EditorContainer';



const ChangeEvent = (props) => {
	const {
    className,
    date,
    event,
    users,
    title,
    events,
    rooms,
    onGoHome,
    onSaveEvent,
    onRemoveEvent,
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
					onSaveEvent={onSaveEvent}
					onRemoveEvent={onRemoveEvent}
          onUpdateChangedEvents={onUpdateChangedEvents}
				/>
			</div>
		</div>
	);

}

export default ChangeEvent;
