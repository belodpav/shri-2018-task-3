import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as eventActions from './../../actions/EventActions';

class App extends Component {
  handleClick() {
    const { getEvents } = this.props.eventActions;
    getEvents(33);
  }
  render() {
    return (
      <div className="App">
        Init Client 
        <button onClick={this.handleClick.bind(this)}>click</button>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    dateRange: state.dateRange,
    events: state.events
  }
}
function mapDispatchToProps(dispatch) {
  return {
    eventActions: bindActionCreators(eventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
