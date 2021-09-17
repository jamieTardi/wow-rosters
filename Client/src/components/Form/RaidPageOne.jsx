import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useStyles } from './styles';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const RaidPageOne = ({ raidForm, setRaidForm }) => {
	const [uploadedImg, setUploadedImg] = useState('');

	const [startDate, setStartDate] = useState(new Date());
	const classes = useStyles();
	const handleImgUpload = (base64) => {
		setUploadedImg(base64);
		setRaidForm({ ...raidForm, selectedFile: base64 });
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
						InputLabelProps={{
							style: { color: '#fff ' },
						}}
						onChange={(e) => {
							setRaidForm({ ...raidForm, title: e.target.value });
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
						onChange={(e) => {
							setRaidForm({ ...raidForm, time: e.target.value });
						}}
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
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
			<Grid item xs={12}>
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
			</Grid>
		</div>
	);
};

export default RaidPageOne;
