import { GUILD_ASSIGNMENT } from '../constants/actionTypes';

export const guildAssignments = (state = null, action) => {
	switch (action.type) {
		case GUILD_ASSIGNMENT:
			return action.payload;
		default:
			return state;
	}
};
