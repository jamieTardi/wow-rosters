import React, { useState, useEffect } from 'react';

import Assignments from '../Assignments/Assignments';
import { v4 as uuidv4 } from 'uuid';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './styles';
import {
	Typography,
	Grid,
	InputLabel,
	Select,
	MenuItem,
	TextField,
	Button,
	Paper,
} from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { createAssignment } from '../../actions/assignments';
import { createImageAssign } from '../../api';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const TacticsForm = ({ raidForm, setRaidForm }) => {
	const classes = useStyles();
	const [completedTxt, setCompletedTxt] = useState(false);
	const dispatch = useDispatch();
	const [file, setFile] = useState('');

	const [newTactics, setNewTactics] = useState({
		title: '',
		selectedFile: '',
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

	const send = async (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append('file', file);
		createImageAssign(data, setNewTactics, newTactics);
	};

	const targetMarkers = [
		'Skull 💀',
		'Cross ❌',
		'Square 🟦',
		'Circle 🟠',
		'Diamond 🔷',
		'Moon 🌙',
		'Triangle 🔺',
	];

	const handleAddCharacter = () => {
		setNewTactics({
			...newTactics,
			assignedRaiders: [...newTactics.assignedRaiders, addCharacter],
		});

		setAddCharacter({
			...addCharacter,
			name: '',
			target: '',
			notes: '',
			id: uuidv4(),
		});
	};

	const handleSubmit = () => {
		dispatch({ type: 'ADD_ASSIGNMENT', payload: newTactics });
		dispatch(createAssignment(newTactics));
		// raidForm.tactics.push(newTactics);
		setNewTactics({ selectedFile: '', assignedRaiders: [], id: uuidv4() });
		setCompletedTxt(true);
		setTimeout(() => {
			setCompletedTxt(false);
		}, 2000);
	};

	return (
		<div className='w-100 d-flex justify-content-center align-items-center'>
			<Paper className='w-50 mt-4'>
				<form className='p-4'>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Typography variant='h4' gutterBottom>
								Assignments for the Raid
							</Typography>

							<Typography variant='h6' gutterBottom>
								Pick an image for this assignment (optional)
							</Typography>
							<div>
								<img
									style={{ width: '100%' }}
									src={newTactics.image}
									alt='raid pic'
								/>
							</div>
						</Grid>

						<div className='w-100 px-3'>
							<Grid item xs={12}>
								{/* <FileBase
									type='file'
									multiple={false}
									onDone={({ base64 }) =>
										setNewTactics({ ...newTactics, image: base64 })
									}
								/> */}
								<div className='mt-3 d-flex flex-column'>
									<input
										type='file'
										id='file'
										accept='.jpg'
										onChange={(e) => {
											const file = e.target.files[0];
											setFile(file);
										}}
									/>
									<Button
										variant='contained'
										color='success'
										className='my-2 w-50'
										onClick={send}
										startIcon={<CloudUploadIcon />}>
										Upload Photo
									</Button>
									{newTactics.selectedFile !== '' ? (
										<img
											src={newTactics.selectedFile}
											alt='raid image'
											style={{ width: '100%' }}
										/>
									) : (
										''
									)}
								</div>
							</Grid>

							<div className=' my-3 '>
								<Grid item xs={12} sm={6} className='mb-4'>
									<TextField
										type='name'
										fullWidth
										value={newTactics.title}
										className={classes.input}
										InputLabelProps={{
											style: { color: '#fff ' },
										}}
										label='Title of the Assignment'
										onChange={(e) => {
											setNewTactics({ ...newTactics, title: e.target.value });
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									<InputLabel
										id='demo-simple-select-label'
										className={classes.select}>
										Select a role
									</InputLabel>
									<Select
										style={{ width: '100%' }}
										onChange={(e) => {
											setAddCharacter({
												...addCharacter,
												role: e.target.value,
											});
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
							<InputLabel
								id='demo-simple-select-label'
								className={classes.select}>
								Select a role
							</InputLabel>
							<Select
								style={{ width: '100%' }}
								onChange={(e) => {
									setAddCharacter({
										...addCharacter,
										target: e.target.value,
									});
								}}>
								{targetMarkers.map((target) => (
									<MenuItem value={target} className='text-black'>
										{target}
									</MenuItem>
								))}
							</Select>
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
					<Assignments tactics={newTactics} />
					<Button
						color='primary'
						variant='contained'
						type='button'
						onClick={handleSubmit}>
						Add this Assignment
					</Button>
				</form>
				{completedTxt && <p>Assignment added, feel free to add another! 👍</p>}
			</Paper>
		</div>
	);
};

export default TacticsForm;
