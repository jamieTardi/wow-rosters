import { IS_MOBILE_CHANGE } from '../constants/actionTypes';

export const isMobile = (state = window.innerWidth < 968, action) => {
	switch (action.type) {
		case IS_MOBILE_CHANGE:
			return window.innerWidth < 968;
		default:
			return state;
	}
};
