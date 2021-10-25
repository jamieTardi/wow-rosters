import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, Paper, TextField, Select, MenuItem } from '@material-ui/core';
import { useStyles } from '../Form/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, updateMember, updateGuild } from '../../api';
import { Grid, InputLabel } from '@mui/material';

const AddMod = ({ show, setShow }) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [allUsers, setAllUsers] = useState(null);
	const [newEmail, setNewEmail] = useState('');
	const [newEmailConfirm, setNewEmailConfirm] = useState('');
	const [isSameEmail, setIsSameEmail] = useState(false);
	const [newMod, setNewMod] = useState(null);
	const [serverMsg, setServerMsg] = useState(null);
	const [userData, setUserData] = useState(null);
	const [disabledBtn, setDisabledBtn] = useState(true);
	const [actionType, setActionType] = useState('promote');

	const guildData = useSelector((state) => state.guildData);
	const currentUser = useSelector((state) => state.currentUser);

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
				setServerMsg,
				setUserData,
			);
		} else if (newMod) {
			updateMember(
				newMod._id,
				{ ...newMod, role: 'moderator' },
				setServerMsg,
				setUserData,
			);
		} else {
			alert('There is currently no moderator, please try again.');
		}
	};

	const handleDemoteMember = () => {
		allUsers.forEach((user) => {
			if (
				user.role === 'moderator' &&
				(user.character === user.character || user.email === newEmailConfirm)
			) {
				updateMember(
					user._id,
					{ ...user, role: 'member' },
					setServerMsg,
					setUserData,
				);
				setUserData(user);
			}
		});
	};

	const handleRemoveMember = () => {
		allUsers.forEach((user) => {
			if (
				user.character === newEmailConfirm ||
				user.email === newEmailConfirm
			) {
				updateMember(
					user._id,
					{ ...user, guild: 'guildless' },
					setServerMsg,
					setUserData,
				);
				setUserData(user);
			}
		});
		guildData.forEach((guild) => {
			if (guild.name === currentUser.guild) {
				let filitered = guild.members.filter((member) => {
					return member !== newEmailConfirm;
				});
				updateGuild(guild._id, { ...guild, members: filitered });
			}
		});
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
					if (user.role === 'member') {
						setDisabledBtn(false);
					}
				} else if (user.character === newEmailConfirm) {
					setDisabledBtn(false);
				} else {
					setDisabledBtn(true);
				}
			});
		} else {
			setIsSameEmail(false);
			setDisabledBtn(true);
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
			<Paper className={classes.paperDashboard}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<InputLabel>Choose a function</InputLabel>
						<Select fullWidth>
							{[
								{ name: 'Promote Member', type: 'promote' },
								{ name: 'Demote Member', type: 'demote' },
								{ name: 'Remove Member', type: 'remove' },
							].map((option) => (
								<MenuItem
									key={option.name}
									value={option.name}
									className='text-white'
									onClick={() => {
										setActionType(option.type);
									}}>
									{option.name}
								</MenuItem>
							))}
						</Select>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id='standard-basic'
							className={classes.input}
							fullWidth
							label={
								actionType === 'promote'
									? 'New moderators Email'
									: 'Character Name'
							}
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
							label={
								actionType === 'promote'
									? 'New moderators Email'
									: 'Character Name'
							}
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
							{isSameEmail ? 'Inputs match' : 'Inputs do not match'}
						</p>

						{newMod !== null && (
							<>
								{newMod.role !== 'moderator' &&
								newMod.role !== 'guildMaster' ? (
									<p>
										This user {newMod.character} is currently a {newMod.role},
										if you wish to upgrade them to moderator rank please click
										Append User button.
									</p>
								) : (
									<p>
										This user {newMod.character} is already a {newMod.role} and
										cannot be upgraded.
									</p>
								)}{' '}
							</>
						)}

						{userData !== null &&
						userData.status === 403 &&
						userData !== undefined ? (
							<p style={{ color: 'red !important' }}>
								{serverMsg.data.message}
							</p>
						) : (
							userData !== null &&
							userData !== undefined &&
							`The user has been ${
								actionType === 'promote'
									? 'promoted'
									: actionType === 'demote'
									? 'demoted'
									: 'removed'
							}`
						)}
					</Grid>

					<div className='d-flex justify-content-around w-100'>
						<Button
							color='primary'
							variant='contained'
							onClick={
								actionType === 'promote'
									? handleCreateMod
									: actionType === 'demote'
									? handleDemoteMember
									: handleRemoveMember
							}
							disabled={disabledBtn}>
							Append User
						</Button>
					</div>
				</Grid>
			</Paper>
		</>
	);
};

export default AddMod;
