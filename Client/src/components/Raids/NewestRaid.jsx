import React from 'react';
import { Card, Button } from 'react-bootstrap';
import moment from 'moment';

const NewestRaid = ({ raid, setSelectedRaid, setExpandCard }) => {
	const handleShowRaid = (raid) => {
		setSelectedRaid(raid);
		setExpandCard(true);
	};
	return (
		<div className='w-100 d-flex justify-content-center align-items-center'>
			<Card
				style={{
					width: '75%',
					borderRadius: '0.25rem',
				}}>
				<Card.Title className='newest-title text-center'>
					Newest Raid added
				</Card.Title>
				<div className='d-flex'>
					<div
						style={{ width: '50%' }}
						className='d-flex justify-content-center align-items-center'>
						<Card.Img
							variant='top'
							src={raid.selectedFile[0]}
							style={{
								borderRadius: '5%',
								width: '50%',
								margin: '5%',
								objectFit: 'cover',
							}}
						/>
					</div>
					<div style={{ width: '50%' }}>
						<Card.Body>
							<Card.Header>
								🕒 Raid created {moment(raid.createdAt).fromNow()}{' '}
							</Card.Header>
							<Card.Text>{raid.message}</Card.Text>
						</Card.Body>
					</div>
				</div>
				<div className='d-flex align-items-center justify-content-between custom-button-container'>
					<div
						className='custom-button-1'
						onClick={() => {
							handleShowRaid(raid);
						}}>
						Show Raid Details
					</div>
					<div className='custom-button-2'>Show Raid Roster</div>
				</div>
			</Card>
		</div>
	);
};

export default NewestRaid;
