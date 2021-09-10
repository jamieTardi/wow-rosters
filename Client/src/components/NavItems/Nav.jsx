import React, { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { CreateRaid } from './index';
import plus from '../../images/plus.svg';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { useStyles } from '../Form/styles';
import DarkModeBTN from '../UIcomponents/DarkModeBTN';
import { Link } from 'react-router-dom';

const Nav = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
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
			<Button
				variant='contained'
				color='primary'
				size='large'
				className={classes.button}
				startIcon={<AddToPhotosIcon />}>
				Sign In
			</Button>

			<DarkModeBTN />
		</div>
	);
};

export default Nav;
