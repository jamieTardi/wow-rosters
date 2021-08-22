import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import RaidForm from '../Form/RaidForm';

const CreateRaid = ({ setRaidModalShow, raidModalShow }) => {
	const handleShowRaidModel = () => setRaidModalShow(true);
	return (
		<div>
			<Button
				variant='primary'
				className='d-flex justify-content-between align-items-center w-100 py-3 mb-2'
				onClick={handleShowRaidModel}>
				<ion-icon name='add-circle'></ion-icon>
				<h6 className='ms-2'>Create a new Raid</h6>
			</Button>
			<Button
				variant='primary'
				className='d-flex justify-content-between align-items-center w-100 py-3'>
				<ion-icon name='add-circle'></ion-icon>
				<h6 className='ms-2'>Create a new Roster</h6>
			</Button>
			<RaidForm
				raidModalShow={raidModalShow}
				setRaidModalShow={setRaidModalShow}
			/>
		</div>
	);
};

export default CreateRaid;
