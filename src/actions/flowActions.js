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
} from './actionTypes';

const FLOW_API_URL = '/api/flow';

/*
* FETCH FLOW ACTIONS
*/

export function fetchFlow() {
	return (dispatch) => {
        dispatch(fetchFlowRequest())
		return fetch(FLOW_API_URL, {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((json) => {
				if (json.length !== 0) {
					dispatch(fetchFlowSuccess(json));
				} else {
					dispatch(fetchFlowError('Empty JSON returned from API'));
				}
			})
			.catch((error) => dispatch(fetchFlowError(error)));
	};
}

function fetchFlowRequest() {
	return {
		type: FETCH_FLOW
	};
}

export function fetchFlowSuccess(data) {
	return {
		type: FETCH_FLOW_SUCCESS,
		data: data[0]
	};
}

export function fetchFlowError(error) {
	return {
		type: FETCH_FLOW_ERROR,
		error: error
	};
}

/*
* ADD FLOW ACTIONS
*/

export function addFlow(flow) {
	return (dispatch) => {
        dispatch(addFlowRequest())
		return fetch(FLOW_API_URL, {
			method: 'POST',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(flow)
		})
			.then((response) => response.json())
			.then((json) => dispatch(addFlowSuccess(json)))
			.catch((error) => dispatch(addFlowError(error)));
	};
}

function addFlowRequest() {
	return { type: ADD_FLOW };
}

export function addFlowSuccess(data) {
	return {
		type: ADD_FLOW_SUCCESS,
		data: data
	};
}

export function addFlowError(error) {
	return {
		type: ADD_FLOW_ERROR,
		error: error
	};
}

/*
* DELETE FLOW ACTIONS
*/

export function deleteFlow(id) {
	return (dispatch) => {
		dispatch(deleteFlowRequest);
		return fetch(FLOW_API_URL + '/' + id, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		})
			.then((response) => {
				if (response.status === 200) {
					dispatch(deleteFlowSuccess(id));
				}
			})
			.catch((error) => dispatch(deleteFlowError(error)));
	};
}

export function deleteFlowRequest() {
	return {
		type: DELETE_FLOW
	};
}

export function deleteFlowSuccess(id) {
	return {
		type: DELETE_FLOW_SUCCESS,
        data: id
	};
}

export function deleteFlowError(error) {
	return {
		type: DELETE_FLOW_ERROR,
		error: error
	};
}
