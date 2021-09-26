import { IS_LOADING } from '../constants/actionTypes';

export const isLoading = (state = false, action) => {
	switch (action.type) {
		case IS_LOADING:
			return action.payload;
		default:
			return state;
	}
};
