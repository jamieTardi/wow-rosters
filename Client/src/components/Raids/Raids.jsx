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
import Loading from '../UIcomponents/Loading';

const Raids = () => {
	const [selectedRaid, setSelectedRaid] = useState(null);
	const [expandCard, setExpandCard] = useState(false);
	const createdRaids = useSelector((state) => state.raids);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: 'CLEAR_RAIDS' });
		dispatch(getRaids());
	}, []);

	return (
		<div>
			<div className='row'>
				{createdRaids !== null && createdRaids.length === 0 ? (
					<div className='mt-5'>
						<div
							style={{ height: '500px' }}
							className='d-flex justify-content-center align-items-center flex-column'>
							<h1>Currently there are no raids, let's create one!</h1>
							<Image src={emptyImg} fluid style={{ height: '100%' }} />
						</div>
					</div>
				) : createdRaids === null ? (
					<Loading />
				) : (
					createdRaids
						.sort((a, b) => new Date(b.date) - new Date(a.date))
						.map((raid, i) => (
							<>
								{i === 0 ? (
									<div className='col-12 my-5'>
										<div className='d-flex justify-content-center align-items-center w-100'>
											<NewestRaid
												raid={raid}
												setSelectedRaid={setSelectedRaid}
												setExpandCard={setExpandCard}
											/>
										</div>
									</div>
								) : (
									<div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 d-flex justify-content-center align-items-center mb-5'>
										<NewestRaid
											raid={raid}
											setSelectedRaid={setSelectedRaid}
											setExpandCard={setExpandCard}
										/>
									</div>
								)}
							</>
						))
				)}
				{selectedRaid && (
					<RaidModal
						expandCard={expandCard}
						raid={selectedRaid}
						setExpandCard={setExpandCard}
					/>
				)}
			</div>
		</div>
	);
};

export default Raids;
