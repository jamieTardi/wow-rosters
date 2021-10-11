import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useStyles } from '../Form/styles';
import FileBase from 'react-file-base64';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

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
import { updateAssignments, getAssignments } from '../../actions/assignments';
import { createImageAssign, deleteImage } from '../../api';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { v4 as uuidv4 } from 'uuid';

const EditAssignments = ({ show, setShow }) => {
	const assignment = useSelector((state) => state.currentAssignment);
	const allAssignments = useSelector((state) => state.assignments);
	const user = useSelector((state) => state.currentUser);
	const [newTactics, setNewTactics] = useState(assignment);

	const raiders = assignment?.assignedRaiders;
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
	const [newAssingments, setNewAssignments] = useState(null);
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
		}
	};

	const handleAddCharacter = () => {
		let newRaider = [...updatedAssign.assignedRaiders, currentRaider];
		setUpdatedAssign({ ...updatedAssign, assignedRaiders: newRaider });
	};

	useEffect(() => {
		setUpdatedAssign(assignment);
	}, [assignment]);

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
		const data = new FormData();
		data.append('file', file);
		let img = newTactics.image?.substring(
			newTactics.image.lastIndexOf('/') + 1,
			newTactics.image.length,
		);
		if (newTactics.image !== '') {
			deleteImage(img);
		}
		createImageAssign(data, setNewTactics, newTactics);
	};

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
						<a download={newTactics.title} href={newTactics.image}>
							<img
								style={{ width: '100%' }}
								src={newTactics.image}
								alt='raid pic'
							/>
						</a>
						<Typography variant='p' gutterBottom>
							Click on the above image to download 📁
						</Typography>
					</div>
					<div className='w-100'>
						<form className='w-100'>
							{(user.role === 'admin' || user.role === 'moderator') && (
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
													value={newTactics.title}
													className={classes.input}
													InputLabelProps={{
														style: { color: '#fff ' },
													}}
													label='Title of the Assignment'
													onChange={(e) => {
														setNewTactics({
															...newTactics,
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
														className='my-2 w-50'
														onClick={send}
														startIcon={<CloudUploadIcon />}>
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
												InputLabelProps={{
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
							{(user.role === 'admin' || user.role === 'moderator') && (
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
