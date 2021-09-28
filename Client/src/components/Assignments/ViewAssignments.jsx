import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAssignment, getAssignments } from '../../actions/assignments';
import { Card } from 'react-bootstrap';
import { Paper, Typography, Button } from '@material-ui/core';
import empty from '../../images/empty.svg';
import { Link, useLocation } from 'react-router-dom';
import EditAssignments from '../EditPages/EditAssignments';
import { CURRENT_ASSIGNMENT } from '../../constants/actionTypes';

const ViewAssignments = ({ raidForm, setRaidForm }) => {
	const location = useLocation();
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const assignments = useSelector((state) => state.assignments);

	const handleViewAssignment = (assign) => {
		dispatch({ type: CURRENT_ASSIGNMENT, payload: assign });
		setShow((prev) => !prev);
	};

	const handleAddAssignment = (assign) => {
		setRaidForm({ ...raidForm, tactics: [...raidForm.tactics, assign] });
	};

	const handleDeleteAssignment = (assign) => {
		const id = assign._id;
		setIsLoading(true);
		dispatch(deleteAssignment(id, setIsLoading));
	};

	useEffect(() => {
		dispatch(getAssignments());
	}, []);

	useEffect(() => {
		dispatch(getAssignments());
	}, [assignments]);

	return (
		<div className='my-5'>
			{assignments.length > 0 ? (
				<Paper className='container '>
					<Typography variant='h5' gutterBottom className='pt-3'>
						Select a assignment from below
					</Typography>
					<div className='row'>
						{assignments.map((assign, i) => (
							<div className='mini-card col-12 col-md-4 mb-3'>
								<Card style={{ width: '100%' }}>
									<Card.Img
										variant='top'
										src={
											assign.image
												? assign.image
												: 'https://magazine.artstation.com/wp-content/uploads/2018/09/Illustration_GlennRane-1024x576.jpg'
										}
									/>
									<Card.Body>
										<Card.Title>{assign.title}</Card.Title>
										<Card.Text>
											Click the button below to view this assignment.
										</Card.Text>
										<div className='d-flex flex-md-column justify-content-between flex-xl-row'>
											<Button
												variant='contained'
												color='default'
												onClick={() => {
													handleViewAssignment(assign);
												}}
												style={{ fontSize: '0.6rem', marginBottom: '15%' }}>
												View Assignment
											</Button>

											{location.pathname === '/raid-creation' && (
												<>
													<Button
														variant='contained'
														color='primary'
														style={{ fontSize: '0.6rem', marginBottom: '15%' }}
														onClick={() => handleAddAssignment(assign)}>
														Add this assignment
													</Button>
												</>
											)}
											<Button
												variant='contained'
												color='secondary'
												disabled={isLoading}
												style={{ fontSize: '0.6rem', marginBottom: '15%' }}
												onClick={() => handleDeleteAssignment(assign)}>
												Delete Assignment
											</Button>
										</div>
									</Card.Body>
								</Card>
							</div>
						))}
					</div>
					{show && <EditAssignments show={show} setShow={setShow} />}
				</Paper>
			) : (
				<div className='d-flex flex-column justify-content-center align-items-center'>
					<Typography variant='h4' className='my-3'>
						Currently no assignments, Lets create one! In a rush? just create
						the raid!
					</Typography>
					<Button
						variant='contained'
						color='primary'
						className='my-5 '
						component={Link}
						to='/roster-creation'>
						Lets create an assignment!
					</Button>
					<img src={empty} alt='empty roster' style={{ width: '450px' }} />
				</div>
			)}
		</div>
	);
};

export default ViewAssignments;
