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

const NoRoster = ({ serverResponse, setServerResponse, setThisRaid }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [rosterVal, setRosterVal] = useState(null);
	const rosters = useSelector((state) => state.createdRosters);
	const raid = useSelector((state) => state.currentRaid);

	const handleSubmitRoster = () => {
		dispatch(
			updateRaid(raid._id, { ...raid, roster: rosterVal }, setServerResponse),
		);
	};
	useEffect(() => {
		setRosterVal(null);
	}, []);
	return (
		<div>
			{!serverResponse ? (
				<>
					<h4>There is currently no roster assigned.</h4>
					<p>
						To assing a roster that has already been created click the Assign
						roster Button.
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
					<Button color='primary' variant='contained'>
						Go to roster creation
					</Button>
				</>
			) : (
				<LoadingSpinner />
			)}
		</div>
	);
};

export default NoRoster;
