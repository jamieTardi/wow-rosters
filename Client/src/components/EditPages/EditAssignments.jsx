import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';

const EditAssignments = ({ show, setShow }) => {
	const assignment = useSelector((state) => state.currentAssignment);
	const allAssignments = useSelector((state) => state.assignments);
	const [newTactics, setNewTactics] = useState({
		title: assignment.title,
		image: assignment.image,
		assignedRaiders: assignment.assignedRaiders,
		id: assignment.id,
	});

	const raiders = assignment.assignedRaiders;
	const [addCharacter, setAddCharacter] = useState(raiders);
	const [currentRaider, setCurrentRaider] = useState(null);
	const [updatedAssign, setUpdatedAssign] = useState(assignment);
	const [newAssingments, setNewAssignments] = useState(null);

	const classes = useStyles();
	const handleClose = () => setShow(false);

	const handleAppendCharacter = () => {
		const updatedRaiders = raiders.map((raider) =>
			raider.id === currentRaider.id ? currentRaider : raider,
		);

		setUpdatedAssign({ ...assignment, assignedRaiders: updatedRaiders });
	};

	const handleSubmit = () => {
		// find the first index of the assignment and then remove it.
		const unique = allAssignments.findIndex(
			(item) => item._id === updatedAssign._id,
		);
		allAssignments.splice(unique, 1);

		//push the new assignment in

		setNewAssignments([...allAssignments, updatedAssign]);
	};

	return (
		<div>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop='static'
				size='lg'
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Modal title</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='w-100'>
						<form className='w-100'>
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
												setNewTactics({ ...newTactics, title: e.target.value });
											}}
										/>
									</Grid>

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
										<FileBase
											type='file'
											multiple={false}
											onDone={({ base64 }) =>
												setNewTactics({ ...newTactics, image: base64 })
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
									<TextField
										type='name'
										fullWidth
										value={currentRaider ? currentRaider.target : ''}
										className={classes.input}
										InputLabelProps={{
											style: { color: '#fff ' },
										}}
										label='Target'
										onChange={(e) => {
											setCurrentRaider({
												...currentRaider,
												target: e.target.value,
											});
										}}
									/>
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
									variant='contained'
									type='button'
									onClick={handleAppendCharacter}>
									Append Raider
								</Button>
							</div>

							<div>
								<EditAssignTable
									assignment={assignment}
									currentRaider={currentRaider}
									setCurrentRaider={setCurrentRaider}
									handleAppendCharacter={handleAppendCharacter}
									newTactics={newTactics}
									addCharacter={addCharacter}
									updatedAssign={updatedAssign}
								/>
							</div>

							<Button
								color='primary'
								variant='contained'
								className='mt-3'
								type='button'
								onClick={handleSubmit}>
								Add this Assignment
							</Button>
						</form>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default EditAssignments;
