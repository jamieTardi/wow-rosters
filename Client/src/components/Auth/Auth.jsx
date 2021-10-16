import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import {
	Avatar,
	Button,
	Paper,
	Grid,
	Typography,
	Container,
	TextField,
} from '@material-ui/core';
import LockOutlineIcon from '@material-ui/icons/LockOpenOutlined';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH, CLEAR_ERROR } from '../../constants/actionTypes';
import { signin, signup } from '../../actions/auth';
import validator from 'validator';

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const Auth = () => {
	const history = useHistory();
	const classes = useStyles();
	const [isSignUp, setIsSignUp] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [invalidInput, setInvalidInput] = useState({
		firstName: false,
		lastName: false,
		email: false,
	});
	const [formData, setFormData] = useState(initialState);
	const dispatch = useDispatch();
	const newError = useSelector((state) => state.errorMessage);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSignUp) {
			dispatch(signup(formData, history));
			dispatch({ type: CLEAR_ERROR });
		} else {
			dispatch(signin(formData, history));
		}
	};

	// handle multiple inputs form the name
	const handleChange = (e) => {
		let name = e.target.name;
		let email = e.target.value;

		if (name === 'email') {
			if (!validator.isEmail(email)) {
				setInvalidInput({ ...invalidInput, email: true });
			} else {
				setInvalidInput({ ...invalidInput, email: false });
			}
		}
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (formData.firstName !== '' || formData.lastName !== '') {
			let regex = /[ `!@#$£%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
			setInvalidInput({ ...invalidInput, firstName: false, lastName: false });
			if (regex.test(formData.firstName)) {
				setInvalidInput({ ...invalidInput, firstName: true });
			} else if (regex.test(formData.lastName)) {
				setInvalidInput({ ...invalidInput, lastName: true });
			} else {
				setInvalidInput({ ...invalidInput, firstName: false, lastName: false });
			}
		}
	}, [formData]);

	const handleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};
	const switchMode = () => {
		setIsSignUp((prev) => !prev);
		setShowPassword(false);
	};

	const googleSuccess = async (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;
		try {
			dispatch({ type: AUTH, data: { result, token } });
			history.push('/');
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		dispatch({ type: CLEAR_ERROR });
	}, []);

	const googleFailure = () => {
		console.log('Google sign in failure');
	};
	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlineIcon />
				</Avatar>
				<Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
				<form
					className={classes.form}
					onSubmit={(e) => {
						handleSubmit(e);
					}}>
					<Grid spacing={3}>
						{isSignUp && (
							<>
								<Input
									name='firstName'
									label='First Name'
									handleChange={handleChange}
									className={classes.input}
									autoFocus
									half
								/>
								{invalidInput.firstName && (
									<p
										style={{ fontSize: '0.8rem' }}
										className='mt-2 mb-0 text-danger'>
										This first name is invalid
									</p>
								)}
								<Input
									name='lastName'
									label='Last Name'
									handleChange={handleChange}
									className={classes.input}
									half
								/>
								{invalidInput.lastName && (
									<p
										className='mt-2 mb-0 text-danger'
										style={{ fontSize: '0.8rem' }}>
										This last name is invalid
									</p>
								)}
							</>
						)}
						<Input
							name='email'
							label='Email address'
							autoFocus={!isSignUp}
							handleChange={handleChange}
							type='email'
							xs={12}
						/>
						{invalidInput.email && (
							<p className='text-danger mt-2' style={{ fontSize: '0.8rem' }}>
								This email is invalid, please enter another.
							</p>
						)}
						<Input
							name='password'
							label='Password'
							handleChange={handleChange}
							type={showPassword ? 'text' : 'password'}
							handleShowPassword={handleShowPassword}
							xs={12}
						/>
						{isSignUp && (
							<Input
								name='confirmPassword'
								label='Repeat password'
								handleChange={handleChange}
								type={showPassword ? 'text' : 'password'}
								handleShowPassword={handleShowPassword}
							/>
						)}
					</Grid>
					{newError && <p className='mt-2 mb-0 text-danger'>{newError}</p>}
					<Button
						type='submit'
						disabled={
							invalidInput.firstName ||
							invalidInput.lastName ||
							invalidInput.email
						}
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						{isSignUp ? 'Sign Up' : 'Sign In'}
					</Button>
					<GoogleLogin
						clientId='83904683432-mlllotpibgt4uai6nokoq204ossj97q0.apps.googleusercontent.com'
						onSuccess={googleSuccess}
						onFailure={googleFailure}
						cookiePolicy='single_host_origin'
						render={(render) => (
							<Button
								className={classes.googleButton}
								color='primary'
								fullWidth
								onClick={render.onClick}
								disabled={render.disabled}
								startIcon={<Icon />}
								variant='contained'>
								Google Sign In
							</Button>
						)}
					/>
					<Grid container justify='flex-end'>
						<Grid item>
							<Button onClick={switchMode} variant='contained' color='default'>
								{isSignUp
									? 'Already have an account? Sign In'
									: "Don't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
