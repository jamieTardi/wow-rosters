import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import FileBase from 'react-file-base64';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { createRaid } from '../../actions/raids';
import RaidPageOne from './RaidPageOne';
import RaidPageTwo from './RaidPageTwo';
import RaidPageThree from './RaidPageThree';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
	Stepper,
	Step,
	StepLabel,
	Button,
	Typography,
	CircularProgress,
} from '@material-ui/core';

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
		background: '#333333',
		color: 'white',
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
	stepLabel: {
		color: '#fff',
	},
}));

const RaidForm = () => {
	const showRaid = useSelector((state) => state.raidModal);
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(false);
	const [pageNum, setPageNum] = useState(0);
	const [activeStep, setActiveStep] = useState(0);
	const [raidHour, setRaidHour] = useState('00');
	const [raidMinute, setRaidMinute] = useState('00');
	const [raidForm, setRaidForm] = useState({
		title: '',
		message: '',
		tactics: [],
		selectedFile: [],
		time: raidHour + ':' + raidMinute,
		date: '',
		roster: [],
	});

	const [raidCreateRes, setRaidCreateRes] = useState('');
	const classes = useStyles();
	const dispatch = useDispatch();
	const handleClose = () => dispatch({ type: 'HIDE_RAID_MODAL' });

	const steps = ['Initial Raid Set up', 'Roster Set up', 'Assignments'];
	const user = JSON.parse(localStorage.getItem('profile'));

	const handleSubmit = () => {
		setIsLoading(true);

		dispatch(createRaid({ ...raidForm, creator: user.result.name }));
		setRaidForm({
			title: '',
			message: '',
			group: [],
			tactics: [],
			selectedFile: [],
			time: '',
			date: '',
			roster: [],
		});
		history.push('/');
	};

	if (!user?.result?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant='h6' align='center'>
					Please sign in to create a raid
				</Typography>
			</Paper>
		);
	}

	function simulateNetworkRequest() {
		return new Promise((resolve) => setTimeout(resolve, 2000));
	}
	const handleSubmitSucess = () => {
		setIsLoading(true);

		simulateNetworkRequest().then(() => setIsLoading(false));
	};

	function getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<RaidPageOne
						setRaidForm={setRaidForm}
						raidForm={raidForm}
						setRaidMinute={setRaidMinute}
						setRaidHour={setRaidHour}
						raidHour={raidHour}
						raidMinute={raidMinute}
					/>
				);
			case 1:
				return <RaidPageTwo setRaidForm={setRaidForm} raidForm={raidForm} />;
			case 2:
				return (
					<RaidPageThree
						isLoading={isLoading}
						handleSubmitSucess={handleSubmitSucess}
						raidForm={raidForm}
						setRaidForm={setRaidForm}
					/>
				);
			default:
				throw new Error('Unknown step');
		}
	}

	return (
		<Container maxWidth='sm'>
			<Paper className={classes.paper}>
				<Typography variant='h3'>Create a new raid</Typography>

				<Stepper activeStep={pageNum} className={classes.stepper}>
					{steps.map((label) => (
						<Step className={classes.stepLabel} key={label}>
							<StepLabel className={classes.stepLabel}>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				<div>
					<form
						className={classes.root}
						onSubmit={(e) => {
							handleSubmit(e);
						}}>
						{activeStep === steps.length ? (
							<>Create me</>
						) : (
							<>
								{getStepContent(pageNum)}
								<div className={classes.buttons}>
									{pageNum !== 0 && (
										<Button
											onClick={() => {
												setPageNum(pageNum - 1);
											}}
											color='default'
											variant='contained'
											className={classes.button}>
											Back
										</Button>
									)}

									{pageNum === steps.length - 1 ? (
										<Button
											variant='contained'
											color='primary'
											startIcon={
												!isLoading ? (
													<CloudUploadIcon />
												) : (
													<CircularProgress size='1rem' />
												)
											}
											className={classes.button}
											disabled={isLoading}
											onClick={handleSubmit}>
											Create Raid
										</Button>
									) : (
										<Button
											variant='contained'
											color='primary'
											onClick={() => {
												setPageNum(pageNum + 1);
											}}
											className={classes.button}>
											Next
										</Button>
									)}
								</div>
							</>
						)}
					</form>
				</div>
			</Paper>
		</Container>
	);
};

export default RaidForm;
