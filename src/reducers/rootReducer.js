import {combineReducers} from 'redux';
import flow from './flowReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  flow,
  user
});

export default rootReducer;