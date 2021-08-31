import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	stepper: {
		padding: theme.spacing(3, 0, 5),
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
}));

const RaidPageOne = ({ raidForm, setRaidForm }) => {
	const classes = useStyles();
	return (
		<div>
			<Typography variant='h4' gutterBottom>
				Main raid details
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TextField
						id='standard-basic'
						fullWidth
						label='Name Of the Raid'
						onChange={(e) => {
							setRaidForm({ ...raidForm, title: e.target.value });
						}}
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<TextField
						id='standard-basic'
						fullWidth
						label='Start Time'
						onChange={(e) => {
							setRaidForm({ ...raidForm, time: e.target.value });
						}}
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<TextField
						id='standard-basic'
						label='Author'
						fullWidth
						onChange={(e) => {
							setRaidForm({ ...raidForm, creator: e.target.value });
						}}
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<TextField
						id='standard-basic'
						label='Date'
						fullWidth
						onChange={(e) => {
							setRaidForm({ ...raidForm, date: e.target.value });
						}}
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<TextField
						id='standard-multiline-static'
						label='Additional Information'
						multiline
						fullWidth
						rows={8}
						defaultValue='Enter any raid specfic information here.'
						onChange={(e) => {
							setRaidForm({ ...raidForm, message: e.target.value });
						}}
					/>
				</Grid>
			</Grid>

			<Typography variant='h6' gutterBottom className='mt-4'>
				Please add a Raid image to upload
			</Typography>
			<Grid item xs={12} sm={6}>
				<FileBase
					type='file'
					multiple={false}
					onDone={({ base64 }) =>
						setRaidForm({ ...raidForm, selectedFile: base64 })
					}
				/>
			</Grid>
		</div>
	);
};

export default RaidPageOne;
