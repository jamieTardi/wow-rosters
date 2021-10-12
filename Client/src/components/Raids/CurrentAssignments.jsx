import React, { useState, useEffect } from 'react';
import { Image, Table, Modal } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { DeleteForever, AddCircle } from '@material-ui/icons';
import EditAssignments from '../EditPages/EditAssignments';
import { CURRENT_ASSIGNMENT } from '../../constants/actionTypes';
import { updateRaid } from '../../actions/raids';
import { useHistory } from 'react-router-dom';
import AssignmentSelector from '../Assignments/AssignmentSelector';

const CurrentAssignments = ({ assignment, setRaid }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const raid = useSelector((state) => state.currentRaid);
	const user = useSelector((state) => state.currentUser);
	const isDark = useSelector((state) => state.darkMode);
	const [serverRes, setServerRes] = useState(null);

	const handleDeleteAssignment = () => {
		let filitered = raid.tactics.filter((assign) => {
			return assign._id !== assignment._id;
		});
		dispatch(
			updateRaid(raid._id, { ...raid, tactics: filitered }, setServerRes),
		);
		setRaid({ ...raid, tactics: filitered });
		if (serverRes !== null) {
			setTimeout(() => {
				history.go(0);
			}, 1500);
		}
	};

	useEffect(() => {
		dispatch({ type: CURRENT_ASSIGNMENT, payload: assignment });
	}, [assignment]);

	return (
		<div>
			<h2>{assignment.title}</h2>

			<div key={assignment.id}>
				<Image src={assignment.image} fluid className='mb-3' />
				<h3>Assigment Table </h3>
				<Table
					striped
					bordered
					hover
					variant={isDark && 'dark'}
					className='mt-4'>
					<thead>
						<tr>
							<th>Role</th>
							<th>Name</th>
							<th>Target</th>
							<th>Details</th>
						</tr>
					</thead>
					<tbody>
						{assignment.assignedRaiders.map((assignee) => (
							<tr key={uuidv4()}>
								<td>{assignee.role}</td>
								<td>{assignee.name}</td>
								<td>{assignee.target}</td>
								<td>{assignee.notes}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
			{(user.role === 'admin' || user.role === 'moderator') && (
				<div className='d-flex justify-content-start align-items-center'>
					<Button
						variant='contained'
						color='secondary'
						className='me-4'
						onClick={handleDeleteAssignment}
						startIcon={<DeleteForever />}>
						Delete Assignment
					</Button>
				</div>
			)}
			{serverRes !== null && (
				<p>This assignment is being deleted from the current raid...</p>
			)}
		</div>
	);
};

export default CurrentAssignments;
