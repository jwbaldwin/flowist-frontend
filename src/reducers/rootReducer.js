import {combineReducers} from 'redux';
import flow from './flowReducer';
import user from './userReducer';
import settings from './settingsReducer';

const rootReducer = combineReducers({
  flow,
  user,
  settings
});

export default rootReducer;