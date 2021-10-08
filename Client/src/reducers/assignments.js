import {
	ADD_ASSIGNMENT,
	REMOVE_ASSIGNMENT,
	FETCH_ASSIGNMENTS,
} from '../constants/actionTypes';

export const assignments = (state = [], action) => {
	switch (action.type) {
		case ADD_ASSIGNMENT:
			if (state !== null) {
				return [...state, action.payload];
			} else {
				return [action.payload];
			}

		case REMOVE_ASSIGNMENT:
			return state;
		case FETCH_ASSIGNMENTS:
			return action.payload;
		default:
			return state;
	}
};
