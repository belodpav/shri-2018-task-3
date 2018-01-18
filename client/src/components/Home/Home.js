import React, { Component } from 'react';
import moment from 'moment';
import './Home.css';
import TimeGridBackground from '../TimeGrid/TimeGridBackground';
import Header from '../Header/Header';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import DateControlContainer from '../../containers/DateControlContainer/DateControlContainer';
import ToolTip from '../ToolTip/ToolTip';
import TimeLineRule from '../TimeGrid/TimeLineRule';
import Content from '../Content/Content';
 
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
        <Button touchHidden={true} onClick={onCreateNewEvent} theme="active">Создать встречу</Button>
      </Header>
      <div onClick={onClickOutToolTip} className="home">
          <div className="home__time time">
            <div className="home__aside">
              <DateControlContainer cls="home__date-control" />
            </div>
            <TimeLineRule className="home__timeline" date={date} />
          </div>
          <div className="home__body">
            <Content className="home__content" />
            <div className="home__aside home__rooms"></div>
            <TimeGridBackground className="home__timegrid" />
          </div>
      </div>
      { isToolTipActive ? 
        <ToolTip 
          style={{top: tooltip.top, left: tooltip.left}}
          styleTriangle={{left: tooltip.triangleLeft}} 
          event={activeEvent} 
          className={tooltip.classN}
        /> : ""}
          
    </div>
  );

}


export default Home;
