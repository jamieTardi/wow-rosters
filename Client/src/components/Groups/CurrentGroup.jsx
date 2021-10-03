import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Paper,
	Typography,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core';
import { useStyles } from '../Form/styles';

const CurrentGroup = () => {
	const classes = useStyles();
	const raid = useSelector((state) => state.currentRaid);
	const [groupTable, setGroupTable] = useState(null);
	const raiders = raid.roster.roster;
	const groupNumber = [1, 2, 3, 4, 5, 6, 7, 8];

	return (
		<div>
			<Paper>
				{!groupTable && (
					<>
						<Typography>
							Please select the number of tables of 5 required
						</Typography>
						<FormControl className='w-50'>
							<InputLabel
								id='demo-simple-select-label'
								className={classes.select}>
								Number of groups
							</InputLabel>
							<Select>
								{groupNumber.map((group) => (
									<MenuItem value={group}>{group}</MenuItem>
								))}
							</Select>
						</FormControl>
					</>
				)}
				{groupTable && (
					<FormControl className='w-100'>
						<InputLabel
							id='demo-simple-select-label'
							className={classes.select}>
							Select a Raider
						</InputLabel>
						<Select>
							{raiders.map((raider) => (
								<>
									<MenuItem value={raider.name}>{raider.name}</MenuItem>
								</>
							))}
						</Select>
					</FormControl>
				)}
			</Paper>
		</div>
	);
};

export default CurrentGroup;
