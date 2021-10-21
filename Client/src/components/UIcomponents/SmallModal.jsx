import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useStyles } from '../Form/styles';
import { updateMember } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_USER } from '../../constants/actionTypes';

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
	const classes = useStyles();
	const currentUser = useSelector((state) => state.currentUser);

	const handleClose = () => {
		setOpen(false);
		setTabInfo({});
	};
	const [newName, setNewName] = useState('');
	const [isLoading, setIsLoading] = useState(null);
	const dispatch = useDispatch();

	const handleModalInput = (e) => {
		setNewName(e.target.value);
	};

	const handleSubmit = () => {
		setIsLoading(true);
		updateMember(
			currentUser._id,
			{ ...currentUser, character: newName },
			setIsLoading,
		);
		dispatch({
			type: CURRENT_USER,
			payload: { ...currentUser, character: newName },
		});
		handleClose();
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
								: ''
						}
						onChange={(e) => {
							handleModalInput(e);
						}}
					/>
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
