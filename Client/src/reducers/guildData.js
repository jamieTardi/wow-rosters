import { GET_GUILDS } from '../constants/actionTypes';

export const guildData = (state = null, action) => {
	switch (action.type) {
		case GET_GUILDS:
			return action.payload;

		default:
			return state;
	}
};
