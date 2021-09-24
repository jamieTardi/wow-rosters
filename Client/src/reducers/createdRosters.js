import { FETCH_ROSTER, UPDATE_ROSTER } from '../constants/actionTypes';

export const createdRosters = (state = [], action) => {
	switch (action.type) {
		case FETCH_ROSTER:
			return action.payload;
		case UPDATE_ROSTER:
			return state.map((roster) =>
				roster._id === action.payload._id ? action.payload : roster,
			);
		default:
			return state;
	}
};
