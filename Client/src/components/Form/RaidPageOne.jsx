import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './styles';
import DatePicker from 'react-datepicker';
import TimePicker from '../UIcomponents/TimePicker';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { imageURL } from '../../constants/general';

const RaidPageOne = ({ raidForm, setRaidForm }) => {
	const [file, setFile] = useState('');
	const [image, setImage] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const [imageResponse, setImageResponse] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const classes = useStyles();

	//Send the image to the server
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
			setRaidForm({
				...raidForm,
				selectedFile: [image],
			});
		}
	}, [image]);

	useEffect(() => {
		axios.get(`${imageURL}s3Url`).then((res) => setImageResponse(res.data.url));
	}, []);

	return (
		<div className='pt-5'>
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

				<Grid item xs={12} sm={6}>
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

			<InputLabel className='my-3'>Upload an Image for the Raid</InputLabel>
			<input
				type='file'
				id='file'
				accept='.jpg'
				onChange={(e) => {
					const file = e.target.files[0];
					setFile(file);
				}}
			/>
			<div className='mt-3 d-flex flex-column '>
				<Button
					variant='contained'
					color='success'
					className='my-2 w-50'
					disabled={isLoading}
					onClick={send}
					startIcon={
						isLoading ? <CircularProgress size={20} /> : <CloudUploadIcon />
					}>
					{isLoading ? 'Uploading' : 'Upload Photo'}
				</Button>
				{image && (
					<img src={image} alt='raid image' style={{ width: '100%' }} />
				)}
			</div>
		</div>
	);
};

export default RaidPageOne;
