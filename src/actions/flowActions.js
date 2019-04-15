import {
    FETCH_FLOW,
    FETCH_FLOW_SUCCESS,
    FETCH_FLOW_ERROR,
    ADD_FLOW,
    ADD_FLOW_SUCCESS,
    ADD_FLOW_ERROR,
    UPDATE_FLOW,
    UPDATE_FLOW_SUCCESS,
    UPDATE_FLOW_ERROR,
    DELETE_FLOW,
    DELETE_FLOW_SUCCESS,
    DELETE_FLOW_ERROR
} from './actionTypes';
import { Auth } from 'aws-amplify';
import { notification } from 'antd';
import environment from "../environment";

const FLOW_API_URL = environment.api.FLOWS_ENDPOINT;
/*
* FETCH FLOW ACTIONS
*/

export function fetchFlows() {
    return async (dispatch) => {
        dispatch(fetchFlowRequest())
        const headers = await getHeaders();

        return fetch(FLOW_API_URL, {
            method: 'GET',
            headers: headers
        })
            .then((response) => response.json())
            .then((json) => {
                dispatch(fetchFlowSuccess(json));
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
        data: data
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
    return async (dispatch) => {
        dispatch(addFlowRequest())
        const headers = await getHeaders();

        return fetch(FLOW_API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(flow)
        })
            .then((response) => response.json())
            .then((json) => dispatch(addFlowSuccess(json)))
            .catch((error) => dispatch(addFlowError(error + ': Could not add flow. ')));
    };
}

function addFlowRequest() {
    return { type: ADD_FLOW };
}

export function addFlowSuccess(data) {
    notification.success({
        "message": "Flow added!"
    });
    return {
        type: ADD_FLOW_SUCCESS,
        data: data
    };
}

export function addFlowError(error) {
    notification.error({
        "message": "Uhoh :(",
        "description": "We couldn't add the flow. The api might be under attack 👾"
    });
    return {
        type: ADD_FLOW_ERROR,
        error: error
    };
}

/*
* UPDATE FLOW ACTIONS
*/

export function updateFlow(flow) {
    return async (dispatch) => {
        dispatch(updateFlowRequest())
        const headers = await getHeaders();

        return fetch(FLOW_API_URL + '/' + flow.id, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(flow)
        })
            .then((response) => response.json())
            .then((json) => dispatch(updateFlowSuccess(json)))
            .catch((error) => updateFlowError(error + ': Could not update flow. '));
    };
}

function updateFlowRequest() {
    return { type: UPDATE_FLOW };
}

export function updateFlowSuccess(data) {
    (data.flowStatus === "COMPLETED") ?
        notification.success({
            "message": "Flow completed!",
            "description": "Congrats! We've stored your work if you ever want to review it 🎉"
        })
        : notification.info({
            "message": "Flow updated!",
            "description": "Flow: " + data.title + " has been updated."
        });
    return {
        type: UPDATE_FLOW_SUCCESS,
        data: data
    };
}

export function updateFlowError(error) {
    notification.error({
        "message": "Uhoh :(",
        "description": "We couldn't update the flow. The api might be under attack 👾"
    });
    return {
        type: UPDATE_FLOW_ERROR,
        error: error
    };
}

/*
* DELETE FLOW ACTIONS
*/

export function deleteFlow(id) {
    return async (dispatch) => {
        dispatch(deleteFlowRequest());
        const headers = await getHeaders();

        return fetch(FLOW_API_URL + '/' + id, {
            method: 'DELETE',
            headers: headers,
        })
            .then((response) => {
                response.status === 200 ?
                    dispatch(deleteFlowSuccess(id))
                    : dispatch(deleteFlowError(response.status + ': Could not delete flow. '))
            })
            .catch((error) => dispatch(deleteFlowError(error)));
    };
}

function deleteFlowRequest() {
    return { type: DELETE_FLOW };
}

export function deleteFlowSuccess(id) {
    notification.success({
        "message": "Flow deleted!",
    });
    return {
        type: DELETE_FLOW_SUCCESS,
        data: id
    };
}

export function deleteFlowError(error) {
    notification.error({
        "message": "Uhoh :(",
        "description": "We couldn't delete the flow. The api might be under attack 👾"
    });
    return {
        type: DELETE_FLOW_ERROR,
        error: error
    };
}

async function getHeaders() {
    const headers = new Headers();
    const token = await getIdToken();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json, text/plain, */*');
    return headers;
}

async function getIdToken() {
    const session = await Auth.currentSession();
    return session.getIdToken().getJwtToken();
}
