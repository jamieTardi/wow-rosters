import React, { useState, useEffect } from 'react';
import ViewAssignments from '../Assignments/ViewAssignments';
import { FETCH_ASSIGNMENTS } from '../../constants/actionTypes';

const RaidPageThree = ({ raidForm, setRaidForm }) => {
	return (
		<div>
			<ViewAssignments raidForm={raidForm} setRaidForm={setRaidForm} />
		</div>
	);
};

export default RaidPageThree;
