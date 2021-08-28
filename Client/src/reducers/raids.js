export const raids = (state = [], action) => {
	switch (action.type) {
		case 'FETCH_ALL':
			return action.payload;
		case 'CREATE':
			return [...state, action.payload];
		case 'UPDATE_RAID':
			return state.map((raid) =>
				raid._id === action.payload._id ? action.payload : raid,
			);
		default:
			return state;
	}
};
