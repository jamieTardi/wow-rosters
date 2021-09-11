import React, { useState } from 'react';
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

import useStyles from './styles';
import Input from './Input';

const Auth = () => {
	const classes = useStyles();
	const [isSignUp, setIsSignUp] = useState(false);
	const [showPassword, setShowpassword] = useState(false);

	const handleSubmit = () => {};
	const handleChange = () => {};
	const handleShowPassword = () => {
		setShowpassword((prev) => !prev);
	};
	const switchMode = () => {
		setIsSignUp((prev) => !prev);
		handleShowPassword(false);
	};
	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlineIcon />
				</Avatar>
				<Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
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
							<Input name='confirmPassword' label='Repeat password' />
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
