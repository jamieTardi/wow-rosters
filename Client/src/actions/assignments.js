import * as api from '../api/index';
import axios from 'axios';

export const getAssignment = () => async (dispatch) => {
	try {
		const { data } = await api.fetchAssignments();
		// dispatch({ type: 'FETCH_ROSTER', payload: data });
	} catch (err) {
		console.log(err);
	}
};

export const createAssignment = (assignment) => async (dispatch) => {
	try {
		const { data } = await api.createAssignment(assignment);
		console.log(data);
		dispatch({ type: 'ADD_ASSIGNMENT', payload: data });
	} catch (err) {
		console.log(err);
	}
};
