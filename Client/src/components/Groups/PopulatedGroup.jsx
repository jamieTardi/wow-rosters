import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { updateRaid } from '../../actions/raids';

const PopulatedGroup = () => {
	const dispatch = useDispatch();
	const currentRaid = useSelector((state) => state.currentRaid);
	const user = useSelector((state) => state.currentUser);
	const groups = currentRaid.group;
	const [currentGroup, setcurrentGroup] = useState(groups);

	const handleDelete = () => {
		setcurrentGroup(new Array());
		dispatch(
			updateRaid(currentRaid._id, { ...currentRaid, group: new Array() }),
		);
	};

	return (
		<>
			{currentGroup.length !== 0 ? (
				<div className='row'>
					{currentGroup.map((group, i) => (
						<div className='col-4 col-lg-3 col-xxl-2'>
							<Table striped bordered hover variant='dark'>
								<thead>
									<tr>
										<th>Group {++i}</th>
									</tr>
								</thead>
								<tbody>
									{group.raider.map((raider) => (
										<tr>
											<td>
												<span>{raider.name}</span>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					))}

					{(user.role === 'admin' || user.role === 'moderator') && (
						<div>
							<Button
								variant='contained'
								color='secondary'
								onClick={handleDelete}>
								Delete Group
							</Button>
						</div>
					)}
				</div>
			) : (
				<p>There is currently no group assigned</p>
			)}
		</>
	);
};

export default PopulatedGroup;
