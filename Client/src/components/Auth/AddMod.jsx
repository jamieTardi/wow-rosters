import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, TextField } from '@material-ui/core';
import { useStyles } from '../Form/styles';
import { updateuser } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { getAllUsers, updateMember } from '../../api';
import { Grid } from '@mui/material';
import { grid } from '@mui/system';

const AddMod = ({ show, setShow }) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [allUsers, setAllUsers] = useState(null);
	const [newEmail, setNewEmail] = useState('');
	const [newEmailConfirm, setNewEmailConfirm] = useState('');
	const [isSameEmail, setIsSameEmail] = useState(false);
	const [newMod, setNewMod] = useState(null);
	const [serverMsg, setServerMsg] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleAddEmail = (e) => {
		setNewEmail(e.target.value);
	};

	const handleConfirmEmail = (e) => {
		setNewEmailConfirm(e.target.value);
	};

	const handleCreateMod = () => {
		if (
			newMod &&
			JSON.parse(localStorage.getItem('profile')).result !== undefined
		) {
			let user = JSON.parse(localStorage.getItem('profile')).result;
			let currentGoogleUser = {
				name: user.name,
				email: user.email,
				id: user.id,
				password: '',
				role: 'moderator',
			};
			localStorage.setItem('profile', JSON.stringify(currentGoogleUser));

			updateMember(
				newMod._id,
				{ ...newMod, role: 'moderator' },
				setIsLoading,
				setServerMsg,
			);
		} else if (newMod) {
			updateMember(
				newMod._id,
				{ ...newMod, role: 'moderator' },
				setIsLoading,
				setServerMsg,
			);
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

	useEffect(() => {
		setNewMod(null);
		setIsSameEmail(null);
	}, [show]);

	useEffect(() => {
		getAllUsers(setAllUsers);
		setServerMsg(null);
	}, []);

	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
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
				</Grid>

				<Grid item xs={12} sm={6}>
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
				</Grid>
				<Grid item sm={12}>
					<p className='my-3'>
						{isSameEmail ? 'Emails match' : 'Emails do not match'}
					</p>

					{newMod && (
						<p>
							This user {newMod.name} is currently a {newMod.role}, if you wish
							to upgrade them to moderator rank please click Add Moderator
							button.
						</p>
					)}

					{serverMsg !== null &&
					serverMsg.status === 403 &&
					serverMsg !== undefined ? (
						<p style={{ color: 'red !important' }}>{serverMsg.data.message}</p>
					) : (
						serverMsg !== null &&
						serverMsg.status === 200 && (
							<p>{serverMsg.data.name} has been made an moderator.</p>
						)
					)}
				</Grid>

				<div className='d-flex justify-content-around w-100'>
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
				</div>
			</Grid>
		</>
	);
};

export default AddMod;
