import { CURRENT_ASSIGNMENT } from '../constants/actionTypes';

export const currentAssignment = (state = null, action) => {
	switch (action.type) {
		case CURRENT_ASSIGNMENT:
			return action.payload;
		default:
			return state;
	}
};
