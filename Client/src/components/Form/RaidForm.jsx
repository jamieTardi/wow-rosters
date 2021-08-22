import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const RaidForm = ({ raidModalShow, setRaidModalShow }) => {
	const handleClose = () => setRaidModalShow(false);

	return (
		<>
			<Modal show={raidModalShow} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Create a new raid</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Email address</Form.Label>
							<Form.Control type='email' placeholder='name@example.com' />
						</Form.Group>
						<Form.Group
							className='mb-3'
							controlId='exampleForm.ControlTextarea1'>
							<Form.Label>Example textarea</Form.Label>
							<Form.Control as='textarea' rows={3} />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='primary' onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default RaidForm;
