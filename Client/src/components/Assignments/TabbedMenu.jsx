import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import CurrentAssignments from '../Raids/CurrentAssignments';
import { CURRENT_ASSIGNMENT } from '../../constants/actionTypes';

const TabbedMenu = () => {
	const dispatch = useDispatch();
	const [key, setKey] = useState('');
	const raid = useSelector((state) => state.currentRaid);
	const assignments = raid.tactics;

	const handleAddAssign = (assignment) => {
		dispatch({ type: CURRENT_ASSIGNMENT, payload: assignment });
		setKey(assignment.title);
	};
	return (
		<div>
			<Tabs
				variant='pills'
				activeKey={key}
				transition={false}
				onSelect={(k) => setKey(k)}
				id='noanim-tab-example'
				className='mb-3'>
				{assignments.map((assignment) => (
					<Tab
						eventKey={assignment.title}
						title={assignment.title}
						onClick={() => {
							handleAddAssign(assignment);
						}}>
						<CurrentAssignments assignment={assignment} />
					</Tab>
				))}
			</Tabs>
		</div>
	);
};

export default TabbedMenu;
