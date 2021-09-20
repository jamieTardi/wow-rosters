import 'date-fns';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers({ editRaid, setEditRaid }) {
	// The first commit of Material-UI
	const [selectedDate, setSelectedDate] = useState(
		new Date('2014-08-18T21:11:54'),
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
				onChange={handleDateChange}
				KeyboardButtonProps={{
					'aria-label': 'change time',
				}}
			/>
		</MuiPickersUtilsProvider>
	);
}
