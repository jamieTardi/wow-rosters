import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import TacticsForm from './TacticsForm';
import CreateIcon from '@material-ui/icons/Create';

const RaidPageThree = ({
	isLoading,
	handleSubmitSucess,
	raidForm,
	setRaidForm,
}) => {
	const [numberOfTactics, setNumberOfTactics] = useState(0);

	return (
		<div>
			<TacticsForm raidForm={raidForm} setRaidForm={setRaidForm} />
		</div>
	);
};

export default RaidPageThree;
