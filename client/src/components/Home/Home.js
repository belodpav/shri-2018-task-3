import React, { Component } from 'react';
import moment from 'moment';
import './Home.css';
import TimeGridBackground from '../TimeGrid/TimeGridBackground';
import Header from '../Header/Header';
import Logo from '../Logo/Logo';
import ButtonContainer from '../../containers/ButtonContainer/ButtonContainer';
import DateControlContainer from '../../containers/DateControlContainer/DateControlContainer';
import ToolTipContainer from '../../containers/ToolTipContainer/ToolTipContainer';
import TimeLineRule from '../TimeGrid/TimeLineRule';
import ContentContainer from '../../containers/ContentContainer/ContentContainer';
 
const Home = (props) => {
  const {
    activeEvent,
    date,
    tooltip,
    isToolTipActive,
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
    </div>
  );
}

export default Home;
