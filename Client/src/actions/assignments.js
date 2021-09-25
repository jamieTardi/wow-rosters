import * as api from '../api/index';
import {
	FETCH_ASSIGNMENTS,
	ADD_ASSIGNMENT,
	UPDATE_ASSIGNMENTS,
} from '../constants/actionTypes';

export const getAssignments = () => async (dispatch) => {
	try {
		const { data } = await api.fetchAssignments();
		dispatch({ type: FETCH_ASSIGNMENTS, payload: data });
	} catch (err) {
		console.log(err);
	}
};

export const createAssignment = (assignment) => async (dispatch) => {
	try {
		const { data } = await api.createAssignment(assignment);
		dispatch({ type: ADD_ASSIGNMENT, payload: data });
	} catch (err) {
		console.log(err);
	}
};

export const updateAssignments = (assingment, id) => async (dispatch) => {
	try {
		const { data } = await api.updateAssignments(assingment, id);
		dispatch({ type: UPDATE_ASSIGNMENTS, payload: data });
	} catch (err) {
		console.log(err);
	}
};
