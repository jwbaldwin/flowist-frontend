import { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_ERROR } from './actionTypes';

const USER_API_URL = '/api/user/profile';

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
