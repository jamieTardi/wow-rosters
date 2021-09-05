export const darkMode = (state = true, action) => {
	switch (action.type) {
		case 'DARK_MODE':
			return true;
		case 'LIGHT_MODE':
			return false;
		default:
			return state;
	}
};
