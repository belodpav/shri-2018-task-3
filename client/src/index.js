import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/App/App';

import shortCutFollowActivate from './scripts/shortCutFollow.js';
import './scripts/shortCutFollow.css';

import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(<Provider store={store}>
                  <App />
                </Provider>
              , document.getElementById('root'));

