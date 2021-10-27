import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useStyles } from '../Form/styles';
import { updateGuild, updateMember } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_USER, LOGOUT } from '../../constants/actionTypes';
import { useHistory } from 'react-router-dom';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'black',
	backgroundColor: 'transparent',
	border: '2px solid #fff',
	boxShadow: 24,
	p: 4,
};

const SmallModal = ({ tabInfo, setOpen, open, setTabInfo }) => {
	const history = useHistory();
	const classes = useStyles();
	const currentUser = useSelector((state) => state.currentUser);
	const currentGuild = useSelector((state) => state.currentGuild);
	const [errorTxt, setErrorTxt] = useState(null);
	const [userData, setUserData] = useState('');
	const handleClose = () => {
		setOpen(false);
		setTabInfo({});
	};
	const [newName, setNewName] = useState('');
	const [isLoading, setIsLoading] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (tabInfo.modelName === 'Leave Guild') {
			if (newName !== currentUser.guild) {
				setErrorTxt('This guild does not match your current guild.');
			} else {
				setErrorTxt(null);
			}
		}
	}, [newName]);

	const handleSubmit = () => {
		setIsLoading(true);
		if (tabInfo.modelName !== 'Leave Guild') {
			updateMember(
				currentUser._id,
				{ ...currentUser, character: newName },
				setIsLoading,
				setUserData,
			);
			dispatch({
				type: CURRENT_USER,
				payload: { ...currentUser, character: newName },
			});
			handleClose();
		} else if (
			tabInfo.modelName === 'Leave Guild' &&
			currentUser.role !== 'guildMaster'
		) {
			updateMember(
				currentUser._id,
				{ ...currentUser, guild: 'guildless' },
				setIsLoading,
				setUserData,
			);
			let filitered = currentGuild.members.filter(
				(member) => member !== currentUser.character,
			);
			updateGuild(currentGuild._id, { ...currentGuild, members: filitered });
			dispatch({ type: LOGOUT });
			history.push('/');
			history.go(0);
			handleClose();
		} else {
			setErrorTxt(
				'An Error has happened. If it persists please contact us. If you are the Guild master you will have to either delete the guild or transfer membership.',
			);
		}
		setIsLoading(false);
	};

	return (
		<div>
			<Modal
				open={open}
				className={classes.modal}
				onClose={handleClose}
				BackdropProps={{ backgroundColor: 'transparent' }}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						{tabInfo.modelName}
					</Typography>
					{tabInfo.modelName === 'Leave Guild' && (
						<Typography id='modal-modal-title' variant='p' component='p'>
							By clicking submit you will be leaving the guild,{' '}
							{tabInfo.member.guild}.
						</Typography>
					)}
					<TextField
						id='standard-basic'
						required
						className={classes.input}
						variant='standard'
						fullWidth
						label={
							tabInfo.modelName === 'Add Member'
								? 'Edit your character name'
								: tabInfo.modelName === 'Change Email'
								? 'Enter new email address'
								: tabInfo.modelName === 'Leave Guild'
								? 'Type in your current guild name here'
								: ''
						}
						onChange={(e) => {
							setNewName(e.target.value);
						}}
					/>
					{errorTxt && <p>{errorTxt}</p>}
					<Button
						variant='contained'
						color='primary'
						className='mt-3'
						disabled={isLoading}
						onClick={handleSubmit}>
						Submit
					</Button>
				</Box>
			</Modal>
		</div>
	);
};
export default SmallModal;
