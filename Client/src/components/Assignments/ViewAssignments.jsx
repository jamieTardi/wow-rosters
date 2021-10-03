import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAssignment, getAssignments } from '../../actions/assignments';
import { Card } from 'react-bootstrap';
import { Paper, Typography, Button, Fab } from '@material-ui/core';
import empty from '../../images/empty.svg';
import { Link, useLocation } from 'react-router-dom';
import EditAssignments from '../EditPages/EditAssignments';
import { CURRENT_ASSIGNMENT } from '../../constants/actionTypes';
import { deleteImage } from '../../api';
import CloseIcon from '@material-ui/icons/Close';

const ViewAssignments = ({ raidForm, setRaidForm }) => {
	const location = useLocation();
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const assignments = useSelector((state) => state.assignments);
	const currentUrl = location.pathname;
	const [selectedAssignment, setSelectedAssignment] = useState(null);
	const [activeAssignments, setActiveAssignments] = useState([]);

	const handleViewAssignment = (assign) => {
		dispatch({ type: CURRENT_ASSIGNMENT, payload: assign });
		setShow((prev) => !prev);
	};

	const handleAddAssignment = (assign, i) => {
		setRaidForm({ ...raidForm, tactics: [...raidForm.tactics, assign] });
		setSelectedAssignment(
			selectedAssignment ? [...selectedAssignment, assign] : [assign],
		);
		setActiveAssignments([...activeAssignments, assign._id]);
	};

	const handleRemoveAssignment = (assign, i) => {
		const id = assign._id;
		let filitered = selectedAssignment.filter((assignment) => {
			console.log(assignment);
			console.log(assign);
			return assignment._id !== id;
		});
		setSelectedAssignment(filitered);
	};

	console.log(selectedAssignment);

	const handleDeleteAssignment = (assign) => {
		let img = assign.image?.substring(
			assign.image.lastIndexOf('/') + 1,
			assign.image.length,
		);
		const id = assign._id;
		setIsLoading(true);
		dispatch(deleteAssignment(id, setIsLoading));
		dispatch(deleteImage(img));
	};

	useEffect(() => {
		dispatch(getAssignments());
	}, []);

	useEffect(() => {
		dispatch(getAssignments());
	}, [assignments.length]);

	return (
		<div className='my-5'>
			{assignments.length > 0 ? (
				<Paper className='container '>
					<Typography variant='h5' gutterBottom className='pt-3'>
						Select a assignment from below
					</Typography>
					<div className='row'>
						{assignments.map((assign, i) => (
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
														style={{ fontSize: '0.6rem', marginBottom: '15%' }}
														onClick={() => handleAddAssignment(assign, i)}>
														Add this Assignment
													</Button>
												</>
											)}
											{currentUrl !== '/raid-creation' ? (
												<Button
													variant='contained'
													color='secondary'
													disabled={isLoading}
													style={{ fontSize: '0.6rem', marginBottom: '15%' }}
													onClick={() => handleDeleteAssignment(assign)}>
													Delete Assignment
												</Button>
											) : (
												<Button
													variant='contained'
													color='secondary'
													disabled={isLoading}
													style={{ fontSize: '0.6rem', marginBottom: '15%' }}
													onClick={() => handleRemoveAssignment(assign, i)}>
													Remove Assignment
												</Button>
											)}
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
					<img src={empty} alt='empty roster' style={{ width: '450px' }} />
				</div>
			)}

			{selectedAssignment && (
				<div className='mt-2'>
					<h3>Selected Assignments</h3>
					{selectedAssignment?.map((assign) => (
						<Fab variant='extended' className='mt-2 ms-2'>
							{assign.title}
						</Fab>
					))}
				</div>
			)}
		</div>
	);
};

export default ViewAssignments;
