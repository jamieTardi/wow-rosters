import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAssignment, getAssignments } from '../../actions/assignments';
import { Card } from 'react-bootstrap';
import { Paper, Typography, Button, Fab } from '@material-ui/core';
import empty from '../../images/empty.svg';
import { Link, useLocation } from 'react-router-dom';
import EditAssignments from '../EditPages/EditAssignments';
import {
	CURRENT_ASSIGNMENT,
	REMOVE_ASSIGNMENT,
} from '../../constants/actionTypes';
import { deleteImage } from '../../api';
import LoadingSpinner from '../UIcomponents/LoadingSpinner';
import { getGuilds } from '../../actions/guilds';
import loadingGif from '../../images/loadingGif.gif';

const ViewAssignments = ({ raidForm, setRaidForm }) => {
	const location = useLocation();
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const assignments = useSelector((state) => state.assignments);
	const currentUrl = location.pathname;
	const user = useSelector((state) => state.currentUser);
	const guilds = useSelector((state) => state.guildData);
	const [selectedAssignment, setSelectedAssignment] = useState(null);
	const [activeAssignments, setActiveAssignments] = useState([]);
	const [loaded, setLoaded] = useState(false);

	const handleViewAssignment = (assign) => {
		dispatch({ type: CURRENT_ASSIGNMENT, payload: assign });
		setShow((prev) => !prev);
	};

	const handleAddAssignment = (assign, i) => {
		setRaidForm({ ...raidForm, tactics: [...raidForm.tactics, assign] });
		setSelectedAssignment(
			selectedAssignment ? [...selectedAssignment, assign] : [assign],
		);
	};

	const handleRemoveAssignment = (assign, i) => {
		const id = assign._id;
		let filitered = selectedAssignment.filter((assignment) => {
			return assignment._id !== id;
		});
		setSelectedAssignment(filitered);
	};

	const handleDeleteAssignment = (assign) => {
		const id = assign._id;

		setIsLoading(true);
		dispatch(deleteAssignment(id, setIsLoading));
		let filitered = activeAssignments.filter((thisAssign) => {
			return thisAssign._id !== assign._id;
		});

		setActiveAssignments(filitered);
	};

	useEffect(() => {
		dispatch(getAssignments());
		dispatch(getGuilds());
	}, []);

	useEffect(() => {
		if (guilds) {
			guilds.forEach((guild) => {
				if (guild.name === user.guild) {
					let filitered = assignments.filter((assign) => {
						return assign.guild === user.guild;
					});
					setActiveAssignments(filitered);
				}
			});
		}
	}, [guilds]);

	useEffect(() => {
		dispatch(getAssignments());
	}, [assignments.length]);

	return (
		<>
			{activeAssignments ? (
				<div className='my-5'>
					{activeAssignments.length > 0 ? (
						<Paper className='container '>
							<Typography variant='h5' gutterBottom className='pt-3'>
								Select a assignment from below
							</Typography>
							<div className='row'>
								{activeAssignments.map((assign, i) => (
									<div
										className={
											currentUrl === '/raid-creation'
												? 'mini-card col-12 col-md-6 mb-3'
												: 'mini-card col-12 col-md-6 col-lg-4 col-xl-3 mb-3'
										}>
										<Card
											style={
												selectedAssignment?.includes(assign)
													? { width: '100%', opacity: '0.5' }
													: { width: '100%' }
											}>
											<img
												style={
													loaded
														? {
																objectFit: 'cover',
																height: '200px',
																width: '100%',
														  }
														: {
																objectFit: 'contain',
																height: '50px',
																width: '100%',
														  }
												}
												src={
													loaded
														? assign.image !== undefined
															? assign.image
															: 'https://wow-rosters.herokuapp.com/images/image895.jpg'
														: loadingGif
												}
												onLoad={() => setLoaded(true)}
											/>
											<Card.Body>
												<Card.Title>{assign.title}</Card.Title>
												<Card.Text>
													Click the button below to view this assignment.
												</Card.Text>
												<div className='d-flex flex-column justify-content-between '>
													<Button
														variant='contained'
														color='default'
														onClick={() => {
															handleViewAssignment(assign);
														}}
														style={{ fontSize: '0.6rem', marginBottom: '15%' }}>
														View Assignment
													</Button>

													{currentUrl === '/raid-creation' && (
														<>
															<Button
																variant='contained'
																color='primary'
																disabled={
																	selectedAssignment?.includes(assign)
																		? true
																		: false
																}
																style={{
																	fontSize: '0.6rem',
																	marginBottom: '15%',
																}}
																onClick={() => handleAddAssignment(assign, i)}>
																Add this Assignment
															</Button>
														</>
													)}
													{currentUrl !== '/raid-creation' &&
													(user.role === 'admin' ||
														user.role === 'guildMaster' ||
														user.role === 'moderator') ? (
														<Button
															variant='contained'
															color='secondary'
															disabled={isLoading}
															style={{
																fontSize: '0.6rem',
																marginBottom: '15%',
															}}
															onClick={() => handleDeleteAssignment(assign)}>
															Delete Assignment
														</Button>
													) : user.role === 'admin' ||
													  user.role === 'moderator' ||
													  user.role === 'guildMaster' ? (
														<Button
															variant='contained'
															color='secondary'
															disabled={isLoading}
															style={{
																fontSize: '0.6rem',
																marginBottom: '15%',
															}}
															onClick={() => handleRemoveAssignment(assign, i)}>
															Remove Assignment
														</Button>
													) : (
														''
													)}
												</div>
											</Card.Body>
										</Card>
									</div>
								))}
							</div>
							{show && (
								<EditAssignments
									show={show}
									setShow={setShow}
									setActiveAssignments={setActiveAssignments}
									activeAssignments={activeAssignments}
								/>
							)}
						</Paper>
					) : (
						<>
							{user.role === 'guildMaster' || user.role === 'moderator' ? (
								<div className='d-flex flex-column justify-content-center align-items-center'>
									<Typography variant='h4' className='my-3'>
										Currently no assignments, Lets create one!
									</Typography>
									<Button
										variant='contained'
										color='primary'
										className='my-5 '
										component={Link}
										to='/assignments'>
										Lets create an assignment!
									</Button>
									<img
										src={empty}
										alt='empty roster'
										style={{ width: '450px' }}
									/>
								</div>
							) : (
								<p>
									Currently no assignments, wait for an officer to create one!
								</p>
							)}
						</>
					)}
				</div>
			) : (
				<LoadingSpinner />
			)}
		</>
	);
};

export default ViewAssignments;
