import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteRaid = ({ raid, deleteWarning, setDeleteWarning }) => {
	const handleClose = () => setDeleteWarning(false);

	return (
		<>
			<Modal
				show={deleteWarning}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure you want to delete this raid</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Clicking delete will remove this raid from the database permanently.
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='danger'>Delete Raid</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default DeleteRaid;
