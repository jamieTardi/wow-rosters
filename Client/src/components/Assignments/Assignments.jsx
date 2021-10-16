import React, { useMemo } from 'react';
import { Table } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { DeleteForever } from '@material-ui/icons';

const Assignments = ({ tactics, setNewTactics }) => {
	const darkMode = useSelector((state) => state.darkMode);

	const handleRemove = (assignee) => {
		let filitered = tactics.assignedRaiders.filter((raider) => {
			return raider.id !== assignee.id;
		});
		setNewTactics({ ...tactics, assignedRaiders: filitered });
	};

	return (
		<div>
			<Table striped bordered hover variant={darkMode ? 'dark' : ''}>
				<thead>
					<tr>
						<th>Role</th>
						<th>Name</th>
						<th>Target</th>
						<th>Details</th>
						<th>Remove</th>
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
								<td
									className='d-flex justify-content-center'
									onClick={() => {
										handleRemove(assignee);
									}}
									style={{ cursor: 'pointer' }}>
									<DeleteForever />
								</td>
							</tr>
						))}
				</tbody>
			</Table>
		</div>
	);
};

export default Assignments;
