import React, { useState } from 'react';
import {
	Typography,
	TextField,
	Button,
	Grid,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableContainer,
	InputLabel,
	Select,
	MenuItem,
} from '@material-ui/core';
import { useStyles } from '../Form/styles';
import { useSelector } from 'react-redux';

const EditAssignTable = ({
	assignment,
	currentRaider,
	setCurrentRaider,
	newTactics,
	addCharacter,
	updatedAssign,
	setNewTactics,
	setUpdatedAssign,
}) => {
	const classes = useStyles();
	const user = useSelector((state) => state.currentUser);
	const raiders = newTactics.assignedRaiders;

	//Set the redux as well to update the component....

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
							<TableCell className={classes.tableHeaders}>Name</TableCell>
							<TableCell className={classes.tableHeaders} align='right'>
								Target
							</TableCell>
							<TableCell className={classes.tableHeaders} align='right'>
								Role
							</TableCell>
							<TableCell className={classes.tableHeaders} align='right'>
								Notes
							</TableCell>
							{(user.role === 'admin' || user.role === 'moderator') && (
								<>
									<TableCell className={classes.tableHeaders} align='right'>
										Remove
									</TableCell>
									<TableCell className={classes.tableHeaders} align='right'>
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
									className={classes.tableCells}
									component='th'
									scope='row'>
									{raider.name}
								</TableCell>

								<TableCell className={classes.tableCells} align='right'>
									{raider.target}
								</TableCell>
								<TableCell className={classes.tableCells} align='right'>
									{raider.role}
								</TableCell>
								<TableCell className={classes.tableCells} align='right'>
									{raider.notes}
								</TableCell>
								{(user.role === 'admin' || user.role === 'moderator') && (
									<>
										<TableCell className={classes.tableCells} align='right'>
											<Button
												variant='contained'
												color='secondary'
												onClick={() => {
													handleRemove(raider.id);
												}}>
												Remove
											</Button>
										</TableCell>
										<TableCell className={classes.tableCells} align='right'>
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
