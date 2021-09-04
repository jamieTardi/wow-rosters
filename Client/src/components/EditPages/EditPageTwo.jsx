import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
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
} from '@material-ui/core';
import { useStyles } from '../Form/styles';
import { classicNameResolver } from 'typescript';

const EditPageTwo = ({ hideModal }) => {
	const classes = useStyles();
	const [show, setShow] = useState(true);
	const raid = useSelector((state) => state.currentRaid);
	console.log(raid.roster);
	return (
		<div>
			<Modal show={show}>
				<Paper className={classes.paperModal}>
					<Grid container spacing={3}>
						<Typography variant='h5'>Edit the current roster</Typography>
						<TableContainer component={Paper}>
							<Table className={classes.table} aria-label='simple table'>
								<TableHead>
									<TableRow>
										<TableCell className={classes.tableHeaders}>Name</TableCell>
										<TableCell className={classes.tableHeaders} align='right'>
											Role
										</TableCell>
										<TableCell className={classes.tableHeaders} align='right'>
											Notes
										</TableCell>
										<TableCell className={classes.tableHeaders} align='right'>
											Remove
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{raid.roster.map((raider) => (
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
												{raider.notes}
											</TableCell>
											<TableCell className={classes.tableCells} align='right'>
												<Button variant='contained' color='secondary'>
													Remove
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>

						<Grid item xs={6}>
							<Button variant='contained' color='primary'>
								Ammend Roster
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button variant='contained' color='secondary'>
								Close
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Modal>
		</div>
	);
};

export default EditPageTwo;
