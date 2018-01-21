import React, { Component } from 'react';
import './App.css';
 
import HomeContainer from '../../containers/HomeContainer/HomeContainer';
import ChangeEventContainer from '../../containers/ChangeEventContainer/ChangeEventContainer';
import NewEventContainer from '../../containers/NewEventContainer/NewEventContainer';

import {
  HOME_PAGE,
  CHANGE_EVENT_PAGE,
  NEW_EVENT_PAGE
} from '../../constants/appConstants';

const App = (props) => {

  const { page } = props;
  let appChild;

  switch(page) {
    case HOME_PAGE:
      appChild = <HomeContainer />;
      break;
    case CHANGE_EVENT_PAGE:
      appChild = <ChangeEventContainer />;
      break;
    case NEW_EVENT_PAGE:
      appChild = <NewEventContainer />;
      break;
  }

  return (
    <div className="App">
      {appChild}
    </div>
  );
}

export default App;
