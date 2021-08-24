export const roster = (state = [], action) => {
	switch (action.type) {
		case 'ADD_CHARACTER':
			return [...state, action.payload];
		default:
			return state;
	}
};
