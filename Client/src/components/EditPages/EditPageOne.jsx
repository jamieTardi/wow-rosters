import React, { useState } from 'react';
import { Typography, TextField, Button, Grid } from '@material-ui/core';
import { Modal } from 'react-bootstrap';
import { useStyles } from '../Form/styles';
import SaveIcon from '@material-ui/icons/Save';
import { useSelector, useDispatch } from 'react-redux';

const EditPageOne = () => {
	const dispatch = useDispatch();
	const selectedRaid = useSelector((state) => state.currentRaid);
	const classes = useStyles();
	const [show, setShow] = useState(true);
	const [editRaid, setEditRaid] = useState(selectedRaid);
	const handleOpen = () => {
		setShow(true);
	};

	const handleClose = () => {
		setShow(false);
	};

	console.log(editRaid);

	const handleUpdateSelectedRaid = () => {
		dispatch({ type: 'UPDATE_CURRENT_RAID', payload: editRaid });
	};

	return (
		<div>
			<Modal show={show} onHide={handleClose}>
				<div className={classes.paperModal}>
					<h4 id='transition-modal-title'>Edit Raid Details</h4>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<TextField
								id='standard-basic'
								className={classes.input}
								fullWidth
								label='Name Of the Raid'
								defaultValue={selectedRaid.title}
								onChange={(e) => {
									setEditRaid({ ...editRaid, title: e.target.value });
								}}
								InputLabelProps={{
									style: { color: '#fff ' },
								}}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<TextField
								id='standard-basic'
								fullWidth
								InputLabelProps={{
									style: { color: '#fff ' },
								}}
								className={classes.input}
								label='Start Time'
								defaultValue={selectedRaid.time}
								onChange={(e) => {
									setEditRaid({ ...editRaid, time: e.target.value });
								}}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<TextField
								id='standard-basic'
								label='Author'
								InputLabelProps={{
									style: { color: '#fff ' },
								}}
								className={classes.input}
								fullWidth
								defaultValue={selectedRaid.creator}
								onChange={(e) => {
									setEditRaid({ ...editRaid, creator: e.target.value });
								}}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<TextField
								id='standard-basic'
								label='Date'
								InputLabelProps={{
									style: { color: '#fff ' },
								}}
								className={classes.input}
								fullWidth
								defaultValue={selectedRaid.date}
								onChange={(e) => {
									setEditRaid({ ...editRaid, date: e.target.value });
								}}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								id='standard-multiline-static'
								label='Additional Information'
								InputLabelProps={{
									style: { color: '#fff ' },
								}}
								className={classes.input}
								multiline
								fullWidth
								rows={8}
								defaultValue={selectedRaid.message}
							/>
						</Grid>
						<Button
							variant='contained'
							color='primary'
							startIcon={<SaveIcon />}>
							Ammend Raid
						</Button>
					</Grid>
				</div>
			</Modal>
		</div>
	);
};

export default EditPageOne;
