import { FETCH_ROSTER } from '../constants/actionTypes';

export const createdRosters = (state = [], action) => {
	switch (action.type) {
		case FETCH_ROSTER:
			return action.payload;

		default:
			return state;
	}
};
