import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateRaid } from '../../actions/raids';
import SaveIcon from '@material-ui/icons/Save';
import { Button } from '@material-ui/core';
import { useStyles } from '../Form/styles';

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
	const [isLoading, setIsLoading] = useState(false);
	const currentId = useSelector((state) => state.currentId);
	const classes = useStyles();
	const [completedTxt, setCompletedTxt] = useState(false);

	const handleRemoveRaider = (id) => {
		dispatch({ type: 'REMOVE_RAIDER', payload: id });
		let filitered = assignedRoster.filter((raider) => {
			return raider.id !== id;
		});
		setAssignedRoster(filitered);
	};

	const handleClearRoster = () => {
		dispatch({ type: 'CLEAR_ROSTER' });
		setAssignedRoster([]);
	};

	const handleUpdateRaid = () => {
		setIsLoading(true);
		setCompletedTxt(true);
		setRaidForm({ ...raidForm, roster: assignedRoster });
		setTimeout(() => {
			setIsLoading(false);
			setCompletedTxt(false);
		}, 1300);
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
												variant='contained'
												color='secondary'
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
												variant='contained'
												color='secondary'
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
												variant='contained'
												color='secondary'
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
			<div className='d-flex justify-content-between align-items-center'>
				<Button
					variant='contained'
					color='secondary'
					size='small'
					onClick={handleClearRoster}>
					Clear Roster
				</Button>

				{!isLoading ? (
					<Button
						variant='contained'
						color='primary'
						size='small'
						className={classes.button}
						onClick={handleUpdateRaid}
						startIcon={<SaveIcon />}>
						Add this roster to the raid
					</Button>
				) : (
					<Button
						variant='contained'
						color='primary'
						size='small'
						className={classes.button}
						disabled>
						Adding Roster...
					</Button>
				)}
			</div>
			{completedTxt && (
				<p style={{ textAlign: 'center', marginTop: '3%' }}>
					Roster has been added 🎉
				</p>
			)}
		</div>
	);
};

export default Roster;
