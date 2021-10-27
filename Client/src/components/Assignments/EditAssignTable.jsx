import React from 'react';
import {
	Button,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableContainer,
} from '@material-ui/core';
import { useStyles } from '../Form/styles';
import { useSelector } from 'react-redux';

const EditAssignTable = ({
	setCurrentRaider,
	newTactics,
	updatedAssign,
	setUpdatedAssign,
}) => {
	const classes = useStyles();
	const user = useSelector((state) => state.currentUser);
	const darkMode = useSelector((state) => state.darkMode);
	const raiders = newTactics.assignedRaiders;

	const handleRemove = (id) => {
		setUpdatedAssign({
			...updatedAssign,
			assignedRaiders: updatedAssign.assignedRaiders.filter((raider) => {
				return raider.id !== id;
			}),
		});
	};

	const handleEditCharacter = (id) => {
		raiders.map((raider) => {
			if (raider.id === id) {
				setCurrentRaider(raider);
			}
		});
	};

	return (
		<div>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell className={darkMode ? 'text-white' : 'text-dark'}>
								Name
							</TableCell>
							<TableCell
								className={darkMode ? 'text-white' : 'text-dark'}
								align='right'>
								Target
							</TableCell>
							<TableCell
								className={darkMode ? 'text-white' : 'text-dark'}
								align='right'>
								Role
							</TableCell>
							<TableCell
								className={darkMode ? 'text-white' : 'text-dark'}
								align='right'>
								Notes
							</TableCell>
							{(user.role === 'admin' || user.role === 'moderator') && (
								<>
									<TableCell
										className={darkMode ? 'text-white' : 'text-dark'}
										align='right'>
										Remove
									</TableCell>
									<TableCell
										className={darkMode ? 'text-white' : 'text-dark'}
										align='right'>
										Edit
									</TableCell>
								</>
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{updatedAssign?.assignedRaiders.map((raider) => (
							<TableRow key={raider.id}>
								<TableCell
									className={darkMode ? 'text-white' : 'text-dark'}
									component='th'
									scope='row'>
									{raider.name}
								</TableCell>

								<TableCell
									className={darkMode ? 'text-white' : 'text-dark'}
									align='right'>
									{raider.target}
								</TableCell>
								<TableCell
									className={darkMode ? 'text-white' : 'text-dark'}
									align='right'>
									{raider.role}
								</TableCell>
								<TableCell
									className={darkMode ? 'text-white' : 'text-dark'}
									align='right'>
									{raider.notes}
								</TableCell>
								{(user.role === 'admin' || user.role === 'moderator') && (
									<>
										<TableCell
											className={darkMode ? 'text-white' : 'text-dark'}
											align='right'>
											<Button
												variant='contained'
												color='secondary'
												onClick={() => {
													handleRemove(raider.id);
												}}>
												Remove
											</Button>
										</TableCell>
										<TableCell
											className={darkMode ? 'text-white' : 'text-dark'}
											align='right'>
											<Button
												variant='contained'
												color='default'
												onClick={() => {
													handleEditCharacter(raider.id);
												}}>
												Edit
											</Button>
										</TableCell>
									</>
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default EditAssignTable;
