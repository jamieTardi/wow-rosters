import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateRaid } from '../../actions/raids';

const Roster = ({
	selectedRaid,
	setRaidForm,
	raidForm,
	assignedRoster,
	setAssignedRoster,
}) => {
	const [rosterAssigned, setRosterAssigned] = useState(true);
	const dispatch = useDispatch();
	const addRoster = useSelector((state) => state.roster);

	const currentId = useSelector((state) => state.currentId);

	const handleRemoveRaider = (id) => {
		dispatch({ type: 'REMOVE_RAIDER', payload: id });
		let filitered = assignedRoster.filter((raider) => {
			return raider.id !== id;
		});
		setAssignedRoster(filitered);
	};

	const handleClearRoster = () => {
		dispatch({ type: 'CLEAR_ROSTER' });
	};

	const handleUpdateRaid = () => {
		setRaidForm({ ...raidForm, roster: assignedRoster });
	};

	useEffect(() => {
		if (assignedRoster.length !== 0) {
			setRosterAssigned(false);
		} else {
			setRosterAssigned(true);
		}
	}, [assignedRoster]);
	return (
		<div className='mb-5'>
			<h2>Tanks</h2>
			<Table striped bordered hover variant='dark'>
				<thead>
					<tr>
						<th>Role</th>
						<th>Character Name</th>
						<th>Class</th>
						<th>Notes</th>
						<th>Remove Character</th>
					</tr>
				</thead>
				<tbody>
					{assignedRoster.map((character) => (
						<tr>
							<>
								{character.role === 'Tank' && (
									<>
										<td>🛡️</td>

										<td>{character.name}</td>
										<td>{character.class}</td>
										<td>{character.notes}</td>
										<td>
											<Button
												variant='danger'
												onClick={() => {
													handleRemoveRaider(character.id);
												}}>
												Remove
											</Button>
										</td>
									</>
								)}
							</>
						</tr>
					))}
				</tbody>
			</Table>

			<h2>DPS</h2>
			<Table striped bordered hover variant='dark'>
				<thead>
					<tr>
						<th>Role</th>
						<th>Character Name</th>
						<th>Class</th>
						<th>Notes</th>
						<th>Remove Character</th>
					</tr>
				</thead>
				<tbody>
					{assignedRoster.map((character) => (
						<tr>
							<>
								{character.role === 'DPS' && (
									<>
										<td>⚔️</td>

										<td>{character.name}</td>
										<td>{character.class}</td>
										<td>{character.notes}</td>
										<td>
											<Button
												variant='danger'
												onClick={() => {
													handleRemoveRaider(character.id);
												}}>
												Remove
											</Button>
										</td>
									</>
								)}
							</>
						</tr>
					))}
				</tbody>
			</Table>

			<h2>Healers</h2>
			<Table striped bordered hover variant='dark'>
				<thead>
					<tr>
						<th>Role</th>
						<th>Character Name</th>
						<th>Class</th>
						<th>Notes</th>
						<th>Remove Character</th>
					</tr>
				</thead>
				<tbody>
					{assignedRoster.map((character) => (
						<tr>
							<>
								{character.role === 'Healer' && (
									<>
										<td>❤️‍🩹</td>

										<td>{character.name}</td>
										<td>{character.class}</td>
										<td>{character.notes}</td>
										<td>
											<Button
												variant='danger'
												onClick={() => {
													handleRemoveRaider(character.id);
												}}>
												Remove
											</Button>
										</td>
									</>
								)}
							</>
						</tr>
					))}
				</tbody>
			</Table>
			<Button onClick={handleClearRoster}>Clear Roster</Button>
			<Button
				disabled={rosterAssigned}
				className='ms-3 '
				variant='secondary'
				onClick={handleUpdateRaid}>
				Add this roster to the raid
			</Button>
		</div>
	);
};

export default Roster;
