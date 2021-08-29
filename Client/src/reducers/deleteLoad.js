export const deleteLoad = (state = false, action) => {
	switch (action.type) {
		case 'DELETE_IN_PROGRESS':
			return true;
		case 'DELETE_IS_COMPLETE':
			return false;
		default:
			return state;
	}
};
