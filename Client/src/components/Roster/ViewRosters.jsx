import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { Paper, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import empty from '../../images/empty-roster.svg';
import { CURRENT_ROSTER } from '../../constants/actionTypes';
import EditPageTwo from '../EditPages/EditPageTwo';

const ViewRosters = () => {
	const dispatch = useDispatch();
	const rosters = useSelector((state) => state.createdRosters);
	const currentRoster = useSelector((state) => state.currentRoster);
	const [show, setShow] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleViewRoster = (roster) => {
		setShow((prev) => !prev);
		dispatch({ type: CURRENT_ROSTER, payload: roster });
	};

	useEffect(() => {
		if (currentRoster !== null) {
			setShowModal(true);
		}
	}, [currentRoster]);

	return (
		<div className='my-5'>
			{rosters.length > 0 ? (
				<Paper className='container '>
					<Typography variant='h5' gutterBottom className='pt-3'>
						Select a roster from below
					</Typography>
					<div className='row'>
						{rosters.map((roster, i) => (
							<div className='mini-card col-12 col-md-4 mb-3'>
								<Card style={{ width: '90%' }}>
									<Card.Img
										variant='top'
										src={
											roster.image
												? roster.image
												: 'https://magazine.artstation.com/wp-content/uploads/2018/09/Illustration_GlennRane-1024x576.jpg'
										}
									/>
									<Card.Body>
										<Card.Title>{roster.title}</Card.Title>
										<Card.Text>
											Click the button below to view this roster.
										</Card.Text>
										<Button
											variant='contained'
											color='default'
											onClick={() => {
												handleViewRoster(roster);
											}}
											style={{ fontSize: '0.6rem', marginBottom: '15%' }}>
											View Roster
										</Button>
									</Card.Body>
								</Card>
							</div>
						))}
					</div>
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
			{showModal && <EditPageTwo show={show} setShow={setShow} />}
		</div>
	);
};

export default ViewRosters;
