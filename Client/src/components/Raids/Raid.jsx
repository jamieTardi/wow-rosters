import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const Raid = ({ raid }) => {
	const [expandCard, setExpandCard] = useState(false);
	return (
		<div>
			<Card style={{ width: '18rem' }}>
				<Card.Img variant='top' src={raid.selectedFile[0]} />
				<Card.Body>
					<Card.Title>{raid.title}</Card.Title>
					<Card.Text
						style={!expandCard ? { display: 'none' } : { display: 'block' }}>
						Some quick example text to build on the card title and make up the
						bulk of the card's content.
					</Card.Text>
					<Button variant='primary'>Go somewhere</Button>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Raid;
