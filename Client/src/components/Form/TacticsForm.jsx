import React, { useState, useEffect } from 'react';
import Assignments from '../Assignments/Assignments';
import { v4 as uuidv4 } from 'uuid';
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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { imageURL } from '../../constants/general';
import { IS_LOADING, IS_NOT_LOADING } from '../../constants/actionTypes';

const TacticsForm = ({ raidForm, setRaidForm }) => {
	const classes = useStyles();
	const [imageResponse, setImageResponse] = useState(null);
	const [image, setImage] = useState(null);
	const currentUser = useSelector((state) => state.currentUser);
	const [isLoading, setIsLoading] = useState(false);
	const [completedTxt, setCompletedTxt] = useState(false);
	const dispatch = useDispatch();
	const [file, setFile] = useState('');
	const mobileSize = useSelector((state) => state.isMobile);
	const serverLoading = useSelector((state) => state.isLoading);

	const [newTactics, setNewTactics] = useState({
		title: '',
		selectedFile: '',
		guild: currentUser.guild,
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
		setIsLoading(true);
		axios
			.put(imageResponse, file)
			.then((res) => setImage(res.config.url.split('?')[0]))
			.then(() => setIsLoading(false))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		if (image) {
			setNewTactics({
				...newTactics,
				image,
			});
		}
	}, [image]);

	const targetMarkers = [
		'Skull 💀',
		'Cross ❌',
		'Square 🟦',
		'Circle 🟠',
		'Diamond 🔷',
		'Moon 🌙',
		'Triangle 🔺',
		'Other...',
	];

	const handleAddCharacter = () => {
		setNewTactics({
			...newTactics,
			assignedRaiders: [...newTactics.assignedRaiders, addCharacter],
		});

		setAddCharacter({
			...addCharacter,
			name: '',
			notes: '',
			id: uuidv4(),
		});
	};

	const handleSubmit = () => {
		dispatch({ type: IS_LOADING });
		dispatch({ type: 'ADD_ASSIGNMENT', payload: newTactics });
		dispatch(createAssignment(newTactics));
		setNewTactics({
			title: '',
			selectedFile: '',
			guild: currentUser.guild,
			assignedRaiders: [],
			id: uuidv4(),
		});
		setImage(null);
		setCompletedTxt(true);
		setTimeout(() => {
			setCompletedTxt(false);
		}, 2000);
	};

	useEffect(() => {
		dispatch({ type: IS_NOT_LOADING });
		axios.get(`${imageURL}s3Url`).then((res) => setImageResponse(res.data.url));
	}, []);

	console.log(image);

	//upload photo disable

	return (
		<div className='w-100 d-flex justify-content-center align-items-center'>
			<Paper className={mobileSize ? 'w-100 mt-4' : 'w-50 mt-4'}>
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
								{image && (
									<img style={{ width: '100%' }} src={image} alt='raid pic' />
								)}
							</div>
						</Grid>

						<div className='w-100 px-3'>
							<Grid item xs={12}>
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
										disabled={isLoading || !file}
										onClick={send}
										startIcon={
											isLoading ? (
												<CircularProgress size={20} />
											) : (
												<CloudUploadIcon />
											)
										}>
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
										defaultValue=''
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
										<MenuItem value='Tank'>Tank</MenuItem>
										<MenuItem value='DPS'>DPS</MenuItem>
										<MenuItem value='Healer'>Healer</MenuItem>
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
								Select a Target
							</InputLabel>
							<Select
								style={{ width: '100%' }}
								value={addCharacter.target}
								onChange={(e) => {
									setAddCharacter({
										...addCharacter,
										target: e.target.value,
									});
								}}>
								{targetMarkers.map((target) => (
									<MenuItem value={target}>{target}</MenuItem>
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
							disabled={addCharacter.name === ''}
							type='button'
							onClick={handleAddCharacter}>
							Add Character to Assignment
						</Button>
					</div>
					<Assignments tactics={newTactics} setNewTactics={setNewTactics} />

					<div className='d-flex justify-content-around'>
						<Button
							color='default'
							variant='contained'
							type='button'
							component={Link}
							to={'/'}>
							Back
						</Button>
						<Button
							color='primary'
							variant='contained'
							type='button'
							disabled={
								serverLoading || newTactics.assignedRaiders.length === 0
							}
							startIcon={serverLoading && <CircularProgress size={20} />}
							onClick={handleSubmit}>
							Add this Assignment
						</Button>
					</div>
				</form>
				{completedTxt && <p>Assignment added, feel free to add another! 👍</p>}
			</Paper>
		</div>
	);
};

export default TacticsForm;
