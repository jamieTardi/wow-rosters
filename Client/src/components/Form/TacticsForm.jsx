import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const TacticsForm = () => {
	let numberOfRows = [];

	for (let i = 1; i < 20; i++) {
		numberOfRows.push(i);
	}

	console.log(numberOfRows);

	return (
		<div>
			<Form>
				<h3>Tactics Form</h3>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Title</Form.Label>
					<Form.Control type='email' placeholder='Tank assignments etc' />
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Create a Table</Form.Label>
					<Form.Select aria-label='Default select example'>
						<option>Number of Columns</option>

						{numberOfRows.map((num) => (
							<option value={num}>{num}</option>
						))}
					</Form.Select>
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicCheckbox'>
					<Form.Check type='checkbox' label='Check me out' />
				</Form.Group>
				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default TacticsForm;
