export const roster = (state = [], action) => {
	switch (action.type) {
		case 'ADD_ROSTER':
			return [...state, action.payload];
		case 'CLEAR_ROSTER':
			return [];
		case 'REMOVE_RAIDER':
			let filiteredState = state.filter((raider) => {
				return raider.id !== action.payload;
			});
			return filiteredState;

		default:
			return state;
	}
};
