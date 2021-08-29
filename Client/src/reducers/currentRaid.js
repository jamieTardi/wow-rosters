export const currentRaid = (state = [], action) => {
	switch (action.type) {
		case 'CURRENT_RAID':
			return action.payload;
		default:
			return state;
	}
};
