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

export const updateRoster =
	(newRoster, id, setIsLoading) => async (dispatch) => {
		try {
			const { data } = await api.updateRoster(newRoster, id, setIsLoading);
			dispatch({ type: UPDATE_ROSTER, payload: data });
		} catch (err) {
			console.log(err);
		}
	};
