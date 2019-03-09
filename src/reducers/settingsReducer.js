import initialState from './initialState';
import {
	FETCH_SETTINGS,
	FETCH_SETTINGS_SUCCESS,
	FETCH_SETTINGS_ERROR,
	UPDATE_SETTINGS,
	UPDATE_SETTINGS_SUCCESS,
	UPDATE_SETTINGS_ERROR
} from '../actions/actionTypes';

export default function settings(state = initialState.settings, action) {
	switch (action.type) {
		case FETCH_SETTINGS:
			console.log('FETCH_SETTINGS');
			return { ...state, isLoading: true };
		case FETCH_SETTINGS_SUCCESS:
			console.log('FETCH_SETTINGS_SUCCESS');
			return { ...state, settings: action.data, isLoading: false };
		case FETCH_SETTINGS_ERROR:
			console.log('FETCH_SETTINGS_ERROR: ' + action.error);
			return { ...state, isLoading: false };
		case UPDATE_SETTINGS:
			console.log('UPDATE_SETTINGS');
			return { ...state };
		case UPDATE_SETTINGS_SUCCESS:
			console.log('UPDATE_SETTINGS_SUCCESS');
			return { ...action.data };
		case UPDATE_SETTINGS_ERROR:
			console.log('UPDATE_SETTINGS_ERROR: ' + action.error);
			return { ...state };
		default:
			return state;
	}
}
