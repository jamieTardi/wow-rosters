import React from 'react';
import { Table } from 'react-bootstrap';

const Assignments = () => {
	return (
		<div>
			<Table striped bordered hover variant='dark'>
				<thead>
					<tr>
						<th>Role</th>
						<th>Character Name</th>
						<th>Assignment</th>
						<th>Symbol</th>
						<th>Notes</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>🛡️</td>
						<td>Gojiberry</td>
						<td>Gruul</td>
						<td>💀</td>
						<td>Main tank for the fight, dealing with only gruul</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
};

export default Assignments;
