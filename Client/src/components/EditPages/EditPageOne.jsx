import React, { useState } from 'react';
import { Typography, TextField, Button, Grid } from '@material-ui/core';
import { Modal } from 'react-bootstrap';
import { useStyles } from '../Form/styles';
import SaveIcon from '@material-ui/icons/Save';
import { useSelector, useDispatch } from 'react-redux';
import { updateRaid } from '../../actions/raids';
import FileBase from 'react-file-base64';

const EditPageOne = ({ setEditModal }) => {
	const dispatch = useDispatch();
	const selectedRaid = useSelector((state) => state.currentRaid);
	const [uploadedImg, setUploadedImg] = useState('');
	const classes = useStyles();
	const [show, setShow] = useState(true);
	const [editRaid, setEditRaid] = useState(selectedRaid);
	const handleOpen = () => {
		setShow(true);
	};

	const handleClose = () => {
		setShow(false);
	};

	const handleUpdateSelectedRaid = () => {
		dispatch(updateRaid(editRaid._id, editRaid));
		setShow(false);
		setEditModal((prev) => !prev);
	};

	const handleImgUpload = (base64) => {
		setUploadedImg(base64);
		setEditRaid({ ...editRaid, selectedFile: base64 });
	};

	return (
		<div>
			<Modal show={show} onHide={handleClose}>
				<div className={classes.paperModal}>
					<h4 id='transition-modal-title'>Edit Raid Details</h4>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Typography variant='h6' gutterBottom className='mt-4'>
								Please add a Raid image to upload
							</Typography>
							<img
								src={uploadedImg}
								alt='raid image'
								style={{ width: '100%' }}
							/>
						</Grid>

						<Grid item xs={12}>
							<FileBase
								type='file'
								multiple={false}
								onDone={({ base64 }) => handleImgUpload(base64)}
							/>
						</Grid>
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
								onChange={(e) => {
									setEditRaid({ ...editRaid, message: e.target.value });
								}}
							/>
						</Grid>
						<Grid item xs={6}>
							<Button
								variant='contained'
								color='primary'
								onClick={() => {
									handleUpdateSelectedRaid();
								}}
								startIcon={<SaveIcon />}>
								Ammend Raid
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button
								variant='contained'
								color='secondary'
								onClick={handleClose}>
								Close
							</Button>
						</Grid>
					</Grid>
				</div>
			</Modal>
		</div>
	);
};

export default EditPageOne;
