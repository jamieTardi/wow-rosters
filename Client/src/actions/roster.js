import * as api from '../api/index';
import axios from 'axios';
import { UPDATE_ROSTER } from '../constants/actionTypes';

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
		dispatch({ type: 'ADD_CHARACTER', payload: data });
	} catch (err) {
		console.log(err);
	}
};

export const updateRoster = (roster, id) => async (dispatch) => {
	try {
		const { data } = await api.updateRoster(id, roster);
		dispatch({ type: UPDATE_ROSTER, payload: data });
	} catch (err) {
		console.log(err);
	}
};
