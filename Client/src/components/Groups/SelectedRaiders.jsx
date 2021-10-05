import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';

const SelectedRaiders = ({
	numberOfColumns,
	selectedGroups,
	setSelectedGroups,
}) => {
	return (
		<div className='row'>
			{selectedGroups.map((group, i) => (
				<div className='col-2'>
					<Table striped bordered hover variant='dark'>
						<thead>
							<tr>
								<th>Group Number {++i}</th>
							</tr>
						</thead>
						<tbody>
							{group.raider.map((raider) => (
								<tr>
									<td>{raider.name}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			))}
		</div>
	);
};

export default SelectedRaiders;
