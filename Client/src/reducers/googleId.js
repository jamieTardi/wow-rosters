export const googleId = (state = null, action) => {
	switch (action.type) {
		case 'GOOGLE_LOGIN':
			return action.payload;

		default:
			return state;
	}
};
