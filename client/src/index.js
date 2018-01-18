import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import AppContainer from './containers/AppContainer/AppContainer';

import shortCutFollowActivate from './scripts/shortCutFollow.js';
import './scripts/shortCutFollow.css';

import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>
, document.getElementById('root'));

