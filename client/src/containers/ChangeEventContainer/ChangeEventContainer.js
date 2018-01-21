import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pageActions from './../../actions/PageActions';
import * as eventActions from './../../actions/EventActions';
import ChangeEvent from '../../components/ChangeEvent/ChangeEvent';



class ChangeEventContainer extends Component {
  
  handleRemoveEvent = (event) => {
    const { removeEvent } = this.props.eventActions;
    removeEvent(event);
  };

  handleSaveEvent = (event) => {
    const { openHomePage } = this.props.pageActions;
    const { updateEvent } = this.props.eventActions;

    updateEvent(event);
    openHomePage();
  };

  render() {
    let className = 'change-meeting';

    const { activeEvent } = this.props.events;
    const { openHomePage } = this.props.pageActions;
    const { users } = this.props.users;
    const { date } = this.props.date;
    const { handleSaveEvent, handleRemoveEvent } = this;
    
    return (
      <ChangeEvent
        className={className}
        title="Редактирование встречи"
        date={date}
        event={activeEvent}
        users={users}
        events={this.props.events.events}
        rooms={this.props.rooms.rooms}
        onGoHome={openHomePage}
        onSaveEvent={handleSaveEvent}
        onRemoveEvent={handleRemoveEvent}
      />
    );
  }
}


function mapStateToProps(state) {
  return {
    events: state.events,
    rooms: state.rooms,
    users: state.users,
    date: state.date
  }
}
function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch),
    eventActions: bindActionCreators(eventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEventContainer);
