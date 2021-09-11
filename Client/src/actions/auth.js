import * as api from '../api/index';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData, history) => async (dispatch) => {
	try {
		//log in the user

		history.push('/');
	} catch (err) {
		console.log(err);
	}
};

export const signup = () => async (dispatch) => {};
