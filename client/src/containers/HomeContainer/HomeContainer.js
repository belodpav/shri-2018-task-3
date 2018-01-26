import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as toolTipActions from './../../actions/ToolTipActions';
import * as pageActions from './../../actions/PageActions';
import * as eventActions from './../../actions/EventActions';

import Home from '../../components/Home/Home';
import shortCutFollowActivate from '../../scripts/shortCutFollow';
import '../../scripts/shortCutFollow.css';


class HomeContainer extends Component {
 
  componentDidMount() {
    
    // Activate ShortCut-Follow Title script
    shortCutFollowActivate();

    const home = document.querySelector('.home');
    home.addEventListener('scroll', this.handleClickOutToolTip);

  }
 
  componentWillUnmout() {
    const home = document.querySelector('.home');
    home.removeEventListener('scroll', this.handleClickOutToolTip());
  }

  handleOnOk = () => {
    this.props.eventActions.hideMessageCreatedEvent();
  };

  handleClickOutToolTip = () => {
    const { isActive } = this.props.tooltip;
    const { hideToolTip } = this.props.toolTipActions;
    
    if (isActive) hideToolTip();
  };

  handleCreateNewEvent = () => {
    const { date } = this.props.date;
    const dateStartSettings = [
      date.get('year'),
      date.get('month'),
      date.get('date'),
      0,
      0,
      0
    ];
    const dateEndSettings = [
      date.get('year'),
      date.get('month'),
      date.get('date'),
      0,
      0,
      0
    ];

    const newStart = moment(dateStartSettings);
    const newEnd = moment(dateEndSettings);

    const event = {
      title: '',
      dateStart: newStart,
      dateEnd: newEnd,
      users: [],
      room: {}
    };

    this.handleClickOutToolTip();
    this.props.eventActions.setActiveEvent(event);
    this.props.pageActions.openNewEventPage();
  };

  render() {
    const { activeEvent, isModalCreated } = this.props.events;
    const { date } = this.props.date;
    const isToolTipActive = this.props.tooltip.isActive;
    const { tooltip } = this.props;
    const { handleOnOk, handleCreateNewEvent, handleClickOutToolTip } = this;

    
    return (
      <Home
        isToolTipActive={isToolTipActive}
        isModalCreated={isModalCreated}
        date={date}
        activeEvent={activeEvent}
        tooltip={tooltip}
        onOk={handleOnOk}
        onCreateNewEvent={handleCreateNewEvent}
        onClickOutToolTip={handleClickOutToolTip}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    tooltip: state.tooltip,
    events: state.events,
    date: state.date
  }
}
function mapDispatchToProps(dispatch) {
  return {
    toolTipActions: bindActionCreators(toolTipActions, dispatch),
    pageActions: bindActionCreators(pageActions, dispatch),
    eventActions: bindActionCreators(eventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
