import React, { useEffect } from 'react';
import ViewAssignments from '../Assignments/ViewAssignments';
import { useDispatch } from 'react-redux';
import { getAssignments } from '../../actions/assignments';

const RaidPageThree = ({ raidForm, setRaidForm }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAssignments);
	}, []);
	return (
		<div>
			<ViewAssignments raidForm={raidForm} setRaidForm={setRaidForm} />
		</div>
	);
};

export default RaidPageThree;
