import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './App.css';
import TimeGridBackground from '../TimeGrid/TimeGridBackground';

import Header from '../Header/Header';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import DateControl from '../DateControl/DateControl';

import ToolTip from '../ToolTip/ToolTip';

import TimeLineRule from '../TimeGrid/TimeLineRule';
import Content from '../Content/Content';

import shortCutFollowActivate from '../../scripts/shortCutFollow';
import '../../scripts/shortCutFollow.css';

import * as toolTipActions from './../../actions/ToolTipActions';
import * as pageActions from './../../actions/PageActions';
import * as eventActions from './../../actions/EventActions';

import moment from 'moment';
 
class Home extends Component {
  componentDidMount() {
    shortCutFollowActivate();
  }
  handleClickOutToolTip() {
    const isToolTipActive = this.props.tooltip.isActive;
    const { hideToolTip } = this.props.toolTipActions;
    if (isToolTipActive) hideToolTip();
  }
  handleNewEvent() {
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
    this.props.eventActions.setActiveEvent(event);
    this.props.pageActions.openNewEventPage();
  }
  render() {
    const { activeEvent } = this.props.events;
    const { date } = this.props.date;
    const isToolTipActive = this.props.tooltip.isActive;

    
    return (
      <div>
        <Header>
          <Logo />
          <Button touchHidden={true} onClick={this.handleNewEvent.bind(this)} theme="active">Создать встречу</Button>
        </Header>
        <div onClick={ this.handleClickOutToolTip.bind(this) } className="app">
            <div className="app__time time">
              <div className="app__aside">
                <DateControl className="app__date-control" />
              </div>
              <TimeLineRule className="app__timeline" date={date} />
            </div>
            <div className="app__body">
              <Content className="app__content" />
              <div className="app__aside app__rooms"></div>
              <TimeGridBackground className="app__timegrid" />
            </div>
        </div>
        { isToolTipActive ? 
          <ToolTip 
            style={{top: this.props.tooltip.top, left: this.props.tooltip.left}}
            styleTriangle={{left: this.props.tooltip.triangleLeft}} 
            event={activeEvent} 
            className={this.props.tooltip.classN}
          /> : ""}
            
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
