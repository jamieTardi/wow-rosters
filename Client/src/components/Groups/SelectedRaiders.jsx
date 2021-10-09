import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useSelector, useDispatch } from 'react-redux';
import { updateRaid } from '../../actions/raids';

const SelectedRaiders = ({
	numberOfColumns,
	selectedGroups,
	setSelectedGroups,
}) => {
	const dispatch = useDispatch();
	const currentRaid = useSelector((state) => state.currentRaid);
	const [amendedRaid, setAmendedRaid] = useState(currentRaid);
	const handleRemoveRaider = (raider, group) => {
		let items = selectedGroups.map((group) => {
			return {
				...group,
				raider: group.raider.filter((item) => {
					return item.name !== raider.name;
				}),
			};
		});
		setSelectedGroups(items);
	};

	const handleSubmit = () => {
		dispatch(
			updateRaid(currentRaid._id, { ...currentRaid, group: selectedGroups }),
		);
	};
	return (
		<>
			<div className='row'>
				{selectedGroups.map((group, i) => (
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
										<td className='d-flex justify-content-between'>
											<span>{raider.name}</span>
											<span>
												<DeleteForeverIcon
													style={{ cursor: 'pointer' }}
													onClick={() => {
														handleRemoveRaider(raider, group);
													}}
												/>
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				))}
			</div>
			<div className='w-50'>
				<Button
					variant='contained'
					color='primary'
					startIcon={<CloudUploadIcon />}
					onClick={handleSubmit}>
					Assign to Raid
				</Button>
			</div>
		</>
	);
};

export default SelectedRaiders;
