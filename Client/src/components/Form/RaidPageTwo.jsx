import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Paper, Button } from '@material-ui/core';
import ExpandCard from '../UIcomponents/ExpandCard';
import { Card } from 'react-bootstrap';

const RaidPageTwo = ({ raidForm, setRaidForm }) => {
	const rosters = useSelector((state) => state.createdRosters);

	const handleAddRoster = (roster) => {
		console.log('click');
		setRaidForm({ ...raidForm, roster: roster });
	};
	console.log(raidForm);
	return (
		<div>
			{rosters.length > 0 ? (
				<Paper>
					<Typography variant='h5' gutterBottom>
						Select a roster from below
					</Typography>
					{rosters.map((roster, i) => (
						<div className='mini-card'>
							<Card style={{ width: '10rem' }}>
								<Card.Img
									variant='top'
									src={
										roster.image
											? roster.image
											: 'https://magazine.artstation.com/wp-content/uploads/2018/09/Illustration_GlennRane-1024x576.jpg'
									}
								/>
								<Card.Body>
									<Card.Title>Raid Roster {++i}</Card.Title>
									<Card.Text>
										Click the button below to view or assign raid {++i}
									</Card.Text>
									<Button
										variant='contained'
										color='default'
										style={{ fontSize: '0.6rem', marginBottom: '15%' }}>
										View Roster
									</Button>
									<Button
										variant='contained'
										color='primary'
										style={{ fontSize: '0.6rem' }}
										onClick={() => {
											handleAddRoster(roster);
										}}>
										Assign to Raid
									</Button>
								</Card.Body>
							</Card>
						</div>
					))}
				</Paper>
			) : (
				<>
					<Typography variant='h4' className='my-3'>
						Currently no rosters assigned, Lets create one!
					</Typography>
					<Button variant='contained' color='primary' className='mb-3 '>
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
