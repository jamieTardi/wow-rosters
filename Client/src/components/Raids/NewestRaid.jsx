import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import defaultImg from '../../images/sscImage.jpg';
import DeleteRaid from './DeleteRaid';

const NewestRaid = ({ raid, setSelectedRaid, setExpandCard }) => {
	const dispatch = useDispatch();
	const [deleteWarning, setDeleteWarning] = useState(false);

	const handleShowRaid = (raid) => {
		dispatch({ type: 'CURRENT_RAID', payload: raid });
		setSelectedRaid(raid);
		setExpandCard(true);
	};
	const handleDeleteRaid = () => {
		setDeleteWarning(true);
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
							src={
								raid.selectedFile[0] !== '' ? raid.selectedFile[0] : defaultImg
							}
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
					<div className='custom-button-2' onClick={handleDeleteRaid}>
						Delete this Raid
					</div>
				</div>
			</Card>
			{deleteWarning && (
				<DeleteRaid
					raid={raid}
					deleteWarning={deleteWarning}
					setDeleteWarning={setDeleteWarning}
				/>
			)}
		</div>
	);
};

export default NewestRaid;
