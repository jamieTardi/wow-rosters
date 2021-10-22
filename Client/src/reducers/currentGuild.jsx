import { CURRENT_GUILD } from '../constants/actionTypes';

export const currentGuild = (state = null, action) => {
	switch (action.type) {
		case CURRENT_GUILD:
			if (action.payload !== undefined) {
				return action.payload;
			} else {
				return state;
			}
		default:
			return state;
	}
};
