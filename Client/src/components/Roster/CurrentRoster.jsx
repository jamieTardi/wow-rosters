import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const CurrentRoster = () => {
	const raid = useSelector((state) => state.currentRaid);
	const roster = raid.roster;
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
												<td>❤️‍🩹</td>

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
		</div>
	);
};

export default CurrentRoster;
