import * as api from '../api/index';
import { AUTH, NEW_ERROR } from '../constants/actionTypes';

export const signin = (formData, history) => async (dispatch) => {
	try {
		const { data } = await api.signIn(formData);
		dispatch({ type: AUTH, data });
		history.push('/');
	} catch (err) {
		dispatch({ type: NEW_ERROR, payload: err.response.data.message });
	}
};

export const signup = (formData, history) => async (dispatch) => {
	try {
		const { data } = await api.signUp(formData);

		dispatch({ type: AUTH, data });

		history.push('/');
	} catch (err) {
		dispatch({ type: NEW_ERROR, payload: err.response.data.message });
	}
};

export const updateuser =
	(id, userData, setServerMsg, history) => (dispatch) => {
		try {
			api.updateUser(id, userData, setServerMsg, dispatch, history);
		} catch (err) {
			console.log(err);
		}
	};
