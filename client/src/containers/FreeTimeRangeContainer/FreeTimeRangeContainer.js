import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from './../../actions/EventActions';
import * as pageActions from './../../actions/PageActions';
import FreeTimeRange from '../../components/FreeTimeRange/FreeTimeRange';
import {
  HOME_PAGE,
  NEW_EVENT_PAGE
} from '../../constants/appConstants';


class FreeTimeRangeContainer extends Component {
  constructor() {
    super();

    const initState = {
      hovered: false,
      pressed: false,
      focused: false
    };

    this.state = initState;
  }

  handleOnClick = () => {
    const { event, pageActions, eventActions } = this.props;

    eventActions.setActiveEvent(event);
    pageActions.openNewEventPage();
  }

  handleOnMouseEnter = () => {
    const { onFreeItemMouseEnter } = this.props;

    onFreeItemMouseEnter();
    
    this.setState({
      hovered: true
    });
  };

  handleOnMouseLeave = () => {
    const { onFreeItemMouseLeave } = this.props;

    onFreeItemMouseLeave();

    this.setState({
      hovered: false
    })
  };

  handleOnMouseDown = () => {
    this.setState({
      pressed: true
    })
  };

  handleOnMouseUp = () => {
    this.setState({
      pressed: true
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
    });
  };

  render() {
    let className = 'free-time-range';
    const { focused, hovered, pressed } = this.state;
    const { width, cls } = this.props;

    const {
      handleOnMouseEnter,
      handleOnMouseLeave,
      handleOnMouseDown,
      handleOnMouseUp,
      handleOnFocus,
      handleOnBlur,
      handleOnClick
    } = this;

    className += cls ? ' ' + cls : '';
    className += hovered ? ' free-time-range_hovered_true' : '';
    className += focused ? ' free-time-range_focused_true' : '';
    className += pressed ? ' free-time-range_pressed_true' : '';

    return (
      <FreeTimeRange
        width={width}
        className={className}
        onClick={handleOnClick}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onMouseDown={handleOnMouseDown}
        onMouseUp={handleOnMouseUp}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    );

  }
}

FreeTimeRangeContainer.propTypes = {
  width: PropTypes.string.isRequired,
  cls: PropTypes.string,
  event: PropTypes.object,
  onFreeItemMouseEnter: PropTypes.func,
  onFreeItemMouseLeave: PropTypes.func
};

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    eventActions: bindActionCreators(eventActions, dispatch),
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreeTimeRangeContainer);
