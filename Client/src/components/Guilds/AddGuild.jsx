import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import {
	Button,
	TextField,
	Grid,
	InputLabel,
	Select,
	MenuItem,
	CircularProgress,
} from '@material-ui/core';
import { useStyles } from '../Form/styles';
import { useSelector, useDispatch } from 'react-redux';
import { createGuild } from '../../api';
import { Cloud } from '@material-ui/icons';
import { updateuser } from '../../actions/auth';

const AddGuild = ({ guildShow, setGuildShow }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [allowSubmit, setAllowSubmit] = useState(false);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const currentUser = useSelector((state) => state.currentUser);
	const [response, setResponse] = useState(false);
	const [serverMsg, setServerMsg] = useState(null);

	const [newGuild, setNewGuild] = useState({
		name: '',
		image: '',
		realm: '',
		faction: '',
		region: '',
		members: [],
		info: '',
	});

	const regions = ['Americas', 'Europe', 'Korea', 'Taiwan', 'China'];

	const handleCreateGuild = (e) => {
		e.preventDefault();
		createGuild(newGuild, setError, setResponse);
		dispatch(
			updateuser(
				currentUser._id,
				{
					...currentUser,
					role: 'guildMaster',
					guild: newGuild.name,
					character: newGuild.members[0],
				},
				setServerMsg,
			),
		);
	};
	const handleClose = () => {
		setGuildShow(false);
	};

	useEffect(() => {
		if (response) {
			setResponse(null);
		}
	}, [response]);

	useEffect(() => {
		if (
			newGuild.name !== '' &&
			newGuild.realm !== '' &&
			newGuild.faction !== '' &&
			newGuild.region !== '' &&
			newGuild.members !== []
		) {
			setAllowSubmit(true);
			setError(null);
		} else {
			setAllowSubmit(false);
		}
	}, [newGuild]);
	return (
		<div>
			<Modal show={guildShow} onHide={handleClose}>
				<Modal.Body>
					<form
						onSubmit={(e) => {
							handleCreateGuild(e);
						}}>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6}>
								<TextField
									id='standard-basic'
									className={classes.input}
									required
									fullWidth
									label='New Guild Name'
									onChange={(e) => {
										setNewGuild({ ...newGuild, name: e.target.value });
									}}
									InputLabelProps={{
										style: { color: '#fff ' },
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									id='standard-basic'
									className={classes.input}
									required
									fullWidth
									label='Realm name'
									onChange={(e) => {
										setNewGuild({ ...newGuild, realm: e.target.value });
									}}
									InputLabelProps={{
										style: { color: '#fff ' },
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id='standard-basic'
									className={classes.input}
									fullWidth
									required
									label='Your Character Name'
									onChange={(e) => {
										setNewGuild({ ...newGuild, members: [e.target.value] });
									}}
									InputLabelProps={{
										style: { color: '#fff ' },
									}}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<InputLabel
									id='demo-simple-select-label'
									className={classes.select}>
									Select a Region
								</InputLabel>
								<Select
									style={{ width: '100%' }}
									value={newGuild.region}
									required
									onChange={(e) => {
										setNewGuild({
											...newGuild,
											region: e.target.value,
										});
									}}>
									{regions.map((region) => (
										<MenuItem value={region}>{region}</MenuItem>
									))}
								</Select>
							</Grid>

							<Grid item xs={12} sm={6}>
								<InputLabel
									id='demo-simple-select-label'
									className={classes.select}>
									Select a Faction
								</InputLabel>
								<Select
									style={{ width: '100%' }}
									value={newGuild.faction}
									required
									onChange={(e) => {
										setNewGuild({
											...newGuild,
											faction: e.target.value,
										});
									}}>
									{['Horde', 'Alliance'].map((faction) => (
										<MenuItem value={faction}>{faction}</MenuItem>
									))}
								</Select>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id='standard-multiline-static'
									label='Additional Guild Information (optional)'
									InputLabelProps={{
										style: { color: '#fff ' },
									}}
									className={classes.input}
									multiline
									fullWidth
									rows={8}
									defaultValue=''
									onChange={(e) => {
										setNewGuild({ ...newGuild, info: e.target.value });
									}}
								/>
							</Grid>
						</Grid>
						<Button
							color='primary'
							variant='contained'
							type='submit'
							className='mt-3'
							startIcon={user ? <CircularProgress size={20} /> : <Cloud />}
							disabled={!allowSubmit || user}>
							{user ? 'Uploading...' : 'Create Guild'}
						</Button>
						{error && (
							<p className='text-danger' style={{ fontSize: '0.8rem' }}>
								The server returned an Error message: {error}
							</p>
						)}
					</form>
				</Modal.Body>
				<Modal.Footer>
					<div className='d-flex justify-content-end w-100'>
						<Button color='secondary' variant='contained' onClick={handleClose}>
							Close
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default AddGuild;
