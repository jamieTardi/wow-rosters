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

const EditPageTwo = ({ hideModal }) => {
	const raid = useSelector((state) => state.currentRaid);

	const [newRoster, setNewRoster] = useState(raid.roster);
	const [raidEdit, setRaidEdit] = useState({ ...raid, roster: newRoster });
	const [currentId, setCurrentId] = useState(0);
	const [currentRaider, setCurrentRaider] = useState(null);
	const classes = useStyles();
	const [show, setShow] = useState(true);
	const [filiteredRaid, setFiliteredRaid] = useState(null);

	const handleEditCharacter = (id) => {
		raid.roster.map((raider) => {
			if (raider.id === id) {
				setCurrentRaider(raider);
			}
		});
	};

	const handleAppendRaider = () => {
		setNewRoster([...raid.roster, currentRaider]);
		console.log(currentRaider);

		const updatedItems = newRoster.map((el) =>
			el.id === currentRaider.id ? currentRaider : el,
		);
		setNewRoster(updatedItems);
	};

	// arr.filter((v,i,a)=>a.findIndex(t=>(t.label === v.label && t.value===v.value))===i)
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
								color='default'
								onClick={handleAppendRaider}>
								Append Assignee
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
									{newRoster !== null && newRoster.length !== 0
										? newRoster.map((raider) => (
												<TableRow key={raider.id}>
													<TableCell
														className={classes.tableCells}
														component='th'
														scope='row'>
														{raider.name}
													</TableCell>

													<TableCell
														className={classes.tableCells}
														align='right'>
														{raider.class}
													</TableCell>
													<TableCell
														className={classes.tableCells}
														align='right'>
														{raider.role}
													</TableCell>
													<TableCell
														className={classes.tableCells}
														align='right'>
														{raider.notes}
													</TableCell>
													<TableCell
														className={classes.tableCells}
														align='right'>
														<Button variant='contained' color='secondary'>
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
												</TableRow>
										  ))
										: raid.roster.map((raider) => (
												<TableRow key={raider.id}>
													<TableCell
														className={classes.tableCells}
														component='th'
														scope='row'>
														{raider.name}
													</TableCell>

													<TableCell
														className={classes.tableCells}
														align='right'>
														{raider.class}
													</TableCell>
													<TableCell
														className={classes.tableCells}
														align='right'>
														{raider.role}
													</TableCell>
													<TableCell
														className={classes.tableCells}
														align='right'>
														{raider.notes}
													</TableCell>
													<TableCell
														className={classes.tableCells}
														align='right'>
														<Button variant='contained' color='secondary'>
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
												</TableRow>
										  ))}
								</TableBody>
							</Table>
						</TableContainer>

						<Grid item xs={6}>
							<Button
								variant='contained'
								color='primary'
								onClick={handleAppendRaider}>
								Ammend Roster
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button variant='contained' color='secondary'>
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
