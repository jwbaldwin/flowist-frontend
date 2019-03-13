import {
	FETCH_SETTINGS,
	FETCH_SETTINGS_SUCCESS,
	FETCH_SETTINGS_ERROR,
	UPDATE_SETTINGS,
	UPDATE_SETTINGS_SUCCESS,
	UPDATE_SETTINGS_ERROR
} from './actionTypes';
import environment from "../environment";

const SETTINGS_API_URL = environment.api.SETTINGS_ENDPOINT;

/*
* FETCH SETTINGS ACTIONS
*/

export function fetchSettings() {
	return (dispatch) => {
        dispatch(fetchSettingsRequest())
		return fetch(SETTINGS_API_URL, {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((json) => {
					dispatch(fetchSettingsSuccess(json));
			})
			.catch((error) => dispatch(fetchSettingsError(error)));
	};
}

function fetchSettingsRequest() {
	return {
		type: FETCH_SETTINGS
	};
}

export function fetchSettingsSuccess(data) {
	return {
		type: FETCH_SETTINGS_SUCCESS,
		data: data
	};
}

export function fetchSettingsError(error) {
	return {
		type: FETCH_SETTINGS_ERROR,
		error: error
	};
}

/*
* UPDATE SETTINGS ACTIONS
*/

export function updateSettings(data) {
    // return (dispatch) => {
    //     dispatch(updateSettingsRequest())
	// 	return fetch(SETTINGS_API_URL, {
	// 		method: 'POST',
    //         headers: {
	// 			Accept: 'application/json, text/plain, */*',
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify(data)
	// 	})
	// 		.then((response) => response.json())
	// 		.then((json) => { dispatch(updateSettingsSuccess(json)); })
	// 		.catch((error) => dispatch(updateSettingsError(error)));
	// };

        return {
            type: UPDATE_SETTINGS_SUCCESS,
            data: data
        }
}

export function updateSettingsRequest() {
	return {
		type: UPDATE_SETTINGS
	};
}

export function updateSettingsSuccess(data) {
	return {
		type: UPDATE_SETTINGS_SUCCESS,
		data: data
	};
}

export function updateSettingsError(error) {
	return {
		type: UPDATE_SETTINGS_ERROR,
		error: error
	};
}
