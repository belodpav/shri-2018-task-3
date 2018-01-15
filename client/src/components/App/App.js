import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as eventActions from './../../actions/EventActions';
import * as dateActions from './../../actions/DateActions';
import * as timeActions from './../../actions/TimeActions';
import * as roomActions from './../../actions/RoomActions';
import * as diagramActions from './../../actions/DiagramActions';

//import moment from 'moment';

import Home from '../Home/Home';
import ChangeEvent from '../ChangeEvent/ChangeEvent';
import NewEvent from '../NewEvent/NewEvent';

import {
  HOME_PAGE,
  CHANGE_EVENT_PAGE,
  NEW_EVENT_PAGE
} from '../../constants/appConstants';

import moment from 'moment';
import 'moment/locale/ru.js';

moment.locale('ru');

class App extends Component {
  handleClick() {
    //const { getEvents } = this.props.eventActions;
    
    // const startRange = moment([2018, 0, 12, 8, 0, 0, 0]);
    // const endRange = moment([2018, 0, 12, 23, 0, 0, 0]);
    
    // getEvents({start: startRange, end: endRange});
    
  }
  currentTimeRun() {
    const { updateCurrentTime } = this.props.timeActions;
    this.timerId = setInterval( () => {
      //updateCurrentTime(moment());
    }, 1000);
  }
  componentDidMount() {
    this.currentTimeRun();
    const { getRooms } = this.props.roomActions;
    const date = moment();
    const startRange = moment([date.year(), date.month(), date.date(), 8, 0, 0, 0]);
    const endRange = moment([date.year(), date.month(), date.date(), 23, 0, 0, 0]);
    getRooms({dateStart: startRange, dateEnd: endRange});

    this.handleClick();
    
  }
  /*componentWillMount() {
    const { getDiagramData } = this.props.diagramActions;
    const {events} = this.props.events;
    getDiagramData(events);
  }*/

  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  render() {
    
  

    const { page } = this.props.page;
    let appChild;

    switch(page) {
      case HOME_PAGE:
        appChild = <Home />;
        break;
      case CHANGE_EVENT_PAGE:
        appChild = <ChangeEvent />;
        break;
      case NEW_EVENT_PAGE:
        appChild = <NewEvent />;
        break;
    }
    return (
      <div className="App">
        {appChild}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    page: state.page,
    rooms: state.rooms,
    events: state.events,
    date: state.date
  }
}
function mapDispatchToProps(dispatch) {
  return {
    eventActions: bindActionCreators(eventActions, dispatch),
    dateActions: bindActionCreators(dateActions, dispatch),
    timeActions: bindActionCreators(timeActions, dispatch),
    roomActions: bindActionCreators(roomActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
