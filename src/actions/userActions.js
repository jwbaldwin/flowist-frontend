import { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_ERROR, UPDATE_USER } from './actionTypes';
import environment from "../environment";

const USER_API_URL = environment.api.USER_ENDPOINT;

/*
* FETCH USER ACTIONS
*/

export function fetchUser() {
	return (dispatch) => {
		return fetch(USER_API_URL, {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((json) => {
				if (json.length !== 0){
					dispatch(fetchUserSuccess(json));
				} else {
					dispatch(fetchUserError("Empty JSON returned from API"))
				}
			})
			.catch((error) => dispatch(fetchUserError(error)));
	};
}

export function fetchUserSuccess(data) {
	return {
		type: FETCH_USER_SUCCESS,
		data: data[0]
	};
}

export function fetchUserError(error) {
	return {
		type: FETCH_USER_ERROR,
		error: error
	};
}

/*
* update USER ACTIONS
*/

export function updateUser(data) {
	return {
		type: UPDATE_USER,
		data: data
	};
}

