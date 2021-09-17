import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import EditPageTwo from '../EditPages/EditPageTwo';

const CurrentRoster = () => {
	const [hideModal, setHideModal] = useState(true);
	const raid = useSelector((state) => state.currentRaid);
	const roster = raid.roster.roster;
	return (
		<div>
			<div>
				<h2>Tanks</h2>
				<Table striped bordered hover variant='dark'>
					<thead>
						<tr>
							<th>Role</th>
							<th>Character Name</th>
							<th>Class</th>
							<th>Notes</th>
						</tr>
					</thead>
					<tbody>
						{roster &&
							roster.map((character) => (
								<tr>
									<>
										{character.role === 'Tank' && (
											<>
												<td>🛡️</td>

												<td>{character.name}</td>
												<td>{character.class}</td>
												<td>{character.notes}</td>
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
						</tr>
					</thead>
					<tbody>
						{roster &&
							roster.map((character) => (
								<tr>
									<>
										{character.role === 'DPS' && (
											<>
												<td>⚔️</td>

												<td>{character.name}</td>
												<td>{character.class}</td>
												<td>{character.notes}</td>
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
						</tr>
					</thead>
					<tbody>
						{roster &&
							roster.map((character) => (
								<tr>
									<>
										{character.role === 'Healer' && (
											<>
												<td>❤️</td>

												<td>{character.name}</td>
												<td>{character.class}</td>
												<td>{character.notes}</td>
											</>
										)}
									</>
								</tr>
							))}
					</tbody>
				</Table>
				<Button
					variant='contained'
					onClick={() => {
						setHideModal((prev) => !prev);
					}}
					startIcon={<EditIcon />}
					color='primary'>
					Edit Roster
				</Button>
			</div>
			{!hideModal && (
				<EditPageTwo setHideModal={setHideModal} hideModal={hideModal} />
			)}
		</div>
	);
};

export default CurrentRoster;
