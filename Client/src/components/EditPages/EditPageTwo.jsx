import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getRoster } from '../../actions/roster';
import {
	Typography,
	TextField,
	Button,
	Grid,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableContainer,
	InputLabel,
	Select,
	MenuItem,
} from '@material-ui/core';
import { useStyles } from '../Form/styles';
import { useDispatch } from 'react-redux';
import { updateRoster } from '../../actions/roster';
import { useHistory } from 'react-router-dom';

const EditPageTwo = ({ hideModal, show, setShow }) => {
	const raid = useSelector((state) => state.currentRaid);
	const darkMode = useSelector((state) => state.darkMode);
	const currentRoster = useSelector((state) => state.currentRoster);
	const user = useSelector((state) => state.currentUser);
	const dispatch = useDispatch();
	const [newRoster, setNewRoster] = useState(currentRoster);
	const [isLoading, setIsLoading] = useState(false);
	const [currentRaider, setCurrentRaider] = useState(null);
	const classes = useStyles();

	const charClasses = [
		'Warrior',
		'Shaman',
		'Paladin',
		'Rogue',
		'Druid',
		'Priest',
		'Mage',
		'Warlock',
		'Hunter',
	];

	const handleEditCharacter = (id) => {
		newRoster.roster.map((raider) => {
			if (raider.id === id) {
				setCurrentRaider(raider);
			}
		});
	};

	const handleRemove = (id) => {
		let filitered = newRoster.roster.filter((raider) => {
			return raider.id !== id;
		});
		setNewRoster({ ...newRoster, roster: filitered });
	};

	const handleAppendRaider = () => {
		setNewRoster({
			...newRoster,
			roster: [...newRoster.roster, currentRaider],
		});

		const updatedRaiders = newRoster.roster.map((raider) =>
			raider.id === currentRaider.id ? currentRaider : raider,
		);
		setNewRoster({ ...newRoster, roster: updatedRaiders });
	};

	const handleAppendRoster = () => {
		setIsLoading(true);
		const id = raid._id;
		dispatch(updateRoster(newRoster, id, setIsLoading));
		dispatch(getRoster());
		setShow((prev) => !prev);
	};

	const handleAddNewRaider = () => {
		setNewRoster([...raid.roster, currentRaider]);
	};

	useEffect(() => {
		setNewRoster(currentRoster);
	}, [currentRoster]);

	return (
		<div>
			<Modal show={show} size='lg'>
				<Paper className={classes.paperModal}>
					<Grid container spacing={3}>
						{(user.role === 'admin' ||
							user.role === 'moderator' ||
							user.role === 'guildMaster') && (
							<>
								<Grid item xs={12}>
									<Typography variant='h5'>Edit the current roster</Typography>
								</Grid>
								<Grid item xs={12}>
									<TextField
										type='name'
										fullWidth
										value={newRoster ? newRoster.title : ''}
										className={classes.input}
										InputLabelProps={{
											style: { color: '#fff ' },
										}}
										label='Roster title'
										onChange={(e) => {
											setNewRoster({
												...newRoster,
												title: e.target.value,
											});
										}}
									/>
								</Grid>

								<Grid item xs={12}>
									<InputLabel
										id='demo-simple-select-label'
										className={classes.select}
										value={currentRaider ? currentRaider.role : ''}>
										Select a role
									</InputLabel>

									<Select
										className='w-50'
										value={currentRaider ? currentRaider.role : ''}
										onChange={(e) => {
											setCurrentRaider({
												...currentRaider,
												role: e.target.value,
											});
										}}>
										<MenuItem value='Tank' className='text-white'>
											Tank
										</MenuItem>
										<MenuItem value='DPS' className='text-white'>
											DPS
										</MenuItem>
										<MenuItem value='Healer' className='text-white'>
											Healer
										</MenuItem>
									</Select>
								</Grid>

								<Grid item xs={5}>
									<TextField
										type='name'
										fullWidth
										value={currentRaider ? currentRaider.name : ''}
										className={classes.input}
										InputLabelProps={{
											style: { color: '#fff ' },
										}}
										label='Character Name'
										onChange={(e) => {
											setCurrentRaider({
												...currentRaider,
												name: e.target.value,
											});
										}}
									/>
								</Grid>

								<Grid item xs={5}>
									<InputLabel
										id='character-select-label'
										className={classes.select}>
										Select a Class
									</InputLabel>
									<Select
										label='Select a Character'
										value={currentRaider ? currentRaider.class : ''}
										className='w-100'
										onChange={(e) => {
											setCurrentRaider({
												...currentRaider,
												class: e.target.value,
											});
										}}>
										{charClasses.map((char) => (
											<MenuItem value={char} className='text-white'>
												{char}
											</MenuItem>
										))}
									</Select>
								</Grid>

								<Grid item xs={5}>
									<TextField
										type='name'
										fullWidth
										value={currentRaider ? currentRaider.notes : ''}
										className={classes.input}
										InputLabelProps={{
											style: { color: '#fff ' },
										}}
										label='Notes'
										onChange={(e) => {
											setCurrentRaider({
												...currentRaider,
												notes: e.target.value,
											});
										}}
									/>
								</Grid>

								<Grid item xs={8}>
									<Button
										variant='contained'
										color='primary'
										onClick={handleAppendRaider}>
										Append Assignee
									</Button>
								</Grid>
								<Grid item xs={4}>
									<Button
										variant='contained'
										color='default'
										onClick={handleAddNewRaider}>
										Add New Raider
									</Button>
								</Grid>
							</>
						)}
						<Typography variant='h5' className='py-3'>
							Roster Table
						</Typography>
						<TableContainer component={Paper}>
							<Table
								className={darkMode ? classes.table : classes.tableLight}
								aria-label='simple table'>
								<TableHead>
									<TableRow>
										<TableCell
											className={
												darkMode ? 'text-white' : classes.tableHeadersLight
											}>
											Name
										</TableCell>
										<TableCell
											className={
												darkMode ? 'text-white' : classes.tableHeadersLight
											}
											align='right'>
											Class
										</TableCell>
										<TableCell
											className={
												darkMode ? 'text-white' : classes.tableHeadersLight
											}
											align='right'>
											Role
										</TableCell>
										<TableCell
											className={
												darkMode ? 'text-white' : classes.tableHeadersLight
											}
											align='right'>
											Notes
										</TableCell>
										{(user.role === 'admin' ||
											user.role === 'moderator' ||
											user.role === 'guildMaster') && (
											<>
												<TableCell
													className={
														darkMode ? 'text-white' : classes.tableHeadersLight
													}
													align='right'>
													Remove
												</TableCell>
												<TableCell
													className={
														darkMode ? 'text-white' : classes.tableHeadersLight
													}
													align='right'>
													Edit
												</TableCell>
											</>
										)}
									</TableRow>
								</TableHead>
								<TableBody>
									{newRoster.roster.map((raider) => (
										<TableRow key={raider.id}>
											<TableCell
												className={
													darkMode ? 'text-white' : classes.tableCellsLight
												}
												component='th'
												scope='row'>
												{raider.name}
											</TableCell>

											<TableCell
												className={
													darkMode ? 'text-white' : classes.tableCellsLight
												}
												align='right'>
												{raider.class}
											</TableCell>
											<TableCell
												className={
													darkMode ? 'text-white' : classes.tableCellsLight
												}
												align='right'>
												{raider.role}
											</TableCell>
											<TableCell
												className={
													darkMode ? 'text-white' : classes.tableCellsLight
												}
												align='right'>
												{raider.notes}
											</TableCell>
											{(user.role === 'admin' ||
												user.role === 'moderator' ||
												user.role === 'guildMaster') && (
												<>
													<TableCell
														className={
															darkMode ? 'text-white' : classes.tableCellsLight
														}
														align='right'>
														<Button
															variant='contained'
															color='secondary'
															onClick={() => {
																handleRemove(raider.id);
															}}>
															Remove
														</Button>
													</TableCell>
													<TableCell
														className={classes.tableCells}
														align='right'>
														<Button
															variant='contained'
															color='default'
															onClick={() => {
																handleEditCharacter(raider.id);
															}}>
															Edit
														</Button>
													</TableCell>
												</>
											)}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>

						{(user.role === 'admin' ||
							user.role === 'moderator' ||
							user.role === 'guildMaster') && (
							<Grid item xs={6}>
								<Button
									variant='contained'
									color='primary'
									onClick={handleAppendRoster}
									disabled={isLoading}>
									Ammend Roster
								</Button>
							</Grid>
						)}
						<Grid item xs={6}>
							<Button
								variant='contained'
								color='secondary'
								onClick={() => {
									setShow(false);
								}}>
								Close
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Modal>
		</div>
	);
};

export default EditPageTwo;
