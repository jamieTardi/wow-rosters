import React from 'react';
import { Image, Table } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import TabbedMenu from '../Assignments/TabbedMenu';
import { useSelector } from 'react-redux';

const CurrentAssignments = () => {
	const raid = useSelector((state) => state.currentRaid);
	const assignments = raid.tactics;
	return (
		<div>
			<h2>Assignments for this raid</h2>
			{assignments.map((assignment) => (
				<div key={assignment.id}>
					<Image src={assignment.image} fluid className='mb-3' />
					<h3>Assigment Table </h3>
					<Table striped bordered hover variant='dark' className='mt-4'>
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
			))}
		</div>
	);
};

export default CurrentAssignments;
