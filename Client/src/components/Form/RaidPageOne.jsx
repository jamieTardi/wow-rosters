import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { useStyles } from './styles';
import DatePicker from 'react-datepicker';
import TimePicker from '../UIcomponents/TimePicker';
import axios from 'axios';

const RaidPageOne = ({
	raidForm,
	setRaidForm,
	setRaidMinute,
	setRaidHour,
	raidHour,
	raidMinute,
}) => {
	const [uploadedImg, setUploadedImg] = useState('');
	const [file, setFile] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const classes = useStyles();
	const handleImgUpload = (base64) => {
		setUploadedImg(base64);
		setRaidForm({ ...raidForm, selectedFile: base64 });
	};

	const send = (e) => {
		const data = new FormData();
		data.append('file', file);

		axios
			.post('http://localhost:5000/uploads', data)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<Typography variant='h4' gutterBottom>
				Main raid details
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TextField
						id='standard-basic'
						className={classes.input}
						fullWidth
						label='Name Of the Raid'
						value={raidForm.title}
						InputLabelProps={{
							style: { color: '#fff ' },
						}}
						onChange={(e) => {
							setRaidForm({ ...raidForm, title: e.target.value });
						}}
					/>
				</Grid>

				<Grid item xs={6} sm={6}>
					<TimePicker editRaid={raidForm} setEditRaid={setRaidForm} />
				</Grid>

				<Grid item xs={12} sm={6}>
					<InputLabel>Please select a date </InputLabel>
					<DatePicker
						selected={startDate}
						onChange={(date) => {
							setStartDate(date);
							setRaidForm({ ...raidForm, date });
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
						defaultValue=''
						onChange={(e) => {
							setRaidForm({ ...raidForm, message: e.target.value });
						}}
					/>
				</Grid>
			</Grid>
			{/* <Grid item xs={12}>
				<Typography variant='h6' gutterBottom className='mt-4'>
					Please add a raid image to upload
				</Typography>
				<img src={uploadedImg} alt='raid image' style={{ width: '100%' }} />
			</Grid>

			<Grid item xs={12}>
				<FileBase
					type='file'
					multiple={false}
					onDone={({ base64 }) => handleImgUpload(base64)}
				/>
			</Grid> */}
			<label>Image upload</label>
			<input
				type='file'
				id='file'
				accept='.jpg'
				onChange={(e) => {
					const file = e.target.files[0];
					setFile(file);
				}}
			/>
			<button onClick={send}>send</button>
		</div>
	);
};

export default RaidPageOne;
