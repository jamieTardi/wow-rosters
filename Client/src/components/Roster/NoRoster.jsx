import React, { useState, useEffect } from 'react';
import {
	Button,
	FormControl,
	Select,
	MenuItem,
	InputLabel,
} from '@material-ui/core';
import { useStyles } from '../Form/styles';
import { useSelector, useDispatch } from 'react-redux';
import { updateRaid } from '../../actions/raids';
import LoadingSpinner from '../UIcomponents/LoadingSpinner';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const NoRoster = ({ serverResponse, setServerResponse, setThisRaid }) => {
	const history = useHistory();
	const classes = useStyles();
	const dispatch = useDispatch();
	const [rosterVal, setRosterVal] = useState(null);
	const rosters = useSelector((state) => state.createdRosters);
	const raid = useSelector((state) => state.currentRaid);
	const user = useSelector((state) => state.currentUser);

	const handleSubmitRoster = () => {
		dispatch(
			updateRaid(raid._id, { ...raid, roster: rosterVal }, setServerResponse),
		);
		history.go(0);
	};
	useEffect(() => {
		setRosterVal(null);
	}, []);
	return (
		<>
			{user.role === 'admin' ||
			user.role === 'moderator' ||
			user.role === 'guildMaster' ? (
				<div>
					{!serverResponse ? (
						<>
							<h4>There is currently no roster assigned.</h4>
							<p>
								To assing a roster that has already been created click the
								Assign roster Button.
							</p>
							<FormControl className='w-50'>
								<InputLabel
									id='demo-simple-select-label'
									className={classes.select}>
									Select a roster
								</InputLabel>
								<Select>
									{rosters.map((roster) => (
										<MenuItem
											value={roster.title}
											className='text-white'
											onClick={() => {
												setRosterVal(roster);
											}}>
											{roster.title}
										</MenuItem>
									))}
								</Select>
								<div className='my-4'>
									<Button
										onClick={handleSubmitRoster}
										color='default'
										variant='contained'
										disabled={!rosterVal}>
										Add this roster
									</Button>
								</div>
							</FormControl>
							<p>
								If you need to make a roster please click on the create roster
								button.
							</p>
							<Link to='/view-rosters'>
								<Button color='primary' variant='contained'>
									Go to rosters
								</Button>
							</Link>
						</>
					) : (
						<LoadingSpinner />
					)}
				</div>
			) : (
				<div>
					{' '}
					<h4>No Roster is assigned</h4>
					<p>Please contact an officer for more information</p>
				</div>
			)}
		</>
	);
};

export default NoRoster;
