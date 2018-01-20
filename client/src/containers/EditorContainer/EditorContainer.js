import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRecomendation, getRecomendation__2 } from '../../scripts/getRecomendation__process.js';
import 'moment/locale/ru.js';
import Editor from '../../components/Editor/Editor';

import * as dateActions from './../../actions/DateActions';

moment.locale('ru');

class EditorContainer extends Component {
  constructor(props) {
    super(props);
    const { date, event, users } = this.props;
    
    const initState = {
      isModalRemove: false,
      isModalCreate: false,
      isValid: false,
      date: date,
      eventId: event.Id,
      eventName: event.title,
      dateStart: event.dateStart,
      dateEnd: event.dateEnd,
      peopleAvailable: this.getAvailablePeople(users, event.users),
      members: event.users,
      room: event.room,
      validateMessage: '',
      changedEvents: []
    };

    this.state = initState;
  }

  validator(event) {
    const title = event.eventName.trim();
    if (title.length === 0) {
      return 'Введите название темы';
    }
    if (event.members.length === 0) {
      return 'Ввыберите участников';
    }
    if (!event.room.id) {
      return 'Выберете переговорку';
    }
    return '';
  }

  handleOnUpdateEvents = (changedEvents) => {
    if (changedEvents.length) {
      this.setState({changedEvents: changedEvents});
    } else {
      this.setState({changedEvents: []})
    }
  };

  handleOnOk = () => {
    this.props.onGoHome();
  };

  handleOnRemoveButton = () => {
    this.setState({isModalRemove:true});
  };

  handleOnCancel = () => {
    this.setState({isModalRemove: false});
  };

  handleOnValidate = (value) => {
    this.setState({
      isValid: value
    })
  };

  handleOnRemoveEvent = () => {
    const event = {
      id: this.props.event.id,
      title: this.state.eventName,
      dateStart: this.state.dateStart,
      dateEnd: this.state.dateEnd,
      users: this.state.members,
      room: this.state.room
    };

    this.props.onRemoveEvent(event);
    this.props.onGoHome();
  };

  handleOnCreateEvent = () => {
    const event = {
      title: this.state.eventName,
      dateStart: this.state.dateStart,
      dateEnd: this.state.dateEnd,
      users: this.state.members,
      room: this.state.room
    };

    const changedEvents = this.state.changedEvents;
    changedEvents.forEach( event => {
      this.props.onUpdateChangedEvents(event);
    });

    this.props.onCreateEvent(event);
    // Change it
    this.setState({isModalCreate: true});
  };

  handleOnSaveEvent = () => {
    const event = {
      id: this.props.event.id,
      title: this.state.eventName,
      dateStart: this.state.dateStart,
      dateEnd: this.state.dateEnd,
      users: this.state.members,
      room: this.state.room
    };
   
    this.props.onSaveEvent(event);
  };

  handleOnClearRoom = () => {
    this.setState({
      room: {}
    });
  };

  handleOnSetRoom = (value) => {
    this.setState({
      room: value
    });
  };

  handleOnChangeEventName = (event) => {
    const value = event.target.value;

    this.setState({
      eventName: value
    });
  };

  handleOnClearEventName = () => {
    this.setState({
      eventName: ''
    })
  }

  handleOnSelected = (value) => {
    const peopleAvailableNew = this.state.peopleAvailable.filter( person => 
      person.id !== value.id
    );
    
    if (this.state.room.capacity && (this.state.members.length + 1 > this.state.room.capacity)) {
      this.setState({
        members: [...this.state.members, value],
        peopleAvailable: peopleAvailableNew,
        room: {}
      });
    } else {
      this.setState({
        members: [...this.state.members, value],
        peopleAvailable: peopleAvailableNew
      });
    }    
  };

  handleOnDeleteClick = (value) => {
    const membersNew = this.state.members.filter( person => 
      person.id !== value.id
    );
    this.setState({
      members: membersNew,
      peopleAvailable: [...this.state.peopleAvailable, value]
    })
  };

  handleOnChangeDateStart = (value) => {
    const dStart = this.state.dateStart;
    const dEnd = this.state.dateEnd;

    const list = value.split(':');
    const hour = +list[0];
    const minutes = +list[1];

    const dateStartSettings = [
        dStart.get('year'),
        dStart.get('month'),
        dStart.get('date'),
        hour,
        minutes,
        0
    ];
    const date = moment(dateStartSettings);

    if (date.hour() === dStart.hour() && date.minutes() === dStart.minutes()) {
      return;
    }

    if (dEnd.isBefore(date)) {
      this.setState({
        dateEnd: date.clone().add(15, 'minutes'),
        dateStart: date,
        room: {}
      });
    } else {
      this.setState({
        dateStart: date,
        room: {}
      });
    }
  };

  handleOnChangeDateEnd = (value) => {
    const dStart = this.state.dateStart;
    const dEnd = this.state.dateEnd;

    const list = value.split(':');
    const hour = +list[0];
    const minutes = +list[1];

    const dateEndSettings = [
        dEnd.get('year'),
        dEnd.get('month'),
        dEnd.get('date'),
        hour,
        minutes,
        0
    ];
    const date = moment(dateEndSettings);

    if (date.hour() === dEnd.hour() && date.minutes() === dEnd.minutes()) {
      return;
    }

    if (date.isBefore(dStart)) {
      date.add(15, 'minutes');
    }
    this.setState({
      dateEnd: date,
      room: {}
    });
  };

