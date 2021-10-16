import { NEW_ERROR, CLEAR_ERROR } from '../constants/actionTypes';

export const errorMessage = (state = null, action) => {
	switch (action.type) {
		case NEW_ERROR:
			return action.payload;
		case CLEAR_ERROR:
			return null;
		default:
			return state;
	}
};
