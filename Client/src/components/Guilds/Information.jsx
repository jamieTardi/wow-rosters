import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import SmallModal from '../UIcomponents/SmallModal';

const Information = ({ tabInfo, setTabInfo }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const currentUser = useSelector((state) => state.currentUser);

	const handleEmailEdit = () => {
		setTabInfo({ modelName: 'Change Email', member: currentUser });
		handleOpen();
	};

	const handleNameEdit = () => {
		setTabInfo({ modelName: 'Add Member', member: currentUser });
		handleOpen();
	};

	return (
		<>
			<div className='grid-wrapper'>
				<div className='name d-flex justify-content-between'>
					<span>Character name: {currentUser.character}</span>{' '}
					<EditIcon onClick={handleNameEdit} style={{ cursor: 'pointer' }} />
				</div>

				<div className='guild d-flex justify-content-between'>
					Guild member of: {currentUser.guild}
				</div>

				<div className='leave d-flex justify-content-between'>
					<span>Leave the Guild</span>{' '}
					<EditIcon onClick={handleEmailEdit} style={{ cursor: 'pointer' }} />{' '}
				</div>

				<div className='change-email d-flex justify-content-between '>
					<span>Email address: {currentUser.email} </span>
					<EditIcon onClick={handleEmailEdit} style={{ cursor: 'pointer' }} />
				</div>
			</div>
			<SmallModal
				tabInfo={tabInfo}
				setOpen={setOpen}
				open={open}
				setTabInfo={setTabInfo}
			/>
		</>
	);
};

export default Information;
