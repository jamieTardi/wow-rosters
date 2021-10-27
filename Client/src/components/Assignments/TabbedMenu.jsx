import React, { useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import { useSelector, useDispatch } from 'react-redux';
import CurrentAssignments from '../Raids/CurrentAssignments';
import {
	CURRENT_ASSIGNMENT,
	GUILD_ASSIGNMENT,
} from '../../constants/actionTypes';
import TabContext from '@mui/lab/TabContext';

const TabbedMenu = () => {
	const dispatch = useDispatch();

	const [key, setKey] = useState('');
	const [raid, setRaid] = useState(useSelector((state) => state.currentRaid));
	const [assignments, setAssignments] = useState(raid.tactics);
	const guildAssignments = useSelector((state) => state.guildAssignments);
	const currentUser = useSelector((state) => state.currentUser);
	const allAssignments = useSelector((state) => state.assignments);
	const currentAssign = useSelector((state) => state.currentAssign);
	const [serverRes, setServerRes] = useState(null);
	const [value, setValue] = useState(0);

	const handleAddAssign = (assignment, i) => {
		handleChange(i);
		dispatch({ type: CURRENT_ASSIGNMENT, payload: assignment });
		setKey(assignment.title);
	};

	const handleChange = (newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		setAssignments(raid.tactics);
	}, [raid.tactics.length]);

	useEffect(() => {
		if (currentUser && allAssignments) {
			let filitered = allAssignments.filter((assign) => {
				return currentUser.guild === assign.guild;
			});
			dispatch({ type: GUILD_ASSIGNMENT, payload: filitered });
		}
	}, [assignments]);

	return (
		<div>
			<Box sx={{ width: '100%', typography: 'body1' }}>
				<TabContext value={value}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<TabList
							onChange={handleChange}
							value={value}
							onChange={handleChange}
							variant='scrollable'
							scrollButtons='auto'
							aria-label='scrollable auto tabs example'>
							{assignments.map((assignment, i) => (
								<div key={i}>
									<Tab
										eventkey={assignment.title}
										label={assignment.title}
										value={i}
										onClick={() => {
											handleAddAssign(assignment, i);
										}}
									/>
								</div>
							))}
						</TabList>
					</Box>
					{assignments.map((assignment, i) => (
						<TabPanel value={i} key={i}>
							<CurrentAssignments
								assignment={assignment}
								setRaid={setRaid}
								serverRes={serverRes}
								setServerRes={setServerRes}
							/>
						</TabPanel>
					))}
				</TabContext>
			</Box>
		</div>
	);
};

export default TabbedMenu;
