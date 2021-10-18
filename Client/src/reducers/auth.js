import { AUTH, LOGOUT, UPDATE_AUTH } from '../constants/actionTypes';

export const auth = (state = { authData: null }, action) => {
	switch (action.type) {
		case AUTH:
			localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
			return { ...state, authData: action?.data };
		case UPDATE_AUTH:
			localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
			return { ...state, authData: action?.data };
		case LOGOUT:
			localStorage.clear();
			return state;
		default:
			return state;
	}
};
