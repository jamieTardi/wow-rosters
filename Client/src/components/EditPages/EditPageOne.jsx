import React, { useState } from 'react';
import {
	Typography,
	TextField,
	Button,
	Grid,
	InputLabel,
	Select,
	MenuItem,
} from '@material-ui/core';
import { Modal } from 'react-bootstrap';
import { useStyles } from '../Form/styles';
import SaveIcon from '@material-ui/icons/Save';
import { useSelector, useDispatch } from 'react-redux';
import { updateRaid } from '../../actions/raids';
import DatePicker from 'react-datepicker';
import TimePicker from '../UIcomponents/TimePicker';
import { imageTrim } from '../../lib/trimImage';
import { deleteImage, createImage } from '../../api';
import { UPDATE_CURRENT_RAID } from '../../constants/actionTypes';

const EditPageOne = ({ setEditModal }) => {
	const dispatch = useDispatch();
	const [raidTime, setRaidTime] = useState('20:30');
	const selectedRaid = useSelector((state) => state.currentRaid);
	const [uploadedImg, setUploadedImg] = useState('');
	const classes = useStyles();
	const [show, setShow] = useState(true);
	const [editRaid, setEditRaid] = useState(selectedRaid);
	const [startDate, setStartDate] = useState(new Date());
	const [file, setFile] = useState('');

	const handleOpen = () => {
		setShow(true);
	};

	const handleClose = () => {
		setShow(false);
	};

	const handleUpdateSelectedRaid = () => {
		dispatch(updateRaid(editRaid._id, editRaid));
		dispatch({ type: UPDATE_CURRENT_RAID, payload: editRaid });
		setShow(false);
		setEditModal((prev) => !prev);
	};

	const handleImgUpload = () => {
		const data = new FormData();
		data.append('file', file);
		createImage(data, setEditRaid, editRaid);
	};

	console.log(selectedRaid);

	return (
		<div>
			<Modal show={show} onHide={handleClose}>
				<div className={classes.paperModal}>
					<h4 id='transition-modal-title'>Edit Raid Details</h4>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Typography variant='h6' gutterBottom className='mt-4'>
								Add a different raid image
							</Typography>
							<img
								src={editRaid.selectedFile[0]}
								alt='raid image'
								style={{ width: '100%' }}
							/>
							<input
								type='file'
								id='file'
								accept='.jpg'
								onChange={(e) => {
									const file = e.target.files[0];
									setFile(file);
									let img = imageTrim(editRaid.selectedFile[0]);
									if (editRaid.selectedFile.length !== 0) {
										deleteImage(img);
									}
								}}
							/>
						</Grid>

						<Grid item xs={12}>
							<Button
								color='default'
								variant='contained'
								onClick={handleImgUpload}>
								Replace Image
							</Button>
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

						<TimePicker editRaid={editRaid} setEditRaid={setEditRaid} />

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
							<InputLabel
								id='demo-simple-select-label'
								className={classes.select}>
								Select a Date
							</InputLabel>
							<DatePicker
								selected={startDate}
								onChange={(date) => {
									setStartDate(date);
									setEditRaid({ ...editRaid, date });
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
