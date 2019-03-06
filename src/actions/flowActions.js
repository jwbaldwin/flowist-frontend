import { FETCH_FLOW_SUCCESS, FETCH_FLOW_ERROR, ADD_FLOW_SUCCESS, ADD_FLOW_ERROR } from './actionTypes';

const FLOW_API_URL = '/api/flow';

/*
* FETCH FLOW ACTIONS
*/

export function fetchFlow() {
    return (dispatch) => {
        return fetch(FLOW_API_URL, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.length !== 0) {
                    dispatch(fetchFlowSuccess(json));
                } else {
                    dispatch(fetchFlowError("Empty JSON returned from API"))
                }
            })
            .catch((error) => dispatch(fetchFlowError(error)));
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
