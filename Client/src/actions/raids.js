import * as api from '../api/index';
import axios from 'axios';

export const getRaids = () => async (dispatch) => {
	try {
		const { data } = await api.fetchRaids();
		dispatch({ type: 'FETCH_ALL', payload: data });
	} catch (err) {
		console.log(err);
	}
};

export const createRaid = (raid) => async (dispatch) => {
	try {
		const { data } = await api.createRaid(raid);
		dispatch({ type: 'CREATE', payload: data });
	} catch (err) {
		console.log(err);
	}
};

export const updateRaid = (id, raid) => async (dispatch) => {
	try {
		const { data } = await api.updateRaid(id, raid);
		dispatch({ type: 'UPDATE_RAID', payload: data });
	} catch (err) {
		console.log(err);
	}
};

export const deleteRaid = (id) => async (dispatch) => {
	try {
		console.log(id);
		await api.deleteRaid(id);
		dispatch({ type: 'DELETE_RAID', payload: id });
	} catch (err) {
		console.log(err);
	}
};
