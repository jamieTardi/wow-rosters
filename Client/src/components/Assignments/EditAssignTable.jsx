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

const EditAssignTable = ({
	assignment,
	currentRaider,
	setCurrentRaider,
	newTactics,
	addCharacter,
}) => {
	const classes = useStyles();

	const raiders = newTactics.assignedRaiders;

	const handleRemove = () => {};

	const handleEditCharacter = (id) => {
		raiders.map((raider) => {
			if (raider.id === id) {
				setCurrentRaider(raider);
			}
		});
	};

	const handleAmmendRaider = () => {
		const updatedRaiders = raiders.map((raider) =>
			raider.id === currentRaider.id ? currentRaider : raider,
		);
	};

	return (
		<div>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell className={classes.tableHeaders}>Name</TableCell>
							<TableCell className={classes.tableHeaders} align='right'>
								Class
							</TableCell>
							<TableCell className={classes.tableHeaders} align='right'>
								Role
							</TableCell>
							<TableCell className={classes.tableHeaders} align='right'>
								Notes
							</TableCell>
							<TableCell className={classes.tableHeaders} align='right'>
								Remove
							</TableCell>
							<TableCell className={classes.tableHeaders} align='right'>
								Edit
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{addCharacter.map((raider) => (
							<TableRow key={raider.id}>
								<TableCell
									className={classes.tableCells}
									component='th'
									scope='row'>
									{raider.name}
								</TableCell>

								<TableCell className={classes.tableCells} align='right'>
									{raider.class}
								</TableCell>
								<TableCell className={classes.tableCells} align='right'>
									{raider.role}
								</TableCell>
								<TableCell className={classes.tableCells} align='right'>
									{raider.notes}
								</TableCell>
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
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default EditAssignTable;
