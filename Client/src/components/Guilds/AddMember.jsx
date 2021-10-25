import {
	Button,
	CircularProgress,
	Grid,
	TextField,
	Typography,
	Paper,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useStyles } from '../Form/styles';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, updateGuild, fetchGuilds, addMember } from '../../api';
import { CURRENT_GUILD } from '../../constants/actionTypes';

const AddMember = ({ setValue }) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	//redux
	const currentUser = useSelector((state) => state.currentUser);
	const currentGuild = useSelector((state) => state.currentGuild);
	const guilds = useSelector((state) => state.guildData);

	//local state
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
		addMember(
			newMember._id,
			{
				...newMember,
				guild: currentUser.guild,
				character: toon,
				role: 'member',
			},
			setServerRes,
		);
		updateGuild(currentGuild._id, {
			...currentGuild,
			members: [...currentGuild.members, toon],
		});
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
		fetchGuilds();
	}, []);

	useEffect(() => {
		if (guilds) {
			let filitered = guilds.filter((guild) => {
				return guild.name === currentUser.guild;
			});
			if (filitered !== undefined) {
				dispatch({ type: CURRENT_GUILD, payload: filitered[0] });
			}
		}
	}, [guilds]);

	return (
		<div className='d-flex justify-content-center'>
			<Paper className={classes.paperDashboard}>
				<form onSubmit={(e) => handleAddMember(e)}>
					<Grid container spacing={3}>
						<Grid sm={12} className='d-flex justify-content-center'>
							<Typography variant='h5' sx={{ marginTop: '3%' }} gutterBottom>
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
			</Paper>
		</div>
	);
};

export default AddMember;
