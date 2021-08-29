import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteRaid } from '../../actions/raids';
import { useDispatch, useSelector } from 'react-redux';

const DeleteRaid = ({ raid, deleteWarning, setDeleteWarning }) => {
	const isLoading = useSelector((state) => state.deleteLoad);
	const dispatch = useDispatch();
	const handleClose = () => setDeleteWarning(false);

	const handleDeleteRaid = () => {
		dispatch(deleteRaid(raid._id));
	};

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
					<Button variant='danger' onClick={handleDeleteRaid}>
						Delete Raid
					</Button>
					{isLoading && <p>Loading the delete</p>}
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default DeleteRaid;
