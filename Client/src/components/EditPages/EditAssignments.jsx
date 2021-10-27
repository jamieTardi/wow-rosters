import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useStyles } from '../Form/styles';
import { CircularProgress } from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import axios from 'axios';
import {
	Typography,
	Grid,
	InputLabel,
	Select,
	MenuItem,
	TextField,
	Button,
} from '@material-ui/core';
import EditAssignTable from '../Assignments/EditAssignTable';
import { useSelector, useDispatch } from 'react-redux';
import { updateAssignments } from '../../actions/assignments';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { v4 as uuidv4 } from 'uuid';
import { imageURL } from '../../constants/general';
import loadingGif from '../../images/loadingGif.gif';
import { useHistory } from 'react-router-dom';

const EditAssignments = ({ show, setShow, activeAssignments }) => {
	const assignment = useSelector((state) => state.currentAssignment);
	const history = useHistory();
	const user = useSelector((state) => state.currentUser);
	const [newTactics, setNewTactics] = useState(assignment);
	const [imageResponse, setImageResponse] = useState(null);
	const isMobile = useSelector((state) => state.isMobile);
	const raiders = assignment?.assignedRaiders;
	const [loaded, setLoaded] = useState(false);
	const [addCharacter, setAddCharacter] = useState(raiders);
	const [currentRaider, setCurrentRaider] = useState({
		name: '',
		id: uuidv4(),
		role: '',
		notes: '',
		target: '',
	});
	const [updatedAssign, setUpdatedAssign] = useState(assignment);
	const isDark = useSelector((state) => state.darkMode);
	const [file, setFile] = useState('');
	const [filiteredAssigns, setFiliteredAssigns] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const classes = useStyles();
	const handleClose = () => setShow(false);

	const handleAppendCharacter = () => {
		const updatedRaiders = raiders.map((raider) =>
			raider.id === currentRaider.id ? currentRaider : raider,
		);

		setUpdatedAssign({ ...newTactics, assignedRaiders: updatedRaiders });
	};

	const handleSubmit = () => {
		setIsLoading(true);
		dispatch(updateAssignments(updatedAssign, updatedAssign._id, setIsLoading));
		if (!isLoading) {
			setShow(false);
			history.go(0);
		}
	};

	const handleAddCharacter = () => {
		let newRaider = [...updatedAssign.assignedRaiders, currentRaider];
		setUpdatedAssign({ ...updatedAssign, assignedRaiders: newRaider });
	};

	useEffect(() => {
		setUpdatedAssign(assignment);
	}, [assignment]);

	useEffect(() => {
		let filitered = activeAssignments.filter((assign) => {
			return assignment._id !== assign._id;
		});
		setFiliteredAssigns(filitered);
	}, []);

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

	const send = (e) => {
		e.preventDefault();
		setIsLoading(true);
		axios
			.put(imageResponse, file)
			.then((res) =>
				setUpdatedAssign({
					...updatedAssign,
					image: res.config.url.split('?')[0],
				}),
			)
			.then(() => setIsLoading(false))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		axios
			.get(`${imageURL}s3UrlAssign`)
			.then((res) => setImageResponse(res.data.url));
	}, []);

	return (
		<div>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop='static'
				size='lg'
				keyboard={false}>
				<Modal.Header closeButton closeVariant={isDark && 'white'}>
					<Modal.Title>Assignments</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<div>
							<a download={newTactics.title} href={newTactics.image}>
								<img
									style={
										loaded
											? {
													objectFit: 'cover',
													height: '400px',
													width: '100%',
											  }
											: {
													objectFit: 'contain',
													height: '50px',
													width: '100%',
											  }
									}
									src={
										loaded
											? updatedAssign.image
												? updatedAssign.image
												: 'https://wow-rosters.herokuapp.com/images/image895.jpg'
											: loadingGif
									}
									onLoad={() => setLoaded(true)}
								/>
							</a>
						</div>
						<Typography variant='p' gutterBottom>
							Click on the above image to download 📁
						</Typography>
					</div>
					<div className='w-100'>
						<form className='w-100'>
							{(user.role === 'admin' ||
								user.role === 'moderator' ||
								user.role === 'guildMaster') && (
								<>
									<Grid container spacing={3}>
										<Grid item xs={12}>
											<Typography variant='h4' gutterBottom>
												Edit Assignments for the Raid
											</Typography>
											<Grid item xs={12} sm={6}>
												<TextField
													type='name'
													fullWidth
													value={updatedAssign.title}
													className={classes.input}
													inputlabelprops={{
														style: { color: '#fff ' },
													}}
													label='Title of the Assignment'
													onChange={(e) => {
														setUpdatedAssign({
															...updatedAssign,
															title: e.target.value,
														});
													}}
												/>
											</Grid>
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
														className={isMobile ? 'my-2' : 'my-2 w-50'}
														disabled={isLoading}
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
												</div>
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
														value={currentRaider ? currentRaider.role : ''}
														onChange={(e) => {
															setCurrentRaider({
																...currentRaider,
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
												value={currentRaider ? currentRaider.name : ''}
												className={classes.input}
												inputlabelprops={{
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

										<Grid item xs={12} sm={6}>
											<InputLabel
												id='demo-simple-select-label'
												className={classes.select}>
												Select a Target
											</InputLabel>
											<Select
												style={{ width: '100%' }}
												onChange={(e) => {
													setCurrentRaider({
														...currentRaider,
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
												value={currentRaider ? currentRaider.notes : ''}
												className={classes.input}
												multiline
												rows={8}
												inputlabelprops={{
													style: { color: '#fff ' },
												}}
												label='Assignment Details'
												onChange={(e) => {
													setCurrentRaider({
														...currentRaider,
														notes: e.target.value,
													});
												}}
											/>
										</Grid>
									</Grid>
									<div className='my-3'>
										<Button
											color='default'
											startIcon={<AddToPhotosIcon />}
											className='me-4'
											variant='contained'
											type='button'
											onClick={handleAppendCharacter}>
											Append Raider
										</Button>

										<Button
											color='primary'
											startIcon={<AddToPhotosIcon />}
											variant='contained'
											className='mt-3 mt-md-0'
											type='button'
											onClick={handleAddCharacter}>
											Add New Raider
										</Button>
									</div>
								</>
							)}

							<div>
								<EditAssignTable
									assignment={assignment}
									currentRaider={currentRaider}
									setCurrentRaider={setCurrentRaider}
									handleAppendCharacter={handleAppendCharacter}
									newTactics={newTactics}
									addCharacter={addCharacter}
									updatedAssign={updatedAssign}
									setUpdatedAssign={setUpdatedAssign}
								/>
							</div>
							{(user.role === 'admin' ||
								user.role === 'moderator' ||
								user.role === 'guildMaster') && (
								<Button
									color='primary'
									variant='contained'
									className='mt-3 me-5'
									disabled={isLoading}
									type='button'
									onClick={handleSubmit}>
									Append this Assignment
								</Button>
							)}
							<Button
								color='secondary'
								variant='contained'
								className='mt-3'
								type='button'
								onClick={handleClose}>
								Close
							</Button>
						</form>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default EditAssignments;
