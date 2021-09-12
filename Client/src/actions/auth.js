import * as api from '../api/index';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData, history) => async (dispatch) => {
	try {
		const { data } = await api.signIn(formData);
		dispatch({ type: AUTH, data });
		history.push('/');
	} catch (err) {
		console.log(err);
	}
};

export const signup = (formData, history) => async (dispatch) => {
	try {
		const { data } = await api.signUp(formData);
		console.log(data);
		dispatch({ type: AUTH, data });

		history.push('/');
	} catch (err) {
		console.log(err);
	}
};
