import React from 'react';
import RosterForm from '../Form/RosterForm';

const RaidPageTwo = ({ setRaidForm, raidForm }) => {
	return (
		<div>
			<RosterForm setRaidForm={setRaidForm} raidForm={raidForm} />
		</div>
	);
};

export default RaidPageTwo;
