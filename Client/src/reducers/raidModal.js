export const raidModal = (state = false, action) => {
	switch (action.type) {
		case 'SHOW_RAID_MODAL':
			return true;
		case 'HIDE_RAID_MODAL':
			return false;
		default:
			return state;
	}
};
