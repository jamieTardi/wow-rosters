import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import { useStyles } from '../Form/styles';
import { useSelector, useDispatch } from 'react-redux';
import { updateRaid } from '../../actions/raids';
import { useHistory } from 'react-router-dom';

const AssignmentSelector = ({ serverRes, setServerRes }) => {
	const history = useHistory();
	const classes = useStyles();
	const dispatch = useDispatch();
	const assignments = useSelector((state) => state.assignments);
	const raid = useSelector((state) => state.currentRaid);
	const currentUser = useSelector((state) => state.currentUser);
	const [guildAssigns, setGuildAssigns] = useState(null);

	const handleAddAssign = (assignment) => {
		dispatch(
			updateRaid(raid._id, { ...raid, tactics: [...raid.tactics, assignment] }),
		);
		history.go(0);
	};

	useEffect(() => {
		if (currentUser && assignments) {
			let filitered = assignments.filter((assign) => {
				return currentUser.guild === assign.guild;
			});
			setGuildAssigns(filitered);
		}
	}, [assignments]);

	return (
		<FormControl className='w-100'>
			<InputLabel id='character-select-label' className={classes.select}>
				Select a Assignment to add
			</InputLabel>
			<Select label='Select a Character' className='w-50'>
				{guildAssigns &&
					guildAssigns.map((assignment) => (
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
