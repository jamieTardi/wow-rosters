import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { Paper, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import empty from '../../images/empty-roster.svg';
import { CURRENT_ROSTER } from '../../constants/actionTypes';
import EditPageTwo from '../EditPages/EditPageTwo';
import LoadingSpinner from '../UIcomponents/LoadingSpinner';
import loadingGif from '../../images/loadingGif.gif';
import { deleteRoster } from '../../actions/roster';

const ViewRosters = () => {
	const dispatch = useDispatch();
	const rosters = useSelector((state) => state.createdRosters);
	const currentRoster = useSelector((state) => state.currentRoster);
	const currentUser = useSelector((state) => state.currentUser);
	const user = useSelector((state) => state.currentUser);
	const [show, setShow] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [guildRoster, setGuildRoster] = useState(null);
	const [loaded, setLoaded] = useState(false);

	const handleViewRoster = (roster) => {
		setShow((prev) => !prev);
		dispatch({ type: CURRENT_ROSTER, payload: roster });
	};

	//needs finishing
	const handleDeleteRoster = (roster) => {
		let filitered = guildRoster.filter((item) => {
			return item._id !== roster._id;
		});
		dispatch(deleteRoster(roster._id, roster));
		setGuildRoster(filitered);
	};

	useEffect(() => {
		if (currentRoster !== null) {
			setShowModal(true);
		}
	}, [currentRoster]);

	useEffect(() => {
		let filitered = rosters.filter((roster) => {
			return roster.guild === currentUser.guild;
		});
		setGuildRoster(filitered);
	}, [rosters]);

	return (
		<>
			{guildRoster ? (
				<div className='my-5'>
					{guildRoster.length > 0 ? (
						<Paper className='container '>
							<Typography variant='h5' gutterBottom className='pt-3'>
								Select a roster from below
							</Typography>
							<div className='row'>
								{guildRoster.map((roster, i) => (
									<div className='mini-card col-12 col-md-4 mb-3'>
										<Card style={{ width: '100%' }}>
											<Card.Img
												variant='top'
												src={
													loaded
														? roster.image
															? roster.image
															: 'https://wow-rosters.herokuapp.com/images/image2998.jpg'
														: loadingGif
												}
												onLoad={() => setLoaded(true)}
											/>
											<Card.Body>
												<Card.Title>{roster.title}</Card.Title>
												<Card.Text>
													Click the button below to view this roster.
												</Card.Text>
												<div className='d-flex flex-md-column justify-content-between flex-xl-row'>
													<Button
														variant='contained'
														color='default'
														onClick={() => {
															handleViewRoster(roster);
														}}
														style={{ fontSize: '0.6rem', marginBottom: '15%' }}>
														View/Edit Roster
													</Button>
													{(user.role === 'admin' ||
														user.role === 'moderator' ||
														user.role === 'guildMaster') && (
														<Button
															variant='contained'
															color='secondary'
															onClick={() => {
																handleDeleteRoster(roster);
															}}
															style={{
																fontSize: '0.6rem',
																marginBottom: '15%',
															}}>
															Delete Roster
														</Button>
													)}
												</div>
											</Card.Body>
										</Card>
									</div>
								))}
							</div>
							{showModal && <EditPageTwo show={show} setShow={setShow} />}
						</Paper>
					) : (
						<div className='d-flex flex-column justify-content-center align-items-center'>
							<Typography variant='h4' className='my-3'>
								Currently no rosters assigned, Lets create one!
							</Typography>
							<Button
								variant='contained'
								color='primary'
								className='my-5 '
								component={Link}
								to='/roster-creation'>
								Lets create a Roster!
							</Button>
							<img src={empty} alt='empty roster' style={{ width: '450px' }} />
						</div>
					)}
				</div>
			) : (
				<LoadingSpinner />
			)}
		</>
	);
};

export default ViewRosters;
