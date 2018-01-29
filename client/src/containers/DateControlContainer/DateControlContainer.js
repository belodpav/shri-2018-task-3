import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as dateActions from './../../actions/DateActions';
import DateControl from '../../components/DateControl/DateControl';


class DateControlContainer extends Component {
  constructor(props) {
    super(props);

    const initState = {
      focused: false
    };

    this.state = initState;
  }

  handleOnChange = (date) => {
    const { setDate } = this.props.dateActions;
    setDate(date);

    this.setState({
      focused: false
    })
  };

  handleOnFocus = () => {

    this.setState({
      focused: true
    })
  };

  handleOnBlur = () => {

    this.setState({
      focused: false
    })
  };

  handleClickPrevDate = () => {
    const { date } = this.props.date;
    const prevDate = date.add(-1, 'day');

    this.props.dateActions.setDate(prevDate);
  };

  handleClickNextDate = () => {
    const { date } = this.props.date;
    const nextDate = date.add(1, 'day');

    this.props.dateActions.setDate(nextDate);
  };

  getNumberOfMonths() {
    const viewPortWidth = window.innerWidth;
    if (viewPortWidth >= 1280) return 3;
    return 1;
  }

  getPopperPlacement() {
    const viewPortWidth = window.innerWidth;
    if (viewPortWidth >= 1280) return 'bottom-start';
    return 'bottom';
  }

  render() {
    let className = 'date-control';
    const { date } = this.props.date;
    const { cls } = this.props;
    const { focused } = this.state;
    const { 
      getNumberOfMonths,
      getPopperPlacement,
      handleClickPrevDate,
      handleClickNextDate,
      handleOnFocus,
      handleOnBlur,
      handleOnChange
    } = this;

    className += ' ' + cls;
    className += focused ? ' date-control_focused_true' : '';

    let dateStr = date.calendar(null, {
        sameDay: 'D MMM · ',
        nextDay: 'D MMM · ',
        nextWeek: 'D MMM · ',
        lastDay: 'D MMM · ',
        lastWeek: 'D MMM · ',
        sameElse: 'D MMM · '
    }).replace(/\./,'');

    let dateStrDay = date.calendar(null, {
        sameDay: '[Сегодня]',
        nextDay: '[Завтра]',
        nextWeek: 'dd',
        lastDay: '[Вчера]',
        lastWeek: 'dd',
        sameElse: 'dd'
    }).replace(/\./,'');

    return (
      <DateControl
        className={className}
        date={date}
        dateStr={dateStr}
        dateStrDay={dateStrDay}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onClickPrevDate={handleClickPrevDate}
        onClickNextDate={handleClickNextDate}
        numberOfMonths={getNumberOfMonths()}
        popperPlacement={getPopperPlacement()}
      />

    );
  }
}

DateControlContainer.propTypes = {
  cls: PropTypes.string
};

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

export default connect(mapStateToProps, mapDispatchToProps)(DateControlContainer);
