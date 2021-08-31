import React, { useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { CreateRaid } from './index';
import plus from '../../images/plus.svg';
import { useDispatch } from 'react-redux';

const Nav = () => {
	const dispatch = useDispatch();
	return (
		<div className='my-4 d-flex justify-content-between align-items-center'>
			<Button
				className='py-2 px-3'
				onClick={() => {
					dispatch({ type: 'SHOW_RAID_MODAL' });
					dispatch({ type: 'CURRENT_ID', payload: null });
				}}>
				<img src={plus} alt='plus' className='me-3' />
				Create new raid
			</Button>
			<div>
				<InputGroup className=' w-100'>
					<FormControl
						placeholder='Search Raids'
						aria-label="Recipient's username"
						aria-describedby='basic-addon2'
					/>
					<Button variant='outline-secondary' id='button-addon2'>
						<ion-icon
							name='search-outline'
							style={{ fontSize: '1.1rem' }}></ion-icon>
					</Button>
				</InputGroup>
			</div>
		</div>
	);
};

export default Nav;
