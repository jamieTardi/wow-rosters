export const assignRaids = (state = [], action) => {
	switch (action.type) {
		case 'ADD_ASSIGNED_RAID':
			return [...state, action.payload];
		case 'CREATE':
			return [...state, action.payload];
		default:
			return state;
	}
};
