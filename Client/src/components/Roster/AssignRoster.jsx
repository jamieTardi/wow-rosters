import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button } from 'react-bootstrap';

const AssignRoster = () => {
	const dispatch = useDispatch();
	const roster = useSelector((state) => state.roster);
	return (
		<div>
			{roster.map((team) => (
				<Card style={{ width: '14rem' }}>
					<Card.Body>
						<Card.Title>See this roster</Card.Title>
						<Card.Text>
							Some quick example text to build on the card title and make up the
							bulk of the card's content.
						</Card.Text>
						<Button variant='primary'>🟢 Go somewhere</Button>
					</Card.Body>
				</Card>
			))}
		</div>
	);
};

export default AssignRoster;
