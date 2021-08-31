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
import { makeStyles } from '@material-ui/core/styles';
import {
	Stepper,
	Step,
	StepLabel,
	Button,
	Typography,
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

	const [isLoading, setIsLoading] = useState(false);
	const [pageNum, setPageNum] = useState(1);
	const [activeStep, setActiveStep] = useState(0);
	const [raidForm, setRaidForm] = useState({
		title: '',
		message: '',
		creator: '',
		tactics: [],
		selectedFile: [],
		time: '',
		date: '',
		roster: [],
	});
	const classes = useStyles();
	const dispatch = useDispatch();
	const handleClose = () => dispatch({ type: 'HIDE_RAID_MODAL' });

	const steps = ['Initial Raid Set up', 'Roster Set up', 'Assignments'];

	const handleSubmit = () => {
		console.log('form submitted');

		dispatch(createRaid(raidForm));
		setRaidForm({
			title: '',
			message: '',
			creator: '',
			tactics: [],
			selectedFile: [],
			time: '',
			date: '',
			roster: [],
		});
	};

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
				return <RaidPageOne setRaidForm={setRaidForm} raidForm={raidForm} />;
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
		<>
			<Modal show={showRaid} onHide={handleClose} size='lg'>
				<Modal.Header closeButton>
					<Modal.Title>Create a new raid</Modal.Title>
				</Modal.Header>
				<Stepper activeStep={pageNum} className={classes.stepper}>
					{steps.map((label) => (
						<Step className={classes.stepLabel} key={label}>
							<StepLabel className={classes.stepLabel}>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				<Modal.Body>
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
											startIcon={<CloudUploadIcon />}
											className={classes.button}
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
				</Modal.Body>
			</Modal>
		</>
	);
};

export default RaidForm;
