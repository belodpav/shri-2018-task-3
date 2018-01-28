import { combineReducers } from 'redux';

import events from './events';
import date from './date';
import page from './page';
import rooms from './rooms';
import diagram from './diagram';
import tooltip from './tooltip';
import users from './users';

export default combineReducers({
  events,
  date,
  page,
  rooms,
  diagram,
  tooltip,
  users
});