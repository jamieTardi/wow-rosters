import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import EditPageTwo from '../EditPages/EditPageTwo';
import { useHistory } from 'react-router-dom';

const CurrentRoster = () => {
	const history = useHistory();
	const [hideModal, setHideModal] = useState(true);
	const raid = useSelector((state) => state.currentRaid);
	const currentRoster = useSelector((state) => state.currentRoster);
	const isDark = useSelector((state) => state.darkMode);
	const roster = raid ? raid.roster.roster : currentRoster.roster;
	return (
		<div>
			<div>
				<h2>Tanks</h2>
				<Table striped bordered hover variant={isDark ? 'dark' : ''}>
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
				<Table striped bordered hover variant={isDark ? 'dark' : ''}>
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
				<Table striped bordered hover variant={isDark ? 'dark' : ''}>
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
			</div>
			{!hideModal && (
				<EditPageTwo setHideModal={setHideModal} hideModal={hideModal} />
			)}
		</div>
	);
};

export default CurrentRoster;
