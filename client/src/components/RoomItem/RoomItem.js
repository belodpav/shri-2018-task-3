import React from 'react';

import './RoomItem.css'; 

const RoomItem = ({onSetRoom, onUpdateEvents, changedEvents, timeStart, timeEnd, room}) => {
  function handleClick() {
    if (onUpdateEvents && changedEvents) {
      onUpdateEvents(changedEvents);
    }
    onSetRoom(room);
  }
  return (
    <div onClick={handleClick} className="editor__room room-item">
        <div className="room-item__time-range">{timeStart}&mdash;{timeEnd}</div>
        <div className="room-item__name">{room.title} · {room.floor} этаж</div>
    </div>
  );
}

const RoomItemCurrent = ({onClearRoom, timeStart, timeEnd, room}) => {

  return (
    <div  className="editor__room room-item room-item_state_current">
        <div className="room-item__time-range">{timeStart}&mdash;{timeEnd}</div>
        <div className="room-item__name">{room.title} · {room.floor} этаж</div>
        <span onClick={onClearRoom} className="room-item__clear room-item__clear_visible icon icon_type_close-white"></span>
    </div>
  );
}

export { RoomItemCurrent, RoomItem };