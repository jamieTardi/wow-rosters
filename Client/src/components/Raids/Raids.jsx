import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRaids } from '../../actions/raids';
import Raid from './Raid';

const Raids = () => {
	const createdRaids = useSelector((state) => state.raids);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getRaids());
	}, []);

	return (
		<div>
			{createdRaids.map((raid) => (
				<Raid raid={raid} />
			))}
		</div>
	);
};

export default Raids;
