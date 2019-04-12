import {
    FETCH_LOGS,
    FETCH_LOGS_SUCCESS,
    FETCH_LOGS_ERROR,
    ADD_LOG,
    ADD_LOG_SUCCESS,
    ADD_LOG_ERROR,
    UPDATE_LOG,
    UPDATE_LOG_SUCCESS,
    UPDATE_LOG_ERROR,
    DELETE_LOG,
    DELETE_LOG_SUCCESS,
    DELETE_LOG_ERROR
} from './actionTypes';
import { Auth } from 'aws-amplify';
import { message } from 'antd';
import environment from "../environment";

const LOG_API_URL = environment.api.FLOWS_ENDPOINT;
/*
* FETCH LOGS ACTIONS
*/

export function fetchLogs() {
    return async (dispatch) => {
        dispatch(fetchLogsRequest())
        const headers = await getHeaders();

        return fetch(FLOW_API_URL, {
            method: 'GET',
            headers: headers
        })
            .then((response) => response.json())
            .then((json) => {
                dispatch(fetchLogsSuccess(json));
            })
            .catch((error) => dispatch(fetchLogsError(error)));
    };
}

function fetchLogsRequest() {
    return {
        type: FETCH_LOGS
    };
}

export function fetchLogsSuccess(data) {
    return {
        type: FETCH_LOGS_SUCCESS,
        data: data
    };
}

export function fetchLogsError(error) {
    return {
        type: FETCH_LOGS_ERROR,
        error: error
    };
}

/*
* ADD LOG ACTIONS
*/

export function addLog(Log) {
    return async (dispatch) => {
        dispatch(addLogRequest())
        const headers = await getHeaders();

        return fetch(LOG_API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(log)
        })
            .then((response) => response.json())
            .then((json) => dispatch(addLogSuccess(json)))
            .catch((error) => dispatch(addLogError(error + ': Could not add log. ')));
    };
}

function addLogRequest() {
    return { type: ADD_LOG };
}

export function addLogSuccess(data) {
    return {
        type: ADD_LOG_SUCCESS,
        data: data
    };
}

export function addLogError(error) {
    return {
        type: ADD_LOG_ERROR,
        error: error
    };
}

/*
* UPDATE LOG ACTIONS
*/

export function updateLog(log) {
    return async (dispatch) => {
        dispatch(updateLogRequest())
        const headers = await getHeaders();

        return fetch(LOG_API_URL + '/' + log.id, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(log)
        })
            .then((response) => response.json())
            .then((json) => dispatch(updateLogSuccess(json)))
            .catch((error) => updateLogError(error + ': Could not update Log. '));
    };
}

function updateLogRequest() {
    return { type: UPDATE_LOG };
}

export function updateLogSuccess(data) {
    return {
        type: UPDATE_LOG_SUCCESS,
        data: data
    };
}

export function updateLogError(error) {
    return {
        type: UPDATE_LOG_ERROR,
        error: error
    };
}

/*
* DELETE LOG ACTIONS
*/

export function deleteLog(id) {
    return async (dispatch) => {
        dispatch(deleteLogRequest());
        const headers = await getHeaders();

        return fetch(LOG_API_URL + '/' + id, {
            method: 'DELETE',
            headers: headers,
        })
            .then((response) => {
                response.status === 200 ?
                    dispatch(deleteLogSuccess(id))
                    : dispatch(deleteLogError(response.status + ': Could not delete log. '))
            })
            .catch((error) => dispatch(deleteLogError(error)));
    };
}

function deleteLogRequest() {
    return { type: DELETE_LOG };
}

export function deleteLogSuccess(id) {
    return {
        type: DELETE_LOG_SUCCESS,
        data: id
    };
}

export function deleteLogError(error) {
    return {
        type: DELETE_LOG_ERROR,
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
