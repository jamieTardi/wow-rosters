import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAssignments } from '../../actions/assignments';
import { Card } from 'react-bootstrap';
import { Paper, Typography, Button } from '@material-ui/core';
import empty from '../../images/empty.svg';
import { Link } from 'react-router-dom';
import EditAssignments from '../EditPages/EditAssignments';
import { CURRENT_ASSIGNMENT } from '../../constants/actionTypes';

const ViewAssignments = () => {
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const assignments = useSelector((state) => state.assignments);

	const handleViewAssignment = (assign) => {
		dispatch({ type: CURRENT_ASSIGNMENT, payload: assign });
		setShow((prev) => !prev);
	};

	useEffect(() => {
		dispatch(getAssignments());
	}, []);
	return (
		<div className='my-5'>
			{assignments.length > 0 ? (
				<Paper className='container '>
					<Typography variant='h5' gutterBottom className='pt-3'>
						Select a roster from below
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
										<Button
											variant='contained'
											color='default'
											onClick={() => {
												handleViewAssignment(assign);
											}}
											style={{ fontSize: '0.6rem', marginBottom: '15%' }}>
											View Assignment
										</Button>
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
