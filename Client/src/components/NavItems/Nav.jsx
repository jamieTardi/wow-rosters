import React, { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { CreateRaid } from './index';
import plus from '../../images/plus.svg';
import { useDispatch } from 'react-redux';
import { Avatar, Button } from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { useStyles } from '../Form/styles';
import DarkModeBTN from '../UIcomponents/DarkModeBTN';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const Nav = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = null;
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
						color='secondary'></Button>
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
