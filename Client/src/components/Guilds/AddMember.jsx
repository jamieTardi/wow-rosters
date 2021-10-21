import {
	Button,
	CircularProgress,
	Grid,
	TextField,
	Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useStyles } from '../Form/styles';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, updateMember } from '../../api';

const AddMember = ({ setValue }) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const currentUser = useSelector((state) => state.currentUser);
	const [userEmail, setUserEmail] = useState('');
	const [userRes, setUserRes] = useState(null);
	const [isUser, setIsUser] = useState(false);
	const [toon, setToon] = useState('');
	const [newMember, setNewMember] = useState('');
	const [serverRes, setServerRes] = useState(null);
	const [updateMsg, setUpdateMsg] = useState('');

	const handleAddMember = (e) => {
		e.preventDefault();
		setServerRes(true);
		setUpdateMsg(toon + ' has been added to the guild! 🎉');
		updateMember(
			newMember._id,
			{
				...newMember,
				guild: currentUser.guild,
				character: toon,
				role: 'member',
			},
			setServerRes,
		);
		setTimeout(() => {
			setUpdateMsg(null);
			setNewMember('');
			setValue(0);
		}, 3000);
	};

	useEffect(() => {
		if (userRes) {
			let member = userRes.filter((user) => user.email === userEmail);
			if (member.length !== 0) {
				setIsUser(true);
				setNewMember(member[0]);
			} else {
				setIsUser(false);
				setNewMember('');
			}
		}
	}, [userEmail]);

	useEffect(() => {
		getAllUsers(setUserRes);
	}, []);

	return (
		<div className='d-flex justify-content-center'>
			<form onSubmit={(e) => handleAddMember(e)}>
				<Grid container spacing={3}>
					<Grid sm={12} className='d-flex justify-content-center'>
						<Typography variant='h5' gutterBottom>
							Please fill in the form to add a member
						</Typography>
					</Grid>

					<Grid item sm={6} xs={12}>
						<TextField
							id='standard-basic'
							className={classes.input}
							variant='standard'
							required
							fullWidth
							label='Raider Email Address'
							onChange={(e) => setUserEmail(e.target.value)}
						/>
					</Grid>
					<Grid item sm={6} xs={12}>
						<TextField
							id='standard-basic'
							required
							className={classes.input}
							variant='standard'
							fullWidth
							label='Raider Character Name'
							onChange={(e) => setToon(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12}>
						<Typography variant='p' color={'green'}>
							{isUser && 'This user is an active member'}
						</Typography>
					</Grid>

					<Grid item sm={6} xs={12}>
						<Button
							variant='contained'
							disabled={serverRes}
							type='submit'
							startIcon={
								!serverRes ? (
									<PersonAddAlt1Icon />
								) : (
									<CircularProgress size={20} />
								)
							}
							color='primary'>
							Add Raider
						</Button>
					</Grid>
					{updateMsg && <p>{updateMsg}</p>}
				</Grid>
			</form>
		</div>
	);
};

export default AddMember;
