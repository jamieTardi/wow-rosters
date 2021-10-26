import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import { BurstMode, Save } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { updateRaid } from '../../actions/raids';
import DatePicker from 'react-datepicker';
import TimePicker from '../UIcomponents/TimePicker';
import { imageURL } from '../../constants/general';
import {
	IS_LOADING,
	UPDATE_CURRENT_RAID,
	IS_NOT_LOADING,
} from '../../constants/actionTypes';
import CircularProgress from '@material-ui/core/CircularProgress';
import { maskedDateFormatter } from '@material-ui/pickers/_helpers/text-field-helper';

const EditPageOne = ({ setEditModal }) => {
	const dispatch = useDispatch();
	const [raidTime, setRaidTime] = useState('20:30');
	const selectedRaid = useSelector((state) => state.currentRaid);
	const serverResponse = useSelector((state) => state.isLoading);
	const [uploadedImg, setUploadedImg] = useState('');
	const classes = useStyles();
	const [show, setShow] = useState(true);
	const [editRaid, setEditRaid] = useState(selectedRaid);
	const [startDate, setStartDate] = useState(new Date());
	const [file, setFile] = useState('');
	const [imageResponse, setImageResponse] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [image, setImage] = useState('');

	const dateFormat = (date) => {
		let newDate = `${date.toDateString()}`;

		setEditRaid({ ...editRaid, date: newDate });
	};
	console.log(editRaid);

	const handleClose = () => {
		setShow(false);
	};

	const handleUpdateSelectedRaid = () => {
		dispatch({ type: IS_LOADING });
		dispatch(updateRaid(editRaid._id, editRaid));
		dispatch({ type: UPDATE_CURRENT_RAID, payload: editRaid });
		if (!serverResponse) {
			setShow(false);
			setEditModal((prev) => !prev);
		}
	};

	const send = async (e) => {
		setIsLoading(true);
		e.preventDefault();
		axios
			.put(imageResponse, file)
			.then((res) => setImage(res.config.url.split('?')[0]))
			.then(() => setIsLoading(false))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		if (image) {
			setEditRaid({
				...editRaid,
				selectedFile: [image],
			});
		}
	}, [image]);

	useEffect(() => {
		axios
			.get(`${imageURL}s3UrlRaids`)
			.then((res) => setImageResponse(res.data.url));
	}, []);

	useEffect(() => {
		dispatch({ type: IS_NOT_LOADING });
	}, []);

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
								}}
							/>
						</Grid>

						<Grid item xs={12}>
							<Button
								color='default'
								variant='contained'
								onClick={send}
								disabled={isLoading}
								startIcon={
									isLoading ? <CircularProgress size={20} /> : <BurstMode />
								}>
								Replace Image
							</Button>
						</Grid>
						<Grid item xs={12}>
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
						<Grid item xs={12}>
							<TimePicker
								editRaid={editRaid}
								setEditRaid={setEditRaid}
								className={classes.input}
							/>
						</Grid>
						<Grid item xs={12}>
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

						<Grid item xs={12}>
							<InputLabel
								id='demo-simple-select-label'
								className={classes.select}>
								Select a Date
							</InputLabel>
							<DatePicker
								selected={startDate}
								onChange={(date) => {
									setStartDate(date);
									dateFormat(date);
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
								disabled={serverResponse}
								onClick={() => {
									handleUpdateSelectedRaid();
								}}
								startIcon={
									serverResponse ? <CircularProgress size={20} /> : <Save />
								}>
								{serverResponse ? 'Updating...' : 'Ammend'}
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
