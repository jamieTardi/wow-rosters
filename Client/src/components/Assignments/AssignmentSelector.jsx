import React from 'react';
import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import { useStyles } from '../Form/styles';
import { useSelector, useDispatch } from 'react-redux';
import { updateRaid } from '../../actions/raids';

const AssignmentSelector = ({ serverRes, setServerRes }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const assignments = useSelector((state) => state.assignments);
	const raid = useSelector((state) => state.currentRaid);

	const handleAddAssign = (assignment) => {
		dispatch(
			updateRaid(raid._id, { ...raid, tactics: [...raid.tactics, assignment] }),
		);
	};

	return (
		<FormControl className='w-100'>
			<InputLabel id='character-select-label' className={classes.select}>
				Select a Assignment to add
			</InputLabel>
			<Select label='Select a Character' className='w-50'>
				{assignments.map((assignment) => (
					<MenuItem
						value={assignment}
						className='text-white'
						onClick={() => {
							handleAddAssign(assignment);
						}}>
						{assignment.title}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default AssignmentSelector;
