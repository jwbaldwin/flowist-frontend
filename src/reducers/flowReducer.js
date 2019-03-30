import initialState from './initialState';
import {
    ADD_FLOW,
	ADD_FLOW_SUCCESS,
	ADD_FLOW_ERROR,
	FETCH_FLOW,
	FETCH_FLOW_SUCCESS,
	FETCH_FLOW_ERROR,
    UPDATE_FLOW,
	UPDATE_FLOW_SUCCESS,
	UPDATE_FLOW_ERROR,
	DELETE_FLOW,
	DELETE_FLOW_SUCCESS,
	DELETE_FLOW_ERROR
} from '../actions/actionTypes';

export default function flow(state = initialState.flow, action) {
	switch (action.type) {
		case ADD_FLOW:
			return { ...state, isLoading: true };
		case ADD_FLOW_SUCCESS:
			return { ...state, data: [...state.data, action.data], isLoading: false };
		case ADD_FLOW_ERROR:
			return { ...state, isLoading: false };
        case FETCH_FLOW:
			return { ...state, isLoading: true };
		case FETCH_FLOW_SUCCESS:
			return { ...state, data: action.data, isLoading: false };
		case FETCH_FLOW_ERROR:
			return { ...state, isLoading: false };
        case UPDATE_FLOW:
			return { ...state, isLoading: true };
		case UPDATE_FLOW_SUCCESS:
		const updatedData = state.data.map(flow => {
			if(flow.id === action.data.id){
			  return { ...flow, ...action.data }
			}
			return flow
		  })
			return { ...state, data: updatedData, isLoading: false };
		case UPDATE_FLOW_ERROR:
			return { ...state, isLoading: false };
		case DELETE_FLOW:
			return { ...state, isLoading: true };
		case DELETE_FLOW_SUCCESS:
		console.log(action.data)
			return {
				...state,
                data: state.data.filter(item => item.id !== action.data),
                isLoading: false
                };
		case DELETE_FLOW_ERROR:
			return { ...state, isLoading: false };
		default:
			return state;
	}
}
