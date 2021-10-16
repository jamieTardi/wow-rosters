import React from 'react';
import ViewAssignments from '../Assignments/ViewAssignments';

const RaidPageThree = ({ raidForm, setRaidForm }) => {
	return (
		<div>
			<ViewAssignments raidForm={raidForm} setRaidForm={setRaidForm} />
		</div>
	);
};

export default RaidPageThree;
