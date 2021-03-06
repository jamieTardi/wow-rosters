import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useStyles } from '../Form/styles';

const Input = ({
	half,
	handleChange,
	label,
	name,
	autoFocus,
	type,
	handleShowPassword,
}) => {
	const classes = useStyles();
	return (
		<div>
			<Grid item xs={12} sm={half ? 6 : 12}>
				<TextField
					name={name}
					onChange={handleChange}
					required
					fullWidth
					label={label}
					autoFocus={autoFocus}
					className={classes.input}
					type={type}
					InputProps={
						name === 'password'
							? {
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton onClick={handleShowPassword}>
												{' '}
												{type === 'password' ? (
													<Visibility />
												) : (
													<VisibilityOff />
												)}
											</IconButton>
										</InputAdornment>
									),
							  }
							: null
					}
				/>
			</Grid>
		</div>
	);
};

export default Input;
