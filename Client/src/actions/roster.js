import * as api from '../api/index';
import axios from 'axios';

export const getRoster = () => async (dispatch) => {
	try {
		const { data } = await api.fetchRoster();
		dispatch({ type: 'FETCH_ROSTER', payload: data });
	} catch (err) {
		console.log(err);
	}
};

export const createRoster = (roster) => async (dispatch) => {
	try {
		const { data } = await api.createRoster(roster);
		console.log(data);
		dispatch({ type: 'ADD_CHARACTER', payload: data });
	} catch (err) {
		console.log(err);
	}
};
