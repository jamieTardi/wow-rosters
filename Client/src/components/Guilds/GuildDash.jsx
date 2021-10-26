import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tabs from '@mui/material/Tabs';
import { useStyles } from '../Form/styles';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { getGuilds } from '../../actions/guilds';
import { useDispatch } from 'react-redux';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import CelebrationIcon from '@mui/icons-material/Celebration';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddMember from './AddMember';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import Information from './Information';
import AddMod from '../Auth/AddMod';

const GuildDash = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const currentUser = useSelector((state) => state.currentUser);
	const guilds = useSelector((state) => state.guildData);
	const darkMode = useSelector((state) => state.darkMode);
	const [value, setValue] = useState(4);
	const [tabInfo, setTabInfo] = useState({});

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleTabInfo = () => {
		setTabInfo({ modelName: 'Add Member', member: currentUser });
	};

	useEffect(() => {
		dispatch(getGuilds());
	}, []);

	return (
		<div>
			<Paper className={classes.paper}>
				<Typography variant='h4' className={classes.title}>
					Guild Admin Dashboard for {currentUser.guild}
				</Typography>
				<TabContext value={value}>
					<Box sx={{ width: '100%' }}>
						<Tabs
							centered
							value={value}
							onChange={handleChange}
							variant='scrollable'
							scrollButtons
							allowScrollButtonsMobile
							textColor='primary'
							indicatorColor='primary'
							aria-label='secondary tabs example'>
							<Tab
								value='1'
								icon={<AddReactionIcon />}
								label='Add Member'
								style={darkMode ? { color: '#fff' } : { color: '#000' }}
							/>

							<Tab
								value='3'
								icon={<CelebrationIcon />}
								label='Promote/Demote Member'
								style={darkMode ? { color: '#fff' } : { color: '#000' }}
							/>

							<Tab
								value='5'
								icon={<DeleteForeverIcon />}
								label='Delete Guild'
								style={darkMode ? { color: '#fff' } : { color: '#000' }}
							/>

							<Tab
								value='4'
								icon={<PersonPinIcon />}
								label='Information'
								onClick={handleTabInfo}
								style={darkMode ? { color: '#fff' } : { color: '#000' }}
							/>
						</Tabs>
					</Box>
					<TabPanel value='1' className='mt-4'>
						{currentUser.role === 'guildMaster' ||
						currentUser.role === 'moderator' ? (
							<AddMember setValue={setValue} />
						) : (
							<p>Only officers can add members to the guild.</p>
						)}
					</TabPanel>

					<TabPanel value='3'>
						{currentUser.role === 'guildMaster' ? (
							<AddMod />
						) : (
							<p>Only guild masters can Promote and delete members</p>
						)}
					</TabPanel>
					<TabPanel value='4'>
						<Information
							setValue={setValue}
							tabInfo={tabInfo}
							setTabInfo={setTabInfo}
						/>
					</TabPanel>

					<TabPanel value='5'>
						{currentUser.role === 'guildMaster' ? (
							'Under Construction'
						) : (
							<p>Only Guild masters can delete a guild</p>
						)}
					</TabPanel>
				</TabContext>
			</Paper>
		</div>
	);
};

export default GuildDash;
