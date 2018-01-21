import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pageActions from './../../actions/PageActions';
import * as eventActions from './../../actions/EventActions';
import NewEvent from '../../components/NewEvent/NewEvent';

class NewEventContainer extends Component {
  handleUpdateChangedEvents = (event) => {
    const { updateEvent } = this.props.eventActions;
    updateEvent(event);
  };

  handleCreateEvent = (event) => {
    const { createEvent } = this.props.eventActions;
    createEvent(event);
  };

  render() {
    let className = 'new-meeting';
    const { openHomePage } = this.props.pageActions;
    const { users } = this.props.users;
    const { date } = this.props.date;
    const { events, activeEvent } = this.props.events;
    const { rooms } = this.props.rooms;
    const { handleCreateEvent, handleUpdateChangedEvents } = this;
    
    return (
      <NewEvent
        className={className}
        date={date}
        event={activeEvent}
        users={users}
        cls="new-meeting__editor"
        title="Новая встреча"
        events={events}
        rooms={rooms}
        onGoHome={openHomePage}
        onCreateEvent={handleCreateEvent}
        onUpdateChangedEvents={handleUpdateChangedEvents}
      />
    );
  }
}


function mapStateToProps(state) {
  return {
    events: state.events,
    users: state.users,
    rooms: state.rooms,
    date: state.date
  }
}
function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch),
    eventActions: bindActionCreators(eventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEventContainer);

