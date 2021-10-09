import React, { useState } from 'react';
import { Image, Table, Modal } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import EditAssignments from '../EditPages/EditAssignments';

const CurrentAssignments = ({ assignment }) => {
	const raid = useSelector((state) => state.currentRaid);
	const user = useSelector((state) => state.currentUser);
	const isDark = useSelector((state) => state.darkMode);
	const [show, setShow] = useState(false);

	const handleEditAssignment = () => {
		setShow((Prev) => !Prev);
	};

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
				<>
					<Button
						variant='contained'
						color='default'
						onClick={handleEditAssignment}
						startIcon={<EditIcon />}>
						Edit Assignment
					</Button>
					<EditAssignments
						assignment={assignment}
						show={show}
						setShow={setShow}
					/>
				</>
			)}
		</div>
	);
};

export default CurrentAssignments;
