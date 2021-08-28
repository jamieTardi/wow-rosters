import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateRaid } from '../../actions/raids';

const Roster = ({ selectedRaid }) => {
	const dispatch = useDispatch();
	const addRoster = useSelector((state) => state.roster);
	const [completeRoster, setCompleteRoster] = useState(null);
	const raids = useSelector((state) => state.raids);
	const currentId = useSelector((state) => state.currentId);
	let currentRaid = raids.filter((raid) => raid._id === currentId);
	const [updateCurrentRaid, setUpdateCurrentRaid] = useState({
		_id: currentRaid[0]._id,
		title: currentRaid[0].title,
		message: currentRaid[0].message,
		creator: currentRaid[0].creator,
		raiders: currentRaid[0].raiders,
		selectedFile: currentRaid[0].selectedFile,
		time: currentRaid[0].time,
		date: currentRaid[0].date,
		roster: currentRaid[0].roster,
	});
	console.log(currentRaid);
	const handleRemoveRaider = (id) => {
		dispatch({ type: 'REMOVE_RAIDER', payload: id });
	};

	const handleClearRoster = () => {
		dispatch({ type: 'CLEAR_ROSTER' });
	};

	const handleUpdateRaid = () => {
		setUpdateCurrentRaid({
			...updateCurrentRaid,
			roster: addRoster,
		});
		dispatch(updateRaid(updateCurrentRaid._id, updateCurrentRaid));
	};

	useEffect(() => {
		dispatch({ type: 'CURRENT_ID', payload: selectedRaid._id });
	}, []);
	console.log(updateCurrentRaid);
	console.log(currentId);
	return (
		<div>
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
					{addRoster.map((character) => (
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
					{addRoster.map((character) => (
						<tr>
							<>
								{character.role === 'DPS' && (
									<>
										<td>⚔️</td>

										<td>{character.name}</td>
										<td>{character.class}</td>
										<td>{character.notes}</td>
										<td>
											<Button variant='danger'>Remove</Button>
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
					{addRoster.map((character) => (
						<tr>
							<>
								{character.role === 'Healer' && (
									<>
										<td>❤️‍🩹</td>

										<td>{character.name}</td>
										<td>{character.class}</td>
										<td>{character.notes}</td>
										<td>
											<Button variant='danger'>Remove</Button>
										</td>
									</>
								)}
							</>
						</tr>
					))}
				</tbody>
			</Table>
			<Button onClick={handleClearRoster}>Clear Roster</Button>
			<Button className='ms-3' variant='secondary' onClick={handleUpdateRaid}>
				Add this roster to the raid
			</Button>
		</div>
	);
};

export default Roster;
