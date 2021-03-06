import React, { useState } from 'react';

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import DeleteRaid from './DeleteRaid';
import { useStyles } from '../Form/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import loadingGif from '../../images/loadingGif.gif';

const NewestRaid = ({ raid, setSelectedRaid, setExpandCard }) => {
	const dispatch = useDispatch();
	const [deleteWarning, setDeleteWarning] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const user = useSelector((state) => state.currentUser);

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
						<img
							style={
								loaded
									? { objectFit: 'cover', height: '200px', width: '100%' }
									: { objectFit: 'contain', height: '50px', width: '100%' }
							}
							src={
								loaded
									? raid.selectedFile[0] !== undefined
										? raid.selectedFile[0]
										: 'https://wow-rosters.herokuapp.com/images/image2998.jpg'
									: loadingGif
							}
							onLoad={() => setLoaded(true)}
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
								inputlabelprops={{
									style: { color: 'rgba(255, 255, 255, 0.7) !important ' },
								}}
								className={classes.cardText}>
								{raid.message.substring(0, 150) + '...'}
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
							{(user.role === 'admin' ||
								user.role === 'moderator' ||
								user.role === 'guildMaster') && (
								<Button
									size='small'
									color='secondary'
									onClick={handleDeleteRaid}>
									Delete this Raid
								</Button>
							)}
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
