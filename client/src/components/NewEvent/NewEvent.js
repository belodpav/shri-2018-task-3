import React, { Component } from 'react';

import './NewEvent.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as pageActions from './../../actions/PageActions';
import * as eventActions from './../../actions/EventActions';

import Header from '../Header/Header';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';

import Editor from '../Editor/Editor';

class NewEvent extends Component {
	handleCreateEvent(event) {
		console.log(event);
		const { createEvent } = this.props.eventActions;
		createEvent(event);
	}
	render() {
		const { activeEvent } = this.props.events;
		const { openHomePage } = this.props.pageActions;
		const { users } = this.props.users;
		const { date } = this.props.date;
		return (
			<div>
				<Header>
					<Logo />
				</Header>
				<div className="new-meeting">
					<Editor
						date={date}
						event={activeEvent}
						users={users}
						className="new-meeting__editor"
						title="Новая встреча"
						events={this.props.events.events}
						rooms={this.props.rooms.rooms}
						onCancle={openHomePage}
						onCreateEvent={this.handleCreateEvent.bind(this)}
					>
					</Editor>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
  return {
    events: state.events,
    users: state.users,
    rooms: state.rooms,
    date: state.date
  }
}
function mapDispatchToProps(dispatch) {
  return {
  	pageActions: bindActionCreators(pageActions, dispatch),
  	eventActions: bindActionCreators(eventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);

