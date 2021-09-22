import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Paper, Button } from '@material-ui/core';
import ExpandCard from '../UIcomponents/ExpandCard';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AssignRoster from '../Roster/AssignRoster';
import { useDispatch } from 'react-redux';
import { CURRENT_ROSTER, CLEAR_RAID } from '../../constants/actionTypes';

const RaidPageTwo = ({ raidForm, setRaidForm }) => {
	const dispatch = useDispatch();
	const rosters = useSelector((state) => state.createdRosters);
	const [activeIndex, setActiveIndex] = useState(null);

	const handleAddRoster = (roster, i) => {
		setActiveIndex(i);
		setRaidForm({ ...raidForm, roster });
	};

	const handleViewRoster = (roster) => {
		dispatch({ type: CURRENT_ROSTER, payload: roster });
		dispatch({ type: CLEAR_RAID });
	};

	return (
		<div>
			{rosters.length > 0 ? (
				<Paper className='container '>
					<Typography variant='h5' gutterBottom className='pt-3'>
						Select a roster from below
					</Typography>
					<div className='row'>
						{rosters.map((roster, i) => (
							<div
								className={
									activeIndex === i
										? 'mini-card col-12 col-md-6 mb-3 selected-roster'
										: 'mini-card col-12 col-md-6 mb-3'
								}>
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
											Click the button below to view or assign raid.
										</Card.Text>
										<Button
											variant='contained'
											color='default'
											component={Link}
											to='/current-roster'
											onClick={() => {
												handleViewRoster(roster);
											}}
											style={{ fontSize: '0.6rem', marginBottom: '15%' }}>
											View Roster
										</Button>

										{activeIndex === i ? (
											<Button
												variant='contained'
												color='primary'
												disabled
												className='disabled-button'
												style={{ fontSize: '0.6rem' }}>
												Current Selected Roster
											</Button>
										) : (
											<Button
												variant='contained'
												color='primary'
												style={{ fontSize: '0.6rem' }}
												onClick={() => {
													handleAddRoster(roster, i);
												}}>
												Assign to Raid
											</Button>
										)}
									</Card.Body>
								</Card>
							</div>
						))}
					</div>
				</Paper>
			) : (
				<>
					<Typography variant='h4' className='my-3'>
						Currently no rosters assigned, Lets create one!
					</Typography>
					<Button
						variant='contained'
						color='primary'
						className='mb-3 '
						component={Link}
						to='/roster-creation'>
						Lets create a Roster!
					</Button>
					<Typography variant='h5' className='my-3'>
						In a rush? Just press next and create one and assign to this raid
						later.
					</Typography>
				</>
			)}
		</div>
	);
};

export default RaidPageTwo;
