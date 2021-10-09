import React from 'react';
import { useSelector } from 'react-redux';

const PopulatedGroup = () => {
	const currentRaid = useSelector((state) => state.currentRaid);
	console.log(currentRaid);
	return (
		<div>
			<p>Group populated</p>
		</div>
	);
};

export default PopulatedGroup;
