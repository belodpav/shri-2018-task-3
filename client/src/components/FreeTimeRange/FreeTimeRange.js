import React, { Component } from 'react';
import './FreeTimeRange.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as eventActions from './../../actions/EventActions';
import * as pageActions from './../../actions/PageActions';
import {
  HOME_PAGE,
  NEW_EVENT_PAGE
} from '../../constants/appConstants';

const FreeTimeRange = ({room, width, event, eventActions, pageActions}) => {
  function handleClick() {
    eventActions.setActiveEvent(event);
    pageActions.openNewEventPage();
  }
	return (
		<div onClick={handleClick} className="free-time-range" style={{width: width}}>
			<div className="free-time-range__add">
				<span className="free-time-range__plus-icon icon icon_type_plus"></span>
			</div>
		</div>
	);
}

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
export default connect(mapStateToProps, mapDispatchToProps)(FreeTimeRange);
