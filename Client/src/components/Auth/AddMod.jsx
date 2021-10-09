import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, TextField } from '@material-ui/core';
import { useStyles } from '../Form/styles';
import { updateuser } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../api';

const AddMod = ({ show, setShow }) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [allUsers, setAllUsers] = useState(null);
	const [newEmail, setNewEmail] = useState('');
	const [newEmailConfirm, setNewEmailConfirm] = useState('');
	const [isSameEmail, setIsSameEmail] = useState(false);
	const [newMod, setNewMod] = useState(null);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleAddEmail = (e) => {
		setNewEmail(e.target.value);
	};

	const handleConfirmEmail = (e) => {
		setNewEmailConfirm(e.target.value);
	};

	const handleCreateMod = () => {
		if (newMod) {
			dispatch(updateuser(newMod._id, newMod));
		} else {
			alert('There is currently no moderator, please try again.');
		}
	};

	useEffect(() => {
		if (
			newEmailConfirm.toLowerCase() === newEmail.toLowerCase() &&
			newEmailConfirm !== ''
		) {
			setIsSameEmail(true);
			allUsers.forEach((user) => {
				if (user.email === newEmailConfirm) {
					setNewMod(user);
				}
			});
		} else {
			setIsSameEmail(false);
		}
	}, [newEmailConfirm]);

	console.log(newMod);

	useEffect(() => {
		getAllUsers(setAllUsers);
	}, []);

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

				{newMod && (
					<p>
						This user {newMod.name} is currently a {newMod.role}, if you wish to
						upgrade them to moderator rank please click Add Moderator button.
					</p>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button color='secondary' variant='contained' onClick={handleClose}>
					Close
				</Button>
				<Button
					color='primary'
					variant='contained'
					onClick={handleCreateMod}
					disabled={!isSameEmail}>
					Add Moderator
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default AddMod;
