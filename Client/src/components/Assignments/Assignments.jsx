import React, { useMemo } from 'react';
import { Table } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

const Assignments = ({ tactics }) => {
	const darkMode = useSelector((state) => state.darkMode);
	return (
		<div>
			<Table striped bordered hover variant={darkMode ? 'dark' : ''}>
				<thead>
					<tr>
						<th>Role</th>
						<th>Name</th>
						<th>Target</th>
						<th>Details</th>
					</tr>
				</thead>
				<tbody>
					{tactics &&
						tactics.assignedRaiders.map((assignee) => (
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
	);
};

export default Assignments;
