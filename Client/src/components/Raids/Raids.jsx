import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRaids } from '../../actions/raids';
import Raid from './Raid';
import RaidModal from './RaidModal';
import NewestRaid from './NewestRaid';
import { v4 as uuidv4 } from 'uuid';
import { Nav } from '../index';
import emptyImg from '../../images/empty.svg';
import { Image } from 'react-bootstrap';

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
			<div className='row'>
				{createdRaids.length !== 0 ? (
					createdRaids.reverse().map((raid, i) => (
						<>
							{i === 0 ? (
								<div className='col-12 mt-5'>
									<div className='d-flex justify-content-center align-items-center'>
										<NewestRaid
											raid={raid}
											setSelectedRaid={setSelectedRaid}
											setExpandCard={setExpandCard}
										/>
									</div>
									<Nav />
								</div>
							) : (
								<div className='col-12 col-md-4 col-lg-4 d-flex justify-content-center align-items-center'>
									<NewestRaid
										raid={raid}
										setSelectedRaid={setSelectedRaid}
										setExpandCard={setExpandCard}
									/>
								</div>
							)}
						</>
					))
				) : (
					<div
						style={{ height: '500px' }}
						className='d-flex justify-content-center align-items-center flex-column'>
						<Nav />
						<h1>Currently there are no raids, let's create one!</h1>
						<Image src={emptyImg} fluid style={{ height: '100%' }} />
					</div>
				)}
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
