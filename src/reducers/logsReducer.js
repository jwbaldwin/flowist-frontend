import initialState from './initialState';
import {
    ADD_LOG,
	ADD_LOG_SUCCESS,
	ADD_LOG_ERROR,
	FETCH_LOGS,
	FETCH_LOGS_SUCCESS,
	FETCH_LOGS_ERROR,
    UPDATE_LOG,
	UPDATE_LOG_SUCCESS,
	UPDATE_LOG_ERROR,
	DELETE_LOG,
	DELETE_LOG_SUCCESS,
	DELETE_LOG_ERROR
} from '../actions/actionTypes';

export default function logs(state = initialState.logsDebug, action) {
	switch (action.type) {
		case ADD_LOG:
            console.log(action.type)
			return { ...state, isLoading: true };
		case ADD_LOG_SUCCESS:
			return { ...state, data: [...state.data, action.data], isLoading: false };
		case ADD_LOG_ERROR:
            console.log(action.type + ": " + action.data)
			return { ...state, isLoading: false };
        case FETCH_LOGS:
			return { ...state, isLoading: true };
		case FETCH_LOGS_SUCCESS:
			return { ...state, data: action.data, isLoading: false };
		case FETCH_LOGS_ERROR:
			return { ...state, isLoading: false };
        case UPDATE_LOG:
			return { ...state, isLoading: true };
		case UPDATE_LOG_SUCCESS:
		const updatedData = state.data.map(log => {
			if (log.id === action.data.id){
			  return { ...log, ...action.data }
			}
			return log;
		  })
			return { ...state, data: updatedData, isLoading: false };
		case UPDATE_LOG_ERROR:
			return { ...state, isLoading: false };
		case DELETE_LOG:
			return { ...state, isLoading: true };
		case DELETE_LOG_SUCCESS:
			return {
				...state,
                data: state.data.filter(item => item.id !== action.data),
                isLoading: false
                };
		case DELETE_LOG_ERROR:
			return { ...state, isLoading: false };
		default:
			return state;
	}
}
