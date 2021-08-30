export const assignments = (state = [], action) => {
	switch (action.type) {
		case 'ADD_ASSIGNMENT':
			return [...state, action.payload];
		case 'REMOVE_ASSIGNMENT':
			return state;
		default:
			return state;
	}
};
