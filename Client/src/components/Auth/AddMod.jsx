import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, TextField } from '@material-ui/core';
import { useStyles } from '../Form/styles';

const AddMod = ({ show, setShow }) => {
	const classes = useStyles();

	const [newEmail, setNewEmail] = useState('');
	const [newEmailConfirm, setNewEmailConfirm] = useState('');
	const [isSameEmail, setIsSameEmail] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleAddEmail = (e) => {
		setNewEmail(e.target.value);
	};

	const handleConfirmEmail = (e) => {
		setNewEmailConfirm(e.target.value);
		if (newEmailConfirm.toLowerCase() === newEmail.toLowerCase()) {
			setIsSameEmail(true);
		}
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Body>
				<TextField
					id='standard-basic'
					className={classes.input}
					fullWidth
					label='New moderators Email'
					onChange={(e) => {
						handleAddEmail(e);
					}}
					InputLabelProps={{
						style: { color: '#fff ' },
					}}
				/>

				<p className='mt-3'>Email address: {newEmail}</p>

				<TextField
					id='standard-basic'
					className={classes.input}
					fullWidth
					label='Confirm Email'
					onChange={(e) => {
						handleConfirmEmail(e);
					}}
					InputLabelProps={{
						style: { color: '#fff ' },
					}}
				/>

				<p>{isSameEmail ? 'Emails match' : 'Emails do not match'}</p>
			</Modal.Body>
			<Modal.Footer>
				<Button color='secondary' variant='contained' onClick={handleClose}>
					Close
				</Button>
				<Button color='primary' variant='contained' onClick={handleClose}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default AddMod;
