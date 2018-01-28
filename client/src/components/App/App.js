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

  const { page, isFetched, errorMessage } = props;
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

  if (isFetched) {
    return (
      <div className="App">
        {appChild}
      </div>
    );
  } else {
    return (
    <div id="welcome" className="welcome">
      <img className="welcome__logo" src="welcome__logo.svg"/>
      <div className={ "welcome__error-box" + (errorMessage ? " welcome__error-box_visible_true" : "") }>{errorMessage}</div>
    </div>
    );
  }
}

export default App;
