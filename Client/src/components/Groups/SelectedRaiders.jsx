import React from 'react';
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
					{console.log(group)}
					<Table striped bordered hover variant='dark'>
						<thead>
							<tr>
								<th>Group Number {++i}</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
							</tr>
							<tr>
								<td>2</td>
							</tr>
							<tr>
								<td>3</td>
							</tr>
						</tbody>
					</Table>
				</div>
			))}
		</div>
	);
};

export default SelectedRaiders;
