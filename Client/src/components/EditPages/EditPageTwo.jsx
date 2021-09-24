import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
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
import { classicNameResolver } from 'typescript';
import { useDispatch } from 'react-redux';
import { updateRaid } from '../../actions/raids';

const EditPageTwo = ({ hideModal, show, setShow }) => {
	const raid = useSelector((state) => state.currentRaid);

	const currentRoster = useSelector((state) => state.currentRoster);

	const dispatch = useDispatch();
	const [newRoster, setNewRoster] = useState(currentRoster.roster);
	const [currentId, setCurrentId] = useState(0);
	const [currentRaider, setCurrentRaider] = useState(null);
	const classes = useStyles();

	const handleEditCharacter = (id) => {
		currentRoster.roster.map((raider) => {
			if (raider.id === id) {
				setCurrentRaider(raider);
			}
		});
	};

	const handleRemove = (id) => {
		let filitered = newRoster.filter((raider) => {
			return raider.id !== id;
		});
		setNewRoster(filitered);
	};

	const handleAppendRaider = () => {
		setNewRoster([...currentRoster.roster, currentRaider]);

		const updatedItems = newRoster.map((raider) =>
			raider.id === currentRaider.id ? currentRaider : raider,
		);
		setNewRoster(updatedItems);
	};

	const handleAppendRoster = () => {
		const id = raid._id;
		dispatch();
	};

	const handleAddNewRaider = () => {
		setNewRoster([...raid.roster, currentRaider]);
	};

	return (
		<div>
			<Modal show={show} size='lg'>
				<Paper className={classes.paperModal}>
					<Grid container spacing={3}>
						<Typography variant='h5'>Edit the current roster</Typography>

						<Grid item xs={12}>
							<InputLabel
								id='demo-simple-select-label'
								className={classes.select}
								value={currentRaider ? currentRaider.role : ''}>
								Select a role
							</InputLabel>

							<Select
								onChange={(e) => {
									setCurrentRaider({ ...currentRaider, role: e.target.value });
								}}>
								<MenuItem value='Tank' className='text-black'>
									Tank
								</MenuItem>
								<MenuItem value='DPS' className='text-black'>
									DPS
								</MenuItem>
								<MenuItem value='Healer' className='text-black'>
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
									setCurrentRaider({ ...currentRaider, name: e.target.value });
								}}
							/>
						</Grid>

						<Grid item xs={5}>
							<TextField
								type='name'
								fullWidth
								value={currentRaider ? currentRaider.class : ''}
								className={classes.input}
								InputLabelProps={{
									style: { color: '#fff ' },
								}}
								label='Class'
								onChange={(e) => {
									setCurrentRaider({ ...currentRaider, class: e.target.value });
								}}
							/>
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
									setCurrentRaider({ ...currentRaider, notes: e.target.value });
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

						<TableContainer component={Paper}>
							<Table className={classes.table} aria-label='simple table'>
								<TableHead>
									<TableRow>
										<TableCell className={classes.tableHeaders}>Name</TableCell>
										<TableCell className={classes.tableHeaders} align='right'>
											Class
										</TableCell>
										<TableCell className={classes.tableHeaders} align='right'>
											Role
										</TableCell>
										<TableCell className={classes.tableHeaders} align='right'>
											Notes
										</TableCell>
										<TableCell className={classes.tableHeaders} align='right'>
											Remove
										</TableCell>
										<TableCell className={classes.tableHeaders} align='right'>
											Edit
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{newRoster.map((raider) => (
										<TableRow key={raider.id}>
											<TableCell
												className={classes.tableCells}
												component='th'
												scope='row'>
												{raider.name}
											</TableCell>

											<TableCell className={classes.tableCells} align='right'>
												{raider.class}
											</TableCell>
											<TableCell className={classes.tableCells} align='right'>
												{raider.role}
											</TableCell>
											<TableCell className={classes.tableCells} align='right'>
												{raider.notes}
											</TableCell>
											<TableCell className={classes.tableCells} align='right'>
												<Button
													variant='contained'
													color='secondary'
													onClick={() => {
														handleRemove(raider.id);
													}}>
													Remove
												</Button>
											</TableCell>
											<TableCell className={classes.tableCells} align='right'>
												<Button
													variant='contained'
													color='default'
													onClick={() => {
														handleEditCharacter(raider.id);
													}}>
													Edit
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>

						<Grid item xs={6}>
							<Button
								variant='contained'
								color='primary'
								onClick={handleAppendRoster}>
								Ammend Roster
							</Button>
						</Grid>
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
