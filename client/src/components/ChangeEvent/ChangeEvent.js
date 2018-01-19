import React, { Component } from 'react';
 
import './ChangeEvent.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as pageActions from './../../actions/PageActions';
import * as eventActions from './../../actions/EventActions';
 
import Header from '../Header/Header';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';

import EditorContainer from '../../containers/EditorContainer/EditorContainer';
import EditorItem from '../Editor/EditorItem';



class ChangeEvent extends Component {
	
	handleRemoveEvent(event) {
		const { removeEvent } = this.props.eventActions;
		removeEvent(event);
	}
	handleSaveEvent(event) {
		const { openHomePage } = this.props.pageActions;
		const { updateEvent } = this.props.eventActions;
		updateEvent(event);
		openHomePage();
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
				<div className="change-meeting">
					<EditorContainer
						date={date}
						event={activeEvent}
						users={users}
						cls="new-meeting__editor"
						title="Редактирование встречи"
						events={this.props.events.events}
						rooms={this.props.rooms.rooms}
						onGoHome={openHomePage}
						onSaveEvent={this.handleSaveEvent.bind(this)}
						onRemoveEvent={this.handleRemoveEvent.bind(this)}
					/>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
  return {
    events: state.events,
    rooms: state.rooms,
    users: state.users,
    date: state.date
  }
}
function mapDispatchToProps(dispatch) {
  return {
  	pageActions: bindActionCreators(pageActions, dispatch),
  	eventActions: bindActionCreators(eventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEvent);
