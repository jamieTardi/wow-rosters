import { CURRENT_ROSTER } from '../constants/actionTypes';

export const currentRoster = (state = null, action) => {
	switch (action.type) {
		case CURRENT_ROSTER:
			return action.payload;
		default:
			return state;
	}
};
