import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	root: {
		'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
			borderColor: 'green',
		},
		'&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
			borderColor: 'red',
		},
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
			borderColor: 'purple',
		},
		'& .MuiOutlinedInput-input': {
			color: 'green',
		},
		'& .MuiInputBase-input MuiInput-input': {
			color: '#3dd115',
		},
		'&:hover .MuiOutlinedInput-input': {
			color: 'red',
		},
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
			color: 'purple',
		},
		'& .MuiInputLabel-outlined': {
			color: 'green',
		},
		'&:hover .MuiInputLabel-outlined': {
			color: 'red',
		},
		'& .MuiInputLabel-outlined.Mui-focused': {
			color: 'purple',
		},
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
	cardText: {
		color: 'rgba(255, 255, 255, 0.7)',
	},
	media: {
		height: '200px',
		width: '100%',
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
	drawer: {
		width: '350px',
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: '#424242',
	},
	paperModal: {
		backgroundColor: '#424242',
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	card: {
		background: '#424242',

		width: '345px',
		minHeight: '400px',
	},
	stepper: {
		padding: theme.spacing(3, 0, 5),
	},
	table: {
		background: '#333333',
		color: '#fff',
		fontWeight: 'bolder',
	},
	tableCells: {
		color: '#fff',
	},
	tableHeaders: {
		color: '#fff',
		fontWeight: 'bolder',
	},
	tableLight: {
		background: '#EEF1F4',
		color: 'black',
	},
	tableCellsLight: {
		color: 'black',
	},
	tableHeadersLight: {
		color: 'black',
		fontWeight: 'bolder',
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
		backgroundColor: '#3dd115',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
	select: {
		color: '#fff',
		borderBottomColor: '#fff',
		border: '#fff',
		'& .MuiFormLabel-root': {
			borderBottomColor: '#fff',
			color: '#fff',
		},
	},
	input: {
		color: '#3dd115',

		'& label.Mui-focused': {
			color: 'white',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#3dd115',
		},
		'& .MuiInput-underline:before': {
			borderBottomColor: '#fff',
		},
	},
}));
