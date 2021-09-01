import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRoster } from '../../api';
import Roster from '../Roster/Roster';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel, Button } from '@material-ui/core';
import { useStyles } from './styles';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

const RosterForm = ({ selectedRaid, setRaidForm, raidForm }) => {
	const [addCharacter, setAddCharacter] = useState({
		role: '',
		name: '',
		class: '',
		notes: '',
		id: uuidv4(),
	});
	const dispatch = useDispatch();
	const [show, setShow] = useState(true);
	const [title, setTitle] = useState(false);
	const [assignedRoster, setAssignedRoster] = useState([]);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleAddCharacter = () => {
		setAssignedRoster([...assignedRoster, addCharacter]);
		setAddCharacter({
			role: '',
			name: '',
			class: '',
			notes: '',
			id: uuidv4(),
		});
	};
	const classes = useStyles();
	return (
		<>
			<FormControl
				className='w-100'
				onSubmit={(e) => {
					handleAddCharacter(e);
				}}>
				<InputLabel id='demo-simple-select-label' className={classes.select}>
					Select a role
				</InputLabel>
				<Select
					onChange={(e) => {
						setAddCharacter({ ...addCharacter, role: e.target.value });
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

				<div className='d-flex justify-content-between my-3'>
					<Grid item xs={5}>
						<TextField
							type='name'
							fullWidth
							value={addCharacter.name}
							className={classes.input}
							InputLabelProps={{
								style: { color: '#fff ' },
							}}
							label='Character Name'
							onChange={(e) => {
								setAddCharacter({ ...addCharacter, name: e.target.value });
							}}
						/>
					</Grid>

					<Grid item xs={5}>
						<TextField
							type='name'
							fullWidth
							value={addCharacter.class}
							className={classes.input}
							InputLabelProps={{
								style: { color: '#fff ' },
							}}
							label='Class'
							onChange={(e) => {
								setAddCharacter({ ...addCharacter, class: e.target.value });
							}}
						/>
					</Grid>
				</div>
				<Grid item>
					<TextField
						fullWidth
						type='name'
						value={addCharacter.notes}
						className={classes.input}
						multiline
						rows={8}
						InputLabelProps={{
							style: { color: '#fff ' },
						}}
						label='Notes'
						onChange={(e) => {
							setAddCharacter({ ...addCharacter, notes: e.target.value });
						}}
					/>
				</Grid>

				<Button
					variant='contained'
					className='my-4'
					color='default'
					type='button'
					startIcon={<AddToPhotosIcon />}
					onClick={handleAddCharacter}>
					Add Character to Roster
				</Button>
			</FormControl>

			<div>
				<Roster
					selectedRaid={selectedRaid}
					setRaidForm={setRaidForm}
					raidForm={raidForm}
					assignedRoster={assignedRoster}
					setAssignedRoster={setAssignedRoster}
				/>
			</div>
		</>
	);
};

export default RosterForm;
