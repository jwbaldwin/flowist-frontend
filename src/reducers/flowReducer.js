import initialState from './initialState';
import {
	FETCH_FLOW,
	FETCH_FLOW_SUCCESS,
	FETCH_FLOW_ERROR,
	ADD_FLOW,
	ADD_FLOW_SUCCESS,
	ADD_FLOW_ERROR,
	DELETE_FLOW,
	DELETE_FLOW_SUCCESS,
	DELETE_FLOW_ERROR
} from '../actions/actionTypes';

export default function flow(state = initialState.flow, action) {
	switch (action.type) {
		case FETCH_FLOW:
			console.log('FETCH_FLOW');
			return { ...state, isLoading: true };
		case FETCH_FLOW_SUCCESS:
			console.log('FETCH_FLOW_SUCCESS');
			return { ...state, data: action.data, isLoading: false };
		case FETCH_FLOW_ERROR:
			console.log('FETCH_FLOW_ERROR: ' + action.error);
			return { ...state, isLoading: false };
		case ADD_FLOW:
			console.log('ADD_FLOW');
			return { ...state, isLoading: true };
		case ADD_FLOW_SUCCESS:
			console.log('ADD_FLOW_SUCCESS');
			return { ...state, data: action.data, isLoading: false };
		case ADD_FLOW_ERROR:
			console.log('ADD_FLOW_ERROR: ' + action.error);
			return { ...state, isLoading: false };
		case DELETE_FLOW:
			console.log('DELETE_FLOW');
			return { ...state, isLoading: true };
		case DELETE_FLOW_SUCCESS:
			console.log('DELETE_FLOW_SUCCESS');
			return {
                ...state.filter(flow => flow.id !== action.data),
                isLoading: false
                };
		case DELETE_FLOW_ERROR:
			console.log('DELETE_FLOW_ERROR: ' + action.error);
			return { ...state, isLoading: false };
		default:
			return state;
	}
}
