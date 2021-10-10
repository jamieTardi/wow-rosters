import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Paper,
	Typography,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	FormGroup,
	Checkbox,
	FormControlLabel,
} from '@material-ui/core';
import { useStyles } from '../Form/styles';
import GroupTable from './GroupTable';
import PopulatedGroup from './PopulatedGroup';

const CurrentGroup = () => {
	const classes = useStyles();
	const raid = useSelector((state) => state.currentRaid);
	const [groupTable, setGroupTable] = useState(null);
	const raiders = raid.roster.roster;
	const groupNumber = [1, 2, 3, 4, 5, 6, 7, 8];

	const handleNumberOfColumns = (num) => {
		setGroupTable(num);
	};

	return (
		<div>
			<Paper className='px-3 py-3'>
				<Typography variant='h5' className='mb-3 pt-2'>
					The final group make up for the raid.
				</Typography>
				{!groupTable && (
					<>
						<Typography>
							Please select the number of tables of 5 required
						</Typography>
						<FormControl className='w-100'>
							<FormGroup className='d-flex flex-row'>
								{groupNumber.map((group) => (
									<FormControlLabel
										style={{ width: 'fit-content' }}
										control={
											<Checkbox
												value={group}
												onClick={() => handleNumberOfColumns(group)}
											/>
										}
										label={group === 1 ? `${group} Column` : `${group} Columns`}
									/>
								))}
							</FormGroup>
						</FormControl>
					</>
				)}
				{raid.group.length !== 0 && (
					<div>
						<h5>The current set group is below.</h5>
						<p>
							This group is read only and is only here for reference purposes.
						</p>
						<PopulatedGroup />
					</div>
				)}
			</Paper>

			{groupTable && <GroupTable groupTable={groupTable} />}
		</div>
	);
};

export default CurrentGroup;
