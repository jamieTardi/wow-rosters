import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { AnimatePresence, motion } from 'framer-motion';

const Raid = ({ raid, setSelectedRaid, setExpandCard }) => {
	const handleShowRaid = (raid) => {
		setSelectedRaid(raid);
		setExpandCard(true);
	};
	return (
		<div className='col-6 col-md-4 col-lg-4'>
			<Card style={{ width: '90%' }}>
				<Card.Img
					variant='top'
					src={raid.selectedFile[0]}
					style={{ height: '200px' }}
				/>
				<Card.Body>
					<Card.Title>{raid.title}</Card.Title>
					<Card.Text>
						Some quick example text to build on the card title and make up the
						bulk of the card's content.
					</Card.Text>
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
							handleShowRaid(raid);
						}}>
						Create a Roster
					</div>
				</div>
			</Card>
		</div>
	);
};

export default Raid;
