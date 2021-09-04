export const currentRaid = (state = [], action) => {
	switch (action.type) {
		case 'CURRENT_RAID':
			return action.payload;
		case 'UPDATE_CURRENT_RAID':
			return action.payload;
		default:
			return state;
	}
};
