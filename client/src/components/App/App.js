import React, { Component } from 'react';
import './App.css';
 
import HomeContainer from '../../containers/HomeContainer/HomeContainer';
import ChangeEvent from '../ChangeEvent/ChangeEvent';
import NewEvent from '../NewEvent/NewEvent';

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
      appChild = <ChangeEvent />;
      break;
    case NEW_EVENT_PAGE:
      appChild = <NewEvent />;
      break;
  }

  return (
    <div className="App">
      {appChild}
    </div>
  );
}

export default App;
