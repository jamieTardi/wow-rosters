import React, { useState, useEffect } from 'react';

import Assignments from '../Assignments/Assignments';
import { v4 as uuidv4 } from 'uuid';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { useStyles } from './styles';
import {
	Typography,
	Grid,
	InputLabel,
	Select,
	MenuItem,
	TextField,
	Button,
} from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

const TacticsForm = ({ raidForm, setRaidForm }) => {
	const classes = useStyles();
	const [columnSelect, setColoumnSelect] = useState(0);
	const [selectedColumns, setSelectedColumns] = useState([]);

	const dispatch = useDispatch();
	const [tactics, setTactics] = useState({
		image: '',
		assignedRaiders: [],
		id: uuidv4(),
	});
	const [addCharacter, setAddCharacter] = useState({
		role: '',
		name: '',
		target: '',
		notes: '',
		id: uuidv4(),
	});

	const handleAddCharacter = () => {
		setTactics({
			...tactics,
			assignedRaiders: [...tactics.assignedRaiders, addCharacter],
		});
		setAddCharacter({
			role: '',
			name: '',
			target: '',
			notes: '',
			id: uuidv4(),
		});
	};

	const handleSubmit = () => {
		dispatch({ type: 'ADD_ASSIGNMENT', payload: tactics });
		setRaidForm({ ...raidForm, tactics });
	};

	return (
		<div className='w-100'>
			<form className='w-100'>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Typography variant='h4' gutterBottom>
							Assignments for the Raid (optional)
						</Typography>

						<Typography variant='h6' gutterBottom>
							Pick an image for this assignment (optional){' '}
						</Typography>
						<div>
							<img
								style={{ width: '100%' }}
								src={tactics.image}
								alt='raid pic'
							/>
						</div>
					</Grid>
					<div className='w-100 px-3'>
						<Grid item xs={12}>
							<FileBase
								type='file'
								multiple={false}
								onDone={({ base64 }) =>
									setTactics({ ...tactics, image: base64 })
								}
							/>
						</Grid>
						<div className=' my-3 '>
							<Grid item xs={12}>
								<InputLabel
									id='demo-simple-select-label'
									className={classes.select}>
									Select a role
								</InputLabel>
								<Select
									style={{ width: '100%' }}
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
							</Grid>
						</div>
					</div>

					<Grid item xs={12} sm={6}>
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

					<Grid item xs={12} sm={6}>
						<TextField
							type='name'
							fullWidth
							value={addCharacter.target}
							className={classes.input}
							InputLabelProps={{
								style: { color: '#fff ' },
							}}
							label='Target'
							onChange={(e) => {
								setAddCharacter({ ...addCharacter, target: e.target.value });
							}}
						/>
					</Grid>

					<Grid item xs={12}>
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
							label='Assignment Details'
							onChange={(e) => {
								setAddCharacter({ ...addCharacter, notes: e.target.value });
							}}
						/>
					</Grid>
				</Grid>
				<div className='my-3'>
					<Button
						color='default'
						startIcon={<AddToPhotosIcon />}
						variant='contained'
						type='button'
						onClick={handleAddCharacter}>
						Add Character to Assignment
					</Button>
				</div>
				<Assignments tactics={tactics} />
				<Button
					color='primary'
					variant='contained'
					type='button'
					onClick={handleSubmit}>
					Create Assignment
				</Button>
			</form>
		</div>
	);
};

export default TacticsForm;
