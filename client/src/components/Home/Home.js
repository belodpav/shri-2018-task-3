import React from 'react';
import './Home.css';
import TimeGridBackground from '../TimeGrid/TimeGridBackground';
import Header from '../Header/Header';
import Logo from '../Logo/Logo';
import ButtonContainer from '../../containers/ButtonContainer/ButtonContainer';
import DateControlContainer from '../../containers/DateControlContainer/DateControlContainer';
import ToolTipContainer from '../../containers/ToolTipContainer/ToolTipContainer';
import TimeLineRule from '../TimeGrid/TimeLineRule';
import ContentContainer from '../../containers/ContentContainer/ContentContainer';
import { ModalCreate } from '../Modal/Modal';
 
const Home = (props) => {
  const {
    activeEvent,
    isModalCreated,
    date,
    tooltip,
    isToolTipActive,
    onOk,
    onCreateNewEvent,
    onClickOutToolTip } = props;
  
  return (
    <div>
      <Header>
        <Logo />
        <ButtonContainer touchHidden={true} onClick={onCreateNewEvent} theme="active">Создать встречу</ButtonContainer>
      </Header>
      <div onClick={onClickOutToolTip} className="home">
        <div className="home__time time">
          <div className="home__aside">
            <DateControlContainer cls="home__date-control" />
          </div>
          <TimeLineRule className="home__timeline" date={date} />
        </div>
        <div className="home__body">
          <ContentContainer cls="home__content" />
          <div className="home__aside home__rooms"></div>
          <TimeGridBackground className="home__timegrid" />
        </div>
      </div>
      { isToolTipActive ? 
        <ToolTipContainer 
          style={{top: tooltip.top, left: tooltip.left}}
          styleTriangle={{left: tooltip.triangleLeft}} 
          event={activeEvent} 
          cls={tooltip.classN}
        /> : ""}
      {isModalCreated ?
        <ModalCreate
          onOk={onOk}
          date={activeEvent.dateStart.format('D MMMM')}
          timeRange={activeEvent.dateStart.format('HH:mm') + '—' + activeEvent.dateEnd.format('HH:mm')}
          roomTitle={activeEvent.room.title}
          roomFloor={activeEvent.room.floor}
        />
        : ""
      }     
    </div>
  );
}

export default Home;
