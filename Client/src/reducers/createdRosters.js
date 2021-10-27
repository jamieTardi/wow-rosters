import {
	FETCH_ROSTER,
	UPDATE_ROSTER,
	DELETE_ROSTER,
} from '../constants/actionTypes';

export const createdRosters = (state = [], action) => {
	switch (action.type) {
		case FETCH_ROSTER:
			return action.payload;
		case UPDATE_ROSTER:
			return state.map((roster) =>
				roster._id === action.payload._id ? action.payload : roster,
			);
		case DELETE_ROSTER:
			return state.filter((roster) => {
				return roster._id !== action.payload._id;
			});
		default:
			return state;
	}
};
