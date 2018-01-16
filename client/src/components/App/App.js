import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as eventActions from './../../actions/EventActions';
import * as dateActions from './../../actions/DateActions';
import * as timeActions from './../../actions/TimeActions';
import * as roomActions from './../../actions/RoomActions';
import * as diagramActions from './../../actions/DiagramActions';

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
   componentDidMount() {
    const { getRooms } = this.props.roomActions;
    const date = moment();
    const startRange = moment([date.year(), date.month(), date.date(), 8, 0, 0, 0]);
    const endRange = moment([date.year(), date.month(), date.date(), 23, 0, 0, 0]);
    getRooms({dateStart: startRange, dateEnd: endRange});

    // App loaded. Let's remove welcome window
    setTimeout( () => { 
      const welcomeWindow = document.getElementById('welcome');
      welcomeWindow.className +=' welcome_state_hidden';
    }, 2000);
      
  }

  componentWillUnmount() {
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
