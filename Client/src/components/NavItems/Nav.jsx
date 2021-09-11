import React, { useState, useEffect } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { CreateRaid } from './index';
import plus from '../../images/plus.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button } from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { useStyles } from '../Form/styles';
import DarkModeBTN from '../UIcomponents/DarkModeBTN';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { LOGOUT } from '../../constants/actionTypes';

const Nav = () => {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

	const handleLogout = () => {
		dispatch({ type: LOGOUT });
		history.push('/');
		setUser(null);
	};

	useEffect(() => {
		const token = user?.token;

		setUser(JSON.parse(localStorage.getItem('profile')));
	}, [location]);
	return (
		<div className='my-4 d-flex justify-content-between align-items-center my-4'>
			<Button
				variant='contained'
				color='primary'
				size='large'
				className={classes.button}
				startIcon={<AddToPhotosIcon />}
				onClick={() => {
					dispatch({ type: 'SHOW_RAID_MODAL' });
					dispatch({ type: 'CURRENT_ID', payload: null });
				}}>
				Create a new Raid
			</Button>
			<Typography component={Link}>Sign in </Typography>

			{user ? (
				<div className={classes.profile}>
					<Avatar
						className={classes.purple}
						alt={user.result.name}
						src={user.result.imageUrl}>
						{user.result.name.charAt(0)}
					</Avatar>
					<Typography className={classes.className} variant='h6'>
						{user.result.name}
					</Typography>
					<Button
						variant='contained'
						className={classes.logout}
						startIcon={<ExitToAppIcon />}
						color='secondary'
						onClick={handleLogout}>
						Logout
					</Button>
				</div>
			) : (
				<div>
					<Button component={Link} to='/auth'>
						Sign in
					</Button>{' '}
				</div>
			)}

			<DarkModeBTN />
		</div>
	);
};

export default Nav;
