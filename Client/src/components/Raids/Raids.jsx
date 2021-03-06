import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRaids } from '../../actions/raids';
import { useStyles } from '../Form/styles';
import RaidModal from './RaidModal';
import NewestRaid from './NewestRaid';
import emptyImg from '../../images/empty.svg';
import { Image } from 'react-bootstrap';
import Loading from '../UIcomponents/Loading';
import { Paper, CircularProgress } from '@mui/material';

const Raids = () => {
	const classes = useStyles();
	const [selectedRaid, setSelectedRaid] = useState(null);
	const [expandCard, setExpandCard] = useState(false);
	const createdRaids = useSelector((state) => state.raids);
	const currentUser = useSelector((state) => state.currentUser);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: 'CLEAR_RAIDS' });
		dispatch(getRaids());
	}, []);

	return (
		<div className='container'>
			<div className='row'>
				<Paper className={classes.paper}>
					<h4 className='my-4 raids-title'>
						{currentUser.role === undefined ? (
							<CircularProgress color='success' />
						) : currentUser.role === 'Guest' ? (
							'Welcome to WoW rosters software for building warcraft raid teams'
						) : (
							`Current raids for ${currentUser.guild}'s raid team`
						)}
					</h4>
					{currentUser.role === 'Guest' && (
						<>
							<p>
								Welcome to wow rosters, thank you for taking the time to use
								this raid creation software for world of warcraft. If you are
								new and want to get started sign up and create a guild, or take
								a look around at some of the examples. If you have any feedback
								in regards to application or wish to contribute please contact
								me via GitHub. If you get a moment I would love a{' '}
								<a
									href='https://github.com/jamieTardi/wow-rosters'
									target='_blank'
									className='tags'
									rel='noreferrer'>
									GitHub
								</a>{' '}
								star.
							</p>

							<p>
								If you have just created a guild and have arrived back at this
								page please just log back in and you will arrive at your guild
								raid page.
							</p>
						</>
					)}
				</Paper>
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
						.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
						.map((raid, i) => (
							<React.Fragment key={i}>
								{currentUser.guild === raid.guild && (
									<div className='mt-4 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 d-flex justify-content-center align-items-center mb-5'>
										<NewestRaid
											raid={raid}
											setSelectedRaid={setSelectedRaid}
											setExpandCard={setExpandCard}
										/>
									</div>
								)}
							</React.Fragment>
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
