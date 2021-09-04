import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import defaultImg from '../../images/sscImage.jpg';
import DeleteRaid from './DeleteRaid';

const Raid = ({ raid, setSelectedRaid, setExpandCard }) => {
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
	useEffect(() => {
		dispatch({ type: 'CURRENT_ID', payload: raid._id });
	}, []);

	return (
		<div className='col-6 col-md-4 col-lg-4 mb-5'>
			<Card style={{ width: '90%' }}>
				<Card.Img
					variant='top'
					src={raid.selectedFile[0] !== '' ? raid.selectedFile[0] : defaultImg}
					style={{ height: '200px' }}
				/>
				<Card.Body>
					<Card.Title>{raid.title}</Card.Title>
					<Card.Text>{raid.message.substring(0, 100)}...</Card.Text>
				</Card.Body>

				<div className='d-flex align-items-center justify-content-between custom-button-container'>
					<div
						className='custom-button-1 py-2'
						style={{ fontSize: '0.8rem' }}
						onClick={() => {
							handleShowRaid(raid);
						}}>
						See Raid Details
					</div>
					<div
						className='custom-button-2 py-2'
						style={{ fontSize: '0.8rem' }}
						onClick={() => {
							handleDeleteRaid(raid);
						}}>
						Delete this raid
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

export default Raid;
