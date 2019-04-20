import {combineReducers} from 'redux';
import flow from './flowReducer';
import logs from './logsReducer'
import user from './userReducer';
import settings from './settingsReducer';

const rootReducer = combineReducers({
  flow,
  logs,
  user,
  settings
});

export default rootReducer;