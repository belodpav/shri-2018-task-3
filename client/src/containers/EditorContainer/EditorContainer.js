import React, { Component } from 'react';

import { getRecomendation, getRecomendation__2 } from '../../scripts/getRecomendation__process.js';

import moment from 'moment';
import 'moment/locale/ru.js';

import Editor from '../../components/Editor/Editor';

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

  handleOnChangeEventName = (value) => {
    this.setState({
      eventName: value
    });
  };

  handleOnSelected = (value) => {
    const peopleAvailableNew = this.state.peopleAvailable.filter( person => 
      person.id !== value.id
    );
    this.setState({
      members: [...this.state.members, value],
      peopleAvailable: peopleAvailableNew
    });
    
    if (this.state.room.capacity && (this.state.members.length + 1 > this.state.room.capacity)) {
      this.setState({
        room: {}
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

    this.setState({
      dateStart: newStart,
      dateEnd: newEnd
    })
  };
  
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
    const { title, cls, onGoHome } = this.props;
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
      handleOnSelected,
      handleOnDeleteClick,
      handleOnChangeDateStart,
      handleOnChangeDateEnd,
      handleOnDateChange
    } = this;

    className += cls ? ' ' + cls : '';
    
    const data = {
      eventId: this.props.event.id || -99,
      timeStart: this.state.dateStart,
      timeEnd: this.state.dateEnd,
      members: this.state.members,
      rooms: this.props.rooms,
      events: this.props.events
    };

    if (!this.state.room.id && !dateStart.isSame(dateEnd) && dateStart.isBefore(dateEnd)) {
      recoms = getRecomendation(data);
      if (!recoms.length) {
          recoms = getRecomendation__2(data);
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
        onSelected={handleOnSelected}
        onDeleteClick={handleOnDeleteClick}
        onChangeDateStart={handleOnChangeDateStart}
        onChangeDateEnd={handleOnChangeDateEnd}
        onDateChange={handleOnDateChange}
      />
    );
  }

}

export default EditorContainer;