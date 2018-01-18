import React, { Component } from 'react';

import './Editor.css';

import { CircleButtonClose } from '../CircleButton/CircleButton';


import EditorPersonsBox from '../Editor/EditorPersonsBox';
import EditorPerson from '../Editor/EditorPerson';
import EditorTitle from '../Editor/EditorTitle';
import EditorBody from '../Editor/EditorBody';
import EditorItem from '../Editor/EditorItem';
import EditorItemDate from '../Editor/EditorItemDate';
import EditorItemTime from '../Editor/EditorItemTime';
import EditorValidator from '../Editor/EditorValidator';

import { ModalRemove, ModalCreate } from '../Modal/Modal';

import { RoomItemCurrent, RoomItem } from '../RoomItem/RoomItem';

import InputText from '../Input/InputText';
import InputDate from '../Input/InputDate';
import InputAutocomplete from '../Input/InputAutocomplete';
import Button from '../Button/Button';

//import getRecomendation from '../../scripts/getRecomendation.js';
import { getRecomendation, getRecomendation__2 } from '../../scripts/getRecomendation__process.js';

import moment from 'moment';
import 'moment/locale/ru.js';

import TimePickerContainer from '../../containers/TimePickerContainer/TimePickerContainer';

moment.locale('ru');


function getAvailablePeople(allUsers, users) {
	let availableUsers = [];
	
	availableUsers = allUsers.filter( user => {
		
		for (let i = 0; i < users.length; i++) {
			if (users[i].id === user.id) return false;
		}
		return true;
	});

	return availableUsers;
}

class Editor extends Component {
	constructor(props) {
		super(props);
		const { date, event, users } = this.props;
		
		this.state = {
			isModalRemove: false,
			isModalCreate: false,
			isValid: false,
			date: date,
			eventId: event.Id,
			eventName: event.title,
			dateStart: event.dateStart,
			dateEnd: event.dateEnd,
			peopleAvailable: getAvailablePeople(users, event.users),
			members: event.users,
			room: event.room,
			validateMessage: '',
			changedEvents: []
		}


		this.handleChangeEventName = this.handleChangeEventName.bind(this);
		this.handleSelected = this.handleSelected.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleChangeDateStart = this.handleChangeDateStart.bind(this);
		this.handleChangeDateEnd = this.handleChangeDateEnd.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleClearRoom = this.handleClearRoom.bind(this);
		this.handleSetRoom = this.handleSetRoom.bind(this);
		this.handleSaveEvent = this.handleSaveEvent.bind(this);
		this.handleCreateEvent = this.handleCreateEvent.bind(this);
		this.handleRemoveEvent = this.handleRemoveEvent.bind(this);
		this.handleValidate = this.handleValidate.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleRemoveButton = this.handleRemoveButton.bind(this);
		this.handleOk = this.handleOk.bind(this);
		this.handleUpdateEvents = this.handleUpdateEvents.bind(this);
	}

	handleUpdateEvents(changedEvents) {
		if (changedEvents.length) {
			this.setState({changedEvents: changedEvents});
		} else {
			this.setState({changedEvents: []})
		}
		console.log('----------');
		console.log(changedEvents);
		
	}

