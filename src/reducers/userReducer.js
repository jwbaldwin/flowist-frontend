import initialState from './initialState';
import {
	FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR
} from '../actions/actionTypes';

export default function user(state = initialState.user, action) {
	switch (action.type) {
		case FETCH_USER:
			console.log('FETCH_USER');
			return { ...state, isLoading: true };
		case FETCH_USER_SUCCESS:
			console.log('FETCH_USER_SUCCESS');
			return { ...state, data: action.data, isLoading: false };
		case FETCH_USER_ERROR:
			console.log('FETCH_USER_ERROR: ' + action.error);
			return { ...state, isLoading: false };
		default:
			return state;
	}
}
