import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button } from '@material-ui/core';

import { useStyles } from '../Form/styles';
import DarkModeBTN from '../UIcomponents/DarkModeBTN';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { LOGOUT } from '../../constants/actionTypes';
import ExtensionIcon from '@material-ui/icons/Extension';
import GitHubIcon from '@material-ui/icons/GitHub';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import HomeIcon from '@material-ui/icons/Home';
import wowImage from '../../images/world.svg';
import FaceIcon from '@material-ui/icons/Face';
import {
	IconButton,
	Box,
	AppBar,
	Toolbar,
	Paper,
	List,
	ListItem,
	ListItemIcon,
	Divider,
	ListItemText,
	Drawer,
	MenuItem,
} from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import MenuIcon from '@material-ui/icons/Menu';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import BugReportIcon from '@material-ui/icons/BugReport';

const Nav = () => {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	const selectedUser = useSelector((state) => state.currentUser);
	const [openMenu, setOpenMenu] = useState(false);

	const toggleDrawer = () => {
		setOpenMenu((prev) => !prev);
	};

	const handleLogout = () => {
		dispatch({ type: LOGOUT });
		history.push('/');
		setUser(null);
		history.go(0);
	};

	useEffect(() => {
		const token = user?.token;

		setUser(JSON.parse(localStorage.getItem('profile')));
	}, [location]);

	return (
		<>
			<Box sx={{ flexGrow: 1 }} className='mt-3'>
				<AppBar position='static'>
					<Toolbar className='d-flex justify-content-between align-items-center'>
						<div>
							<IconButton
								size='large'
								edge='start'
								color='inherit'
								aria-label='menu'
								aria-controls='basic-menu'
								aria-haspopup='true'
								aria-expanded={true}
								onClick={() => {
									toggleDrawer();
								}}
								sx={{ mr: 2 }}>
								<MenuIcon />
							</IconButton>

							<Link to='/'>
								<img
									src={wowImage}
									style={{ width: '30px', height: '30px' }}
									alt='wow'
								/>
							</Link>
						</div>
						<div className='d-flex align-items-center'>
							<div className='me-5'>
								<DarkModeBTN />
							</div>
							{user ? (
								<div className={classes.profile}>
									<Button
										variant='text'
										className={classes.logout}
										startIcon={
											<Avatar
												className={classes.purple}
												alt={user.result.name}
												src={user.result.imageUrl}>
												{user.result.name.charAt(0)}
											</Avatar>
										}
										color='secondary'
										onClick={handleLogout}>
										Logout
									</Button>
								</div>
							) : (
								<div>
									<Button
										component={Link}
										to='/auth'
										variant='text'
										color='primary'>
										Sign in
									</Button>{' '}
								</div>
							)}
						</div>
					</Toolbar>
				</AppBar>
			</Box>

			<div>
				<Drawer openSecondary={true} open={openMenu}>
					<AppBar title='Tasks' />
					<Paper className={classes.drawer}>
						<List>
							<ListItem
								disablePadding
								style={{ cursor: 'pointer' }}
								onClick={() => {
									setOpenMenu(false);
								}}>
								<ListItemIcon>
									<ExitToAppIcon />
								</ListItemIcon>
							</ListItem>

							<ListItem style={{ cursor: 'pointer' }}>
								<ListItemIcon>
									<SportsEsportsIcon />
								</ListItemIcon>
								<Typography variant='h5'>WoW Rosters</Typography>
							</ListItem>
						</List>
						<List>
							<ListItem
								disablePadding
								style={{ cursor: 'pointer' }}
								component={Link}
								to='/'
								onClick={() => {
									setOpenMenu(false);
								}}>
								<ListItemIcon>
									<HomeIcon />
								</ListItemIcon>
								<ListItemText primary='Home' />
							</ListItem>
							{selectedUser.role === 'admin' && (
								<ListItem disablePadding style={{ cursor: 'pointer' }}>
									<ListItemIcon>
										<SupervisorAccountIcon />
									</ListItemIcon>
									<ListItemText primary='Add a Moderator' />
								</ListItem>
							)}
							<ListItem
								disabled={
									selectedUser.role === 'admin' ||
									selectedUser.role === 'moderator'
										? false
										: true
								}
								style={{ cursor: 'pointer' }}
								disablePadding
								component={Link}
								to='/raid-creation'
								onClick={() => {
									dispatch({ type: 'CURRENT_ID', payload: null });
									setOpenMenu(false);
								}}>
								<ListItemIcon>
									<AddToPhotosIcon />
								</ListItemIcon>
								<ListItemText primary='Create a Raid' />
							</ListItem>
							<ListItem
								disablePadding
								component={Link}
								to='/roster-creation'
								style={{ cursor: 'pointer' }}
								onClick={() => {
									setOpenMenu(false);
								}}
								disabled={
									selectedUser.role === 'admin' ||
									selectedUser.role === 'moderator'
										? false
										: true
								}>
								<ListItemIcon>
									<ExtensionIcon />
								</ListItemIcon>
								<ListItemText primary='Create a Roster' />
							</ListItem>
							<ListItem
								disablePadding
								component={Link}
								to='/assignments'
								onClick={() => {
									setOpenMenu(false);
								}}
								style={{ cursor: 'pointer' }}
								disabled={
									selectedUser.role === 'admin' ||
									selectedUser.role === 'moderator'
										? false
										: true
								}>
								<ListItemIcon>
									<AssignmentIndIcon />
								</ListItemIcon>
								<ListItemText primary='Create an Assignment' />
							</ListItem>
						</List>
						<Divider />
						<List>
							<ListItem
								disablePadding
								component={Link}
								to='/view-rosters'
								onClick={() => {
									setOpenMenu(false);
								}}
								style={{ cursor: 'pointer' }}>
								<ListItemIcon>
									<FaceIcon />
								</ListItemIcon>
								<ListItemText primary='View Rosters' />
							</ListItem>
						</List>
						<Divider />
						<List>
							<ListItem
								disablePadding
								style={{ cursor: 'pointer' }}
								onClick={() => {
									setOpenMenu(false);
								}}>
								<ListItemIcon>
									<ExitToAppIcon />
								</ListItemIcon>
								<ListItemText primary='Close Menu' />
							</ListItem>
							<a
								href='https://github.com/jamieTardi/wow-rosters'
								target='_blank'
								style={{ cursor: 'pointer', textDecoration: 'none' }}>
								<ListItem disablePadding>
									<ListItemIcon>
										<GitHubIcon />
									</ListItemIcon>
									<ListItemText primary='Contribute on Github' />
								</ListItem>
							</a>
							<a
								href='https://github.com/jamieTardi/wow-rosters/issues'
								target='_blank'
								style={{ cursor: 'pointer', textDecoration: 'none' }}>
								<ListItem disablePadding>
									<ListItemIcon>
										<BugReportIcon />
									</ListItemIcon>
									<ListItemText primary='Bugs and Issues' />
								</ListItem>
							</a>
						</List>
					</Paper>
				</Drawer>
			</div>
		</>
	);
};

export default Nav;
