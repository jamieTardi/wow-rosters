import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRaids } from '../../actions/raids';
import Raid from './Raid';
import RaidModal from './RaidModal';

const Raids = () => {
	const [selectedRaid, setSelectedRaid] = useState(null);
	const [expandCard, setExpandCard] = useState(false);
	const createdRaids = useSelector((state) => state.raids);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getRaids());
	}, []);

	return (
		<div>
			<div className=' row'>
				{createdRaids.map((raid) => (
					<Raid
						raid={raid}
						setSelectedRaid={setSelectedRaid}
						setExpandCard={setExpandCard}
					/>
				))}
			</div>

			{selectedRaid && (
				<RaidModal
					expandCard={expandCard}
					selectedRaid={selectedRaid}
					setExpandCard={setExpandCard}
				/>
			)}
		</div>
	);
};

export default Raids;
