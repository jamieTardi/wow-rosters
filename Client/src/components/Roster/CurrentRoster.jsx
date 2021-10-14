import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import EditPageTwo from '../EditPages/EditPageTwo';
import NoRoster from './NoRoster';
import { updateRaid } from '../../actions/raids';
import LoadingSpinner from '../UIcomponents/LoadingSpinner';
import { useHistory } from 'react-router';

const CurrentRoster = () => {
	const history = useHistory();
	const [serverResponse, setServerResponse] = useState(null);
	const [hideModal, setHideModal] = useState(true);
	const [raid, setRaid] = useState(useSelector((state) => state.currentRaid));
	const currentRoster = useSelector((state) => state.currentRoster);
	const user = useSelector((state) => state.currentUser);
	const isDark = useSelector((state) => state.darkMode);
	const roster = raid ? raid.roster.roster : currentRoster.roster;
	const [thisRaid, setThisRaid] = useState(raid);
	const dispatch = useDispatch();

	const handleRemoveRoster = () => {
		dispatch(
			updateRaid(
				raid._id,
				{ ...raid, roster: new Array(), group: [] },
				setServerResponse,
			),
		);
		history.go(0);
	};

	useEffect(() => {
		if (serverResponse !== null) {
			setThisRaid(serverResponse.data);
			setRaid(serverResponse.data);
			setServerResponse(null);
		}
	}, [serverResponse]);

	return (
		<div>
			{raid || currentRoster ? (
				roster ? (
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
						{(user.role === 'admin' || user.role === 'moderator') && (
							<Button
								variant='contained'
								color='secondary'
								disabled={serverResponse}
								onClick={handleRemoveRoster}>
								Remove roster
							</Button>
						)}
					</div>
				) : (
					<NoRoster
						serverResponse={serverResponse}
						setServerResponse={setServerResponse}
						setThisRaid={setThisRaid}
					/>
				)
			) : (
				<LoadingSpinner />
			)}
			{!hideModal && (
				<EditPageTwo setHideModal={setHideModal} hideModal={hideModal} />
			)}
		</div>
	);
};

export default CurrentRoster;