  handleOnDateChange = (value) => {
    const oldDateStart = this.state.dateStart,
        oldDateEnd = this.state.dateEnd;
    
    if (!value || !value.isValid()) {

      this.setState({
        dateStart: oldDateStart,
        dateEnd: oldDateEnd
      })
      return;
    }
    
    const dateStartSettings = [
        value.get('year'),
        value.get('month'),
        value.get('date'),
        oldDateStart.get('hour'),
        oldDateStart.get('minute'),
        0
    ];

    const dateEndSettings = [
        value.get('year'),
        value.get('month'),
        value.get('date'),
        oldDateEnd.get('hour'),
        oldDateEnd.get('minute'),
        0
    ];
    
    
    const newStart = moment(dateStartSettings);
    const newEnd = moment(dateEndSettings);


    this.props.dateActions.setDate(value);

    this.setState({
      dateStart: newStart,
      dateEnd: newEnd,
      room: {}
    })
  };

  hasRoomsInCapacityRange(rooms, members) {
    
    for(let i = 0; i < rooms.length; i++) {
      if (rooms[i].capacity >= members.length) {
        return true
      }
    }

    return false;
  }
  
  getAvailablePeople(allUsers, users) {
    let availableUsers = [];
    
    availableUsers = allUsers.filter( user => {
      
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === user.id) return false;
      }
      return true;
    });

    return availableUsers;
  }

  componentDidMount() {
    const message = this.validator(this.state);
    if (message === '') {
      this.setState({isValid: true, validateMessage: message});
    } else {
      this.setState({isValid: false, validateMessage: message});
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const oldMessage = prevState.validateMessage;
    const message = this.validator(this.state);
    if (message !== oldMessage) {
      if (message === '') {
        this.setState({isValid: true, validateMessage: message});
      } else {
        this.setState({isValid: false, validateMessage: message});
      }
    }   
  }

  render() {
    let className = 'editor';
    const { title, cls, onGoHome, rooms, events } = this.props;
    const {
      dateStart,
      dateEnd,
      eventName,
      peopleAvailable,
      members,
      room,
      isValid,
      validateMessage,
      isModalRemove,
      isModalCreate 
    } = this.state;
    let recoms = [];
    let isFreeRooms = true;
    const {
      handleOnUpdateEvents,
      handleOnOk,
      handleOnRemoveButton,
      handleOnCancel,
      handleOnValidate,
      handleOnRemoveEvent,
      handleOnCreateEvent,
      handleOnSaveEvent,
      handleOnClearRoom,
      handleOnSetRoom,
      handleOnChangeEventName,
      handleOnClearEventName,
      handleOnSelected,
      handleOnDeleteClick,
      handleOnChangeDateStart,
      handleOnChangeDateEnd,
      handleOnDateChange,
      hasRoomsInCapacityRange,
    } = this;

    className += cls ? ' ' + cls : '';
    
    const data = {
      eventId: this.props.event.id || -99,
      timeStart: dateStart,
      timeEnd: dateEnd,
      members: members,
      rooms: rooms,
      events: events
    };

    if (!room.id && !dateStart.isSame(dateEnd) && dateStart.isBefore(dateEnd)) {
      recoms = getRecomendation(data);

      if (hasRoomsInCapacityRange(rooms, members)) {
        if (!recoms.length) {
            recoms = getRecomendation__2(data);
            if (!recoms.length) {
              isFreeRooms = false;
            }
        }
      } else {
        isFreeRooms = false;
      }
    }


    return (
      <Editor
        className={className}
        title={title}
        eventName={eventName}
        dateStart={dateStart}
        dateEnd={dateEnd}
        peopleAvailable={peopleAvailable}
        members={members}
        room={room}
        isValid={isValid}
        isFreeRooms={isFreeRooms}
        validateMessage={validateMessage}
        isModalRemove={isModalRemove}
        isModalCreate={isModalCreate} 
        roomRecomendations={recoms}
        onGoHome={onGoHome}
        onUpdateEvents={handleOnUpdateEvents}
        onOk={handleOnOk}
        onRemoveButton={handleOnRemoveButton}
        onCancel={handleOnCancel}
        onValidate={handleOnValidate}
        onRemoveEvent={handleOnRemoveEvent}
        onCreateEvent={handleOnCreateEvent}
        onSaveEvent={handleOnSaveEvent}
        onClearRoom={handleOnClearRoom}
        onSetRoom={handleOnSetRoom}
        onChangeEventName={handleOnChangeEventName}
        onClearEventName={handleOnClearEventName}
        onSelected={handleOnSelected}
        onDeleteClick={handleOnDeleteClick}
        onChangeDateStart={handleOnChangeDateStart}
        onChangeDateEnd={handleOnChangeDateEnd}
        onDateChange={handleOnDateChange}
      />
    );
  }

}

function mapStateToProps (state) {
  return {
  }
}
function mapDispatchToProps(dispatch) {
  return {
    dateActions: bindActionCreators(dateActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);