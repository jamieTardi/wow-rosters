import { CURRENT_USER } from '../constants/actionTypes';
export const currentUser = (state = [], action) => {
	switch (action.type) {
		case CURRENT_USER:
			return action.payload;
		default:
			return state;
	}
};
