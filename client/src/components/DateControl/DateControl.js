import React, { Component } from 'react';

import './DateControl.css';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './SingleDatePicker.css';


import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as toolTipActions from './../../actions/ToolTipActions';
import * as dateActions from './../../actions/DateActions';

import {CircleButtonLeft, CircleButtonRight} from '../CircleButton/CircleButton';

class DateControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false
    };
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
  }
  handleLeftClick() {
    const currentDate = this.props.date.date;
    const beforeCurrentDate = currentDate.add(-1, 'day');
    this.props.dateActions.setDate(beforeCurrentDate)
  }
  handleRightClick() {
    const currentDate = this.props.date.date;
    const afterCurrentDate = currentDate.add(1, 'day');
    this.props.dateActions.setDate(afterCurrentDate)
  }
  getNumberOfMonths() {
    const viewPortWidth = window.innerWidth;
    if (viewPortWidth >= 1280) return 3;
    return 1;
  }
  getDayItemWidth() {
    const viewPortWidth = window.innerWidth;
    if (viewPortWidth >= 1280) return 24;
    return 36;
  }
  componentWillMount() {

  }

	render() {
    const { date } = this.props.date;
    let dateStr = date.calendar(null, {
        sameDay: 'D MMM · [Сегодня]',
        nextDay: 'D MMM · [Завтра]',
        nextWeek: 'D MMM · dd',
        lastDay: 'D MMM · [Вчера]',
        lastWeek: 'D MMM · dd',
        sameElse: 'D MMM · dd'
    }).replace(/\./,'');

    const {className} = this.props;
    return (
  		<div className={"date-control " + (className ? className : "")}>
  			<CircleButtonLeft onClick={this.handleLeftClick} />
  			 <div className="date-control__date-calendar" >
          <SingleDatePicker
            date={this.props.date.date}
            onDateChange={this.props.dateActions.setDate}
            focused={this.state.focused}
            onFocusChange={({ focused }) => this.setState({ focused })}
            numberOfMonths={this.getNumberOfMonths()}
            displayFormat="D MMM"
            isOutsideRange={() => false}
            readOnly={true}
            hideKeyboardShortcutsPanel={true}
            enableOutsideDays={false}
            daySize={this.getDayItemWidth()}
          />
          <span className="date-control__date">{dateStr}</span>
          </div>
          	<CircleButtonRight onClick={this.handleRightClick} />
  		</div>
	  );
  }
}

function mapStateToProps (state) {
  return {
    date: state.date
  }
}
function mapDispatchToProps(dispatch) {
  return {
    dateActions: bindActionCreators(dateActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DateControl);
