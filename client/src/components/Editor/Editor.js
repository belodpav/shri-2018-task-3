import React, { Component } from 'react';
import moment from 'moment';
import './Editor.css';

import CircleButtonContainer from '../../containers/CircleButtonContainer/CircleButtonContainer';

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
import ButtonContainer from '../../containers/ButtonContainer/ButtonContainer';
import TimePickerContainer from '../../containers/TimePickerContainer/TimePickerContainer';




const Editor = (props) => {
	const {
		className,
		title,
		eventName,
		dateStart,
		dateEnd,
		peopleAvailable,
		members,
		room,
		isValid,
		validateMessage,
		isModalRemove,
		isModalCreate,
		roomRecomendations,
		onGoHome,
    onUpdateEvents,
    onOk,
    onRemoveButton,
    onCancel,
    onValidate,
    onRemoveEvent,
    onCreateEvent,
    onSaveEvent,
    onClearRoom,
    onSetRoom,
    onChangeEventName,
    onSelected,
    onDeleteClick,
    onChangeDateStart,
    onChangeDateEnd,
    onDateChange
	} = props;
	return (
	<div>
		<div className={className}>
			<div className="editor__header">
				<EditorTitle title={title} />
				<CircleButtonContainer
					cls="editor__header-close"
					hasIcon={true}
					iconType="close"
					onClick={onGoHome}
				/>
			</div>
			<EditorBody>
				<EditorItem label="Тема">
					<InputText onChange={onChangeEventName} value={eventName} placeholder="О чем будем говорить?" />
				</EditorItem>
				
				<EditorItem className="editor__row editor__item_space_bottom" >
					<EditorItemDate className="editor__item-date" label="Дата">
						<InputDate 
							date={dateStart}
							onDateChange={onDateChange}
						/>
					</EditorItemDate>
					<EditorItemTime label="Начало">
						<TimePickerContainer
				        value={dateStart.format('HH:mm')}
				        onChange={onChangeDateStart}
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
				        onChange={onChangeDateEnd}
				        minTime={dateStart.clone().add(15,'minutes').format('HH:mm')}
				        maxTime='23:00'
				    />
					</EditorItemTime>
				</EditorItem>
				<EditorItem className="editor__item_space_bottom" label="Участники">
					<InputAutocomplete 
						placeholder="Например, Иван Пупкин"
						list={peopleAvailable}
						onSelected={onSelected}
					/>
					<EditorPersonsBox>
						{
							members.map( person => {
								return <EditorPerson
											key={person.id}
											person={person}
											onClick={onDeleteClick}
										/>
							})
						}
					</EditorPersonsBox>
				</EditorItem>
				{ room.id ? 
				<EditorItem className="editor__item_space_bottom" label="Выбранная переговорка">
					<RoomItemCurrent 
						timeStart={dateStart.format('HH:mm')}
						timeEnd={dateEnd.format('HH:mm')}
						room={room}
						onClearRoom={onClearRoom}
						/>
				</EditorItem>
				: (roomRecomendations.length) ?
				<EditorItem className="editor__item_space_bottom" label="Рекомендованные переговорки">
					{
						roomRecomendations.map( item => {
							const room = item.room;
							return <RoomItem
												key={room.id}
												timeStart={dateStart.format('HH:mm')}
												timeEnd={dateEnd.format('HH:mm')}
												room={room}
												onSetRoom={onSetRoom}
												onUpdateEvents={onUpdateEvents}
												changedEvents={item.changedEvents}
											/>
						})
					}
				</EditorItem> : "" 
				}
					<EditorItem className="editor__item_touch_visible editor__item_space_bottom change-meeting__button ">
						<div onClick={onRemoveButton} className="editor__item-delete">
							Удалить встречу
						</div>
					</EditorItem>
					<div className="editor__submit-bar_touch">
						{isValid ? "" : <EditorValidator message={validateMessage} />}
						<ButtonContainer  
							onClick={onGoHome}
							cls="editor__button"
						>
							Отмена
						</ButtonContainer>
					 	<ButtonContainer  
					 		onClick={onSaveEvent}
					 		cls="change-meeting__button"
					 		theme="active"
					 		disabled={!isValid}
					 	>
					 		Сохранить
					 	</ButtonContainer>
					 	<ButtonContainer  
					 		onClick={onCreateEvent}
					 		cls="new-meeting__button"
					 		theme="active" 
					 		disabled={!isValid}
					 	>
					 		Создать встречу
					 	</ButtonContainer>
					</div>
					<div className="change-meeting__footer submit-bar">
					 	<ButtonContainer
					 		onClick={onGoHome}
					 		cls="submit-bar__button "
					 	>
					 		Отмена
					 	</ButtonContainer>
					 	<ButtonContainer
					 		onClick={onRemoveButton}
					 		cls="submit-bar__button change-meeting__button"
					 	>
					 		Удалить встречу
					 	</ButtonContainer>
					 	<ButtonContainer
					 		onClick={onSaveEvent}
					 		cls="submit-bar__button change-meeting__button"
					 		disabled={!isValid}
					 	>
					 		Сохранить
					 	</ButtonContainer>
					 	<ButtonContainer
					 		onClick={onCreateEvent}
					 		cls="submit-bar__button new-meeting__button"
					 		disabled={!isValid}
					 		theme="active"
					 	>
					 		Создать встречу
					 	</ButtonContainer>
					</div>
			</EditorBody>
		</div>
		{isModalRemove ?
			<ModalRemove 
						onCancel={onCancel}
						onRemoveEvent={onRemoveEvent}
			/>
			: ""
		}
		{isModalCreate ?
			<ModalCreate
						onOk={onOk}
						date={dateStart.format('D MMMM')}
						timeRange={dateStart.format('HH:mm') + '—' + dateEnd.format('HH:mm')}
						roomTitle={room.title}
						roomFloor={room.floor}
			/>
			: ""
		}
	</div>
	);

};

export default Editor;