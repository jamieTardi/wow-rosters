import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Button,
	Card,
	CardContent,
	CardActions,
	Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EjectIcon from '@mui/icons-material/Eject';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SmallModal from '../UIcomponents/SmallModal';
import { useStyles } from '../Form/styles';
import LoadingSpinner from '../UIcomponents/LoadingSpinner';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SecurityIcon from '@mui/icons-material/Security';
import { CURRENT_GUILD } from '../../constants/actionTypes';
const Information = ({ tabInfo, setTabInfo }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	//Local state
	const [open, setOpen] = useState(false);
	const [myGuild, setMyGuild] = useState(null);

	//redux state
	const currentUser = useSelector((state) => state.currentUser);
	const guilds = useSelector((state) => state.guildData);

	//General local logic

	const handleOpen = () => setOpen(true);

	const handleEmailEdit = () => {
		setTabInfo({ modelName: 'Change Email', member: currentUser });
		handleOpen();
	};

	const handleNameEdit = () => {
		setTabInfo({ modelName: 'Add Member', member: currentUser });
		handleOpen();
	};

	const handleLeave = () => {
		setTabInfo({ modelName: 'Leave Guild', member: currentUser });
		handleOpen();
	};

	useEffect(() => {
		let filitered = guilds.filter((guild) => {
			return guild.name === currentUser.guild;
		});
		setMyGuild(filitered[0]);
		dispatch({ type: CURRENT_GUILD, payload: filitered[0] });
	}, [guilds]);

	//Arrays and objects

	//character name update needs to update on guild too
	const dashBoardItems = [
		{
			title: 'Character Name:',
			classType: 'name',
			info: <span className='dull-white'>{currentUser.character}</span>,
			logic: (
				<EditIcon onClick={handleNameEdit} style={{ cursor: 'pointer' }} />
			),
		},
		{
			title: 'Guild member of:',
			classType: 'guild',
			info: <span className='dull-white'>{currentUser.guild}</span>,
			logic: <DashboardIcon />,
		},
		{
			title: 'Leave Guild:',
			classType: 'leave',
			info: <span className='dull-white'>{currentUser.guild}</span>,
			logic: <EjectIcon onClick={handleLeave} style={{ cursor: 'pointer' }} />,
		},
		{
			title: 'Email Address:',
			classType: 'change-email',
			info: <span className='dull-white'>{currentUser.email}</span>,
			logic: (
				<EditIcon onClick={handleEmailEdit} style={{ cursor: 'pointer' }} />
			),
		},
		{
			title: 'Current Number of raiders:',
			classType: 'number-raiders',
			info: (
				<span className='dull-white'>
					{myGuild ? myGuild.members.length : 0}
				</span>
			),
			logic: <EmojiPeopleIcon />,
		},
		{
			title: 'Current Faction:',
			classType: 'faction',
			info: (
				<span className='dull-white'>{myGuild ? myGuild.faction : ''}</span>
			),
			logic: <SecurityIcon />,
		},
	];

	return (
		<>
			{myGuild ? (
				<>
					<div className='grid-wrapper'>
						{dashBoardItems.map((item) => (
							<div className={item.classType}>
								<Card sx={{ minWidth: 275 }} className={classes.miniCard}>
									<CardContent>
										<Typography
											sx={{ fontSize: 14 }}
											color='text.secondary'
											gutterBottom>
											{item.title}
										</Typography>

										<Typography variant='body2'>{item.info}</Typography>
									</CardContent>
									<CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
										{item.logic}
									</CardActions>
								</Card>
							</div>
						))}
					</div>
					<SmallModal
						tabInfo={tabInfo}
						setOpen={setOpen}
						open={open}
						setTabInfo={setTabInfo}
					/>
				</>
			) : (
				<LoadingSpinner />
			)}
		</>
	);
};

export default Information;
