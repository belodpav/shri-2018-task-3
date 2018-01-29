import React from 'react';
import './ToolTip.css';
 
import { Person } from '../Person/Person';
import CircleButtonContainer from '../../containers/CircleButtonContainer/CircleButtonContainer';


const ToolTip = (props) => {
  const {
    className,
    style,
    onEditClick,
    styleTriangle,
    event,
    membersCountStr 
  } = props;

  return (
  <div className={className} style={style}>
    <span className="tooltip__triangle" style={styleTriangle} />
    <CircleButtonContainer 
      cls="tooltip__edit"
      hasIcon={true}
      iconType="edit"
      onClick={onEditClick}
    />
    <div className="tooltip__title">
      { event.title }
    </div>
    <div className="tooltip__info">
        <span className="tooltip__date">{event.dateStart.format('D MMMM')}</span>
        <span className="tooltip__time-range">
        ,&nbsp;{event.dateStart.format('HH:mm')}&mdash;{event.dateEnd.format('HH:mm')}&nbsp;&middot;&nbsp;</span>
        <span className="tooltip__room">{event.room.title}</span>
    </div>
    <div className="tooltip__people">
      <Person name={event.users[0].login} avatarUrl={event.users[0].avatarUrl} />
      {membersCountStr ?
        <div className="tooltip__people-count">&nbsp;и {membersCountStr}</div>
        : ""
      }
    </div>
  </div>
  );  
 
};


export default ToolTip;

