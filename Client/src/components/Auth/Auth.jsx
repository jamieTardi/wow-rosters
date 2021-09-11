import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { AUTH } from '../../constants/actionTypes';
import { signin, signup } from '../../actions/auth';

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
	const [showPassword, setShowpassword] = useState(false);
	const [formData, setFormData] = useState(initialState);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSignUp) {
			dispatch(signup(formData, history));
		} else {
			dispatch(signin(formData, history));
		}
	};

	// handle multiple inputs form the name
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleShowPassword = () => {
		setShowpassword((prev) => !prev);
	};
	const switchMode = () => {
		setIsSignUp((prev) => !prev);
		handleShowPassword(false);
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
									autoFocus
									half
								/>
								<Input
									name='lastName'
									label='Last Name'
									handleChange={handleChange}
									autoFocus
									half
								/>
							</>
						)}
						<Input
							name='email'
							label='Email address'
							handleChange={handleChange}
							type='email'
							autoFocus
							xs={12}
						/>
						<Input
							name='password'
							label='Password'
							handleChange={handleChange}
							type={showPassword ? 'text' : 'password'}
							handleShowPassword={handleShowPassword}
							autoFocus
							xs={12}
						/>
						{isSignUp && (
							<Input
								name='confirmPassword'
								label='Repeat password'
								handleChange={handleChange}
							/>
						)}
					</Grid>

					<Button
						type='submit'
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
									: 'Dont have an account? Sign Up'}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
