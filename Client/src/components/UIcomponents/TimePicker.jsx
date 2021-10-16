import 'date-fns';
import React, { useState } from 'react';
import { useStyles } from '../Form/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers({ editRaid, setEditRaid }) {
	const classes = useStyles();
	const [selectedDate, setSelectedDate] = useState(
		new Date('2021-08-18T20:30:00'),
	);

	const handleDateChange = (date) => {
		setSelectedDate(date);
		let hours = date?.getHours().toString();
		let minutes = date?.getMinutes().toString();
		let newTime = hours + ':' + minutes;
		setEditRaid({ ...editRaid, time: newTime });
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardTimePicker
				margin='normal'
				id='time-picker'
				label='Set a time for the raid'
				value={selectedDate}
				className={classes.input}
				onChange={handleDateChange}
				KeyboardButtonProps={{
					'aria-label': 'change time',
				}}
			/>
		</MuiPickersUtilsProvider>
	);
}
