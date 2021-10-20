import * as api from '../api';
import { GET_GUILDS } from '../constants/actionTypes';

export const getGuilds = () => async (dispatch) => {
	try {
		const { data } = await api.fetchGuilds();
		dispatch({ type: GET_GUILDS, payload: data });
	} catch (err) {
		console.log(err);
	}
};
