import * as api from '../api/index';
import { IS_NOT_LOADING } from '../constants/actionTypes';

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
		data !== undefined && dispatch({ type: IS_NOT_LOADING });
	} catch (err) {
		console.log(err);
	}
};

export const updateRaid = (id, raid) => async (dispatch) => {
	try {
		api.updateRaid(id, raid, dispatch);
	} catch (err) {
		console.log(err);
	}
};

export const deleteRaid = (id, isLoading) => async (dispatch) => {
	try {
		dispatch({ type: 'DELETE_IN_PROGRESS', payload: true });
		await api.deleteRaid(id, isLoading);
		dispatch({ type: 'DELETE_RAID', payload: id });
	} catch (err) {
		console.log(err);
	}
};
