export const currentId = (state = null, action) => {
	switch (action.type) {
		case 'CURRENT_ID':
			return action.payload;
		default:
			return state;
	}
};
