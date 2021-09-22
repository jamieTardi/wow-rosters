import {
	CURRENT_RAID,
	UPDATE_CURRENT_RAID,
	CLEAR_RAID,
} from '../constants/actionTypes';

export const currentRaid = (state = null, action) => {
	switch (action.type) {
		case CURRENT_RAID:
			return action.payload;
		case UPDATE_CURRENT_RAID:
			return action.payload;
		case CLEAR_RAID:
			return null;
		default:
			return state;
	}
};
