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
		case 'DELETE_RAID':
			return state.filter((raid) => raid._id !== action.payload);
		default:
			return state;
	}
};
