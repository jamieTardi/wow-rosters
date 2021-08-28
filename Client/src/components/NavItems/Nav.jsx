import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { CreateRaid } from './index';
import plus from '../../images/plus.svg';
import { useDispatch } from 'react-redux';

const Nav = () => {
	const dispatch = useDispatch();
	return (
		<div className='my-4'>
			<Button
				className='py-2 px-3'
				onClick={() => {
					dispatch({ type: 'SHOW_RAID_MODAL' });
					dispatch({ type: 'CURRENT_ID', payload: null });
				}}>
				<img src={plus} alt='plus' className='me-3' />
				Create new raid
			</Button>
		</div>
	);
};

export default Nav;
