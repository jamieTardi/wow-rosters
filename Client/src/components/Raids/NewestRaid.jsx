import React, { useState } from 'react';

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import defaultImg from '../../images/sscImage.jpg';
import DeleteRaid from './DeleteRaid';
import { useStyles } from '../Form/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const NewestRaid = ({ raid, setSelectedRaid, setExpandCard }) => {
	const dispatch = useDispatch();
	const [deleteWarning, setDeleteWarning] = useState(false);

	const handleShowRaid = (raid) => {
		dispatch({ type: 'CURRENT_RAID', payload: raid });
		setSelectedRaid(raid);
		setExpandCard(true);
	};
	const handleDeleteRaid = () => {
		setDeleteWarning(true);
	};
	const classes = useStyles();
	return (
		<div style={{ position: 'relative' }}>
			<Card className={classes.card}>
				<div>
					<div>
						<CardMedia
							variant='top'
							className={classes.media}
							image={
								raid.selectedFile[0] !== '' ? raid.selectedFile[0] : defaultImg
							}
							title='Newest Raid'
						/>

						<CardContent>
							<Typography
								variant='h5'
								style={{ color: 'rgba(255, 255, 255, 0.7) !important' }}>
								{raid.title}
							</Typography>
							<Typography variant='h5'>{raid.name}</Typography>

							<Typography variant='body2' component='p' className='mb-2'>
								<span
									className='clock-icon-span'
									style={{ fontSize: '0.6rem !important' }}>
									<AccessTimeIcon />
								</span>
								<span
									className='ms-1  '
									style={{ color: 'rgba(255, 255, 255, 0.7) !important' }}>
									Raid created {moment(raid.createdAt).fromNow()}{' '}
								</span>
							</Typography>
							<Typography
								variant='body2'
								component='p'
								InputLabelProps={{
									style: { color: 'rgba(255, 255, 255, 0.7) !important ' },
								}}
								className={classes.cardText}>
								{raid.message}
							</Typography>
						</CardContent>
					</div>
					<div style={{ position: 'absolute', bottom: '0%' }}>
						<CardActions className='d-flex justify-content-between w-100'>
							<Button
								size='small'
								color='primary'
								onClick={() => {
									handleShowRaid(raid);
								}}>
								Show Raid Details
							</Button>
							<Button size='small' color='secondary' onClick={handleDeleteRaid}>
								Delete this Raid
							</Button>
						</CardActions>
					</div>
				</div>
			</Card>
			{deleteWarning && (
				<DeleteRaid
					raid={raid}
					deleteWarning={deleteWarning}
					setDeleteWarning={setDeleteWarning}
				/>
			)}
		</div>
	);
};

export default NewestRaid;