	handleOk() {
		this.props.onCancle();
	}
	handleRemoveButton() {
		this.setState({isModalRemove:true});
	}
	handleCancel() {
		this.setState({isModalRemove: false});
	}
	validator(event) {
    const title = event.eventName.trim();
    if (title.length === 0) {
      return 'Введите название темы';
    }
    if (event.members.length === 0) {
      return 'Ввыберите участников';
    }
    if (!event.room.id) {
      return 'Выберете переговорку';
    }
    return '';
  }
	handleValidate(value) {
		this.setState({
			isValid: value
		})
	}
	handleRemoveEvent() {
		const event = {
			id: this.props.event.id,
			title: this.state.eventName,
			dateStart: this.state.dateStart,
			dateEnd: this.state.dateEnd,
			users: this.state.members,
			room: this.state.room
		};
		this.props.onRemoveEvent(event);
		this.props.onCancle();
	}
	handleCreateEvent() {
		const event = {
			title: this.state.eventName,
			dateStart: this.state.dateStart,
			dateEnd: this.state.dateEnd,
			users: this.state.members,
			room: this.state.room
		};

		const changedEvents = this.state.changedEvents;
		changedEvents.forEach( event => {
			this.props.onUpdateChangedEvents(event);
		});

		this.props.onCreateEvent(event);
		// Change it
		this.setState({isModalCreate: true});
	}
	handleSaveEvent() {
		const event = {
			id: this.props.event.id,
			title: this.state.eventName,
			dateStart: this.state.dateStart,
			dateEnd: this.state.dateEnd,
			users: this.state.members,
			room: this.state.room
		};

		/*const changedEvents = this.state.changedEvents;
		changedEvents.forEach( event => {
			this.props.onSaveEvent(event);
		});*/

		
		this.props.onSaveEvent(event);
	}
	handleClearRoom() {
		this.setState({
			room: {}
		});
	}
	handleSetRoom(value) {
		this.setState({
			room: value
		});
	}
	handleChangeEventName(value) {
		this.setState(
			{
				eventName: value
			}
		);
	}
	handleSelected(value) {
		const peopleAvailableNew = this.state.peopleAvailable.filter( person => 
			person.id !== value.id
		);
		this.setState({
			members: [...this.state.members, value],
			peopleAvailable: peopleAvailableNew
		});
		console.log('yyy',this.state.members + 1, this.state.room.capacity);
		if (this.state.room.capacity && (this.state.members.length + 1 > this.state.room.capacity)) {
			this.setState({
				room: {}
			});
		}
		
	}
	handleDeleteClick(value) {
		const membersNew = this.state.members.filter( person => 
			person.id !== value.id
		);
		this.setState({
			members: membersNew,
			peopleAvailable: [...this.state.peopleAvailable, value]
		})
	}
	handleChangeDateStart(value) {
		const dStart = this.state.dateStart;
		const dEnd = this.state.dateEnd;

		const list = value.split(':');
		const hour = +list[0];
		const minutes = +list[1];

		const dateStartSettings = [
				dStart.get('year'),
				dStart.get('month'),
				dStart.get('date'),
				hour,
				minutes,
				0
		];
		const date = moment(dateStartSettings);

		if (date.hour() === dStart.hour() && date.minutes() === dStart.minutes()) {
			return;
		}

		if (dEnd.isBefore(date)) {
			this.setState({
				dateEnd: date.clone().add(15, 'minutes'),
				dateStart: date,
				room: {}
			});
		} else {
			this.setState({
				dateStart: date,
				room: {}
			});
		}
		

	}
	handleChangeDateEnd(value) {
		const dStart = this.state.dateStart;
		const dEnd = this.state.dateEnd;

		const list = value.split(':');
		const hour = +list[0];
		const minutes = +list[1];

		const dateEndSettings = [
				dEnd.get('year'),
				dEnd.get('month'),
				dEnd.get('date'),
				hour,
				minutes,
				0
		];
		const date = moment(dateEndSettings);

		if (date.hour() === dEnd.hour() && date.minutes() === dEnd.minutes()) {
			return;
		}

		if (date.isBefore(dStart)) {
			date.add(15, 'minutes');
		}
		this.setState({
			dateEnd: date,
			room: {}
		});
	}
	handleDateChange(value) {
		const oldDateStart = this.state.dateStart,
			  oldDateEnd = this.state.dateEnd;
		
		const dateStartSettings = [
				value.get('year'),
				value.get('month'),
				value.get('date'),
				oldDateStart.get('hour'),
				oldDateStart.get('minute'),
				0
		];

		const dateEndSettings = [
				value.get('year'),
				value.get('month'),
				value.get('date'),
				oldDateEnd.get('hour'),
				oldDateEnd.get('minute'),
				0
		];
		
		
		const newStart = moment(dateStartSettings);
		const newEnd = moment(dateEndSettings);

		this.setState({
			dateStart: newStart,
			dateEnd: newEnd
		})
	}
	componentDidMount() {
		const message = this.validator(this.state);
		if (message === '') {
			this.setState({isValid: true, validateMessage: message});
		} else {
			this.setState({isValid: false, validateMessage: message});
		}
	}
	componentDidUpdate(prevProps, prevState) {
		const oldMessage = prevState.validateMessage;
		const message = this.validator(this.state);
		if (message !== oldMessage) {
			if (message === '') {
				this.setState({isValid: true, validateMessage: message});
			} else {
				this.setState({isValid: false, validateMessage: message});
			}
		} 
		
	}
	render() {
		const { dateStart, dateEnd } = this.state;
		const {
				className,
				title
			} = this.props;
			let recoms = [];
		const data = {
			eventId: this.props.event.id || -99,
			timeStart: this.state.dateStart,
			timeEnd: this.state.dateEnd,
			members: this.state.members,
			rooms: this.props.rooms,
			events: this.props.events
		};
	if (!this.state.room.id && !dateStart.isSame(dateEnd) && dateStart.isBefore(dateEnd)) {
		recoms = getRecomendation(data);
		if (!recoms.length) {
			 	recoms = getRecomendation__2(data);
		}
	}

		return (
		<div>
			<div className={"editor " + className}>
				<div className="editor__header">
					<EditorTitle title={title} />
					<CircleButtonClose onClick={this.props.onCancle} className="editor__header-close" />
				</div>
				<EditorBody>
					<EditorItem label="Тема">
						<InputText onChange={this.handleChangeEventName} value={this.state.eventName} placeholder="О чем будем говорить?" />
					</EditorItem>
					
					<EditorItem className="editor__row editor__item_space_bottom" >
						<EditorItemDate className="editor__item-date" label="Дата">
							<InputDate 
								date={this.state.dateStart}
								onDateChange={this.handleDateChange}
							/>
						</EditorItemDate>
						<EditorItemTime label="Начало">
							<TimePickerContainer
					        value={dateStart.format('HH:mm')}
					        onChange={this.handleChangeDateStart}
					        minTime='08:00'
					        maxTime='22:45'
					    />
						</EditorItemTime>
						<div className="editor__item_touch_no-label">
							<label className="editor__label">&nbsp;</label>
							<div className="editor__item-time-dash">&mdash;</div>
						</div>
						<EditorItemTime label="Конец">
							<TimePickerContainer
					        value={dateEnd.format('HH:mm')}
					        onChange={this.handleChangeDateEnd}
					        minTime={dateStart.clone().add(15,'minutes').format('HH:mm')}
					        maxTime='23:00'
					    />
						</EditorItemTime>
					</EditorItem>
					<EditorItem className="editor__item_space_bottom" label="Участники">
						<InputAutocomplete 
							placeholder="Например, Иван Пупкин"
							list={this.state.peopleAvailable}
							onSelected={this.handleSelected}
						/>
						<EditorPersonsBox>
							{
								this.state.members.map( person => {
									return <EditorPerson
												key={person.id}
												person={person}
												onClick={this.handleDeleteClick}
											/>
								})
							}
						</EditorPersonsBox>
					</EditorItem>
					{ this.state.room.id ? 
					<EditorItem className="editor__item_space_bottom" label="Выбранная переговорка">
						<RoomItemCurrent 
							timeStart={this.state.dateStart.format('HH:mm')}
							timeEnd={this.state.dateEnd.format('HH:mm')}
							room={this.state.room}
							onClearRoom={this.handleClearRoom}
							/>
					</EditorItem>
					: (recoms.length) ?
					<EditorItem className="editor__item_space_bottom" label="Рекомендованные переговорки">
						{
							recoms.map( item => {
								const room = item.room;
								return <RoomItem
													key={room.id}
													timeStart={this.state.dateStart.format('HH:mm')}
													timeEnd={this.state.dateEnd.format('HH:mm')}
													room={room}
													onSetRoom={this.handleSetRoom}
													onUpdateEvents={this.handleUpdateEvents}
													changedEvents={item.changedEvents}
												/>
							})
						}
					</EditorItem> : "" 
					}
						{this.props.children}
						<EditorItem className="editor__item_touch_visible editor__item_space_bottom change-meeting__button ">
							<div onClick={this.handleRemoveButton} className="editor__item-delete">
								Удалить встречу
							</div>
						</EditorItem>
						<div className="editor__submit-bar_touch">
							{this.state.isValid ? "" : <EditorValidator message={this.state.validateMessage} />}
							<Button  onClick={this.props.onCancle} className="editor__button">Отмена</Button>
						 	<Button  onClick={this.handleSaveEvent} className="change-meeting__button" theme="active" disabled={!this.state.isValid}>Сохранить</Button>
						 	<Button  onClick={this.handleCreateEvent} className="new-meeting__button"  theme="active" disabled={!this.state.isValid}>Создать встречу</Button>
						</div>
						<div className="change-meeting__footer submit-bar">
						 	<Button  onClick={this.props.onCancle} className="submit-bar__button ">Отмена</Button>
						 	<Button  onClick={this.handleRemoveButton} className="submit-bar__button change-meeting__button" >Удалить встречу</Button>
						 	<Button onClick={this.handleSaveEvent} className="submit-bar__button change-meeting__button" disabled={!this.state.isValid} >Сохранить</Button>
						 	<Button onClick={this.handleCreateEvent} className="submit-bar__button new-meeting__button" disabled={!this.state.isValid} theme="active">Создать встречу</Button>
						</div>
				</EditorBody>
			</div>
			{this.state.isModalRemove ?
				<ModalRemove 
							onCancel={this.handleCancel}
							onRemoveEvent={this.handleRemoveEvent}
				/>
				: ""
			}
			{this.state.isModalCreate ?
				<ModalCreate
							onOk={this.handleOk}
							date={this.state.dateStart.format('D MMMM')}
							timeRange={this.state.dateStart.format('HH:mm') + '—' + this.state.dateEnd.format('HH:mm')}
							roomTitle={this.state.room.title}
							roomFloor={this.state.room.floor}
				/>
				: ""
			}
		</div>
		);
	}
}

export default Editor;