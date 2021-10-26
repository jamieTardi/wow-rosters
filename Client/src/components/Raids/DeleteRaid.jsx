import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteRaid } from '../../actions/raids';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteImage } from '../../api';
import { imageTrim } from '../../lib/trimImage';

const DeleteRaid = ({ raid, deleteWarning, setDeleteWarning }) => {
	const history = useHistory();

	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const handleClose = () => setDeleteWarning(false);

	const handleDeleteRaid = () => {
		let img = imageTrim(raid.selectedFile[0]);
		setIsLoading(true);
		dispatch(deleteRaid(raid._id, setIsLoading));
		handleClose();
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
					<Button
						variant='danger'
						onClick={handleDeleteRaid}
						disabled={isLoading}>
						Delete Raid
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default DeleteRaid;
