import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';

import CurrentRoster from '../Roster/CurrentRoster';

import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddCircle from '@material-ui/icons/AddCircle';
import EditPageOne from '../EditPages/EditPageOne';

import TabbedMenu from '../Assignments/TabbedMenu';
import AssignmentSelector from '../Assignments/AssignmentSelector';
import CurrentGroup from '../Groups/CurrentGroup';
import PopulatedGroup from '../Groups/PopulatedGroup';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getGuilds } from '../../actions/guilds';

const RaidModal = ({ expandCard, setExpandCard, raid }) => {
	const [editModal, setEditModal] = useState(false);
	const dispatch = useDispatch();
	const darkMode = useSelector((state) => state.darkMode);
	const user = useSelector((state) => state.currentUser);
	const currentRaid = useSelector((state) => state.currentRaid);
	const currentUser = useSelector((state) => state.currentUser);
	const guilds = useSelector((state) => state.guildData);
	const [addAssign, setAddAssign] = useState(false);
	const [userGuild, setUserGuild] = useState(null);

	useEffect(() => {
		if (currentUser && guilds) {
			let filitered = guilds.filter((guild) => {
				return guild.name === user.guild;
			});
			setUserGuild(filitered);
		}
	}, [guilds]);

	useEffect(() => {
		dispatch(getGuilds());
	}, []);

	return (
		<>
			<div>
				<Modal show={expandCard} size='xl' onHide={() => setExpandCard(false)}>
					<Modal.Header closeButton closeVariant={darkMode ? 'white' : 'dark'}>
						<Modal.Title>{currentRaid.title}</Modal.Title>
						{(user.role === 'admin' ||
							user.role === 'moderator' ||
							user.role === 'guildMaster') && (
							<Button
								variant='outlined'
								color='primary'
								className='edit ms-4'
								onClick={() => {
									setEditModal((prev) => !prev);
								}}>
								<EditIcon />
							</Button>
						)}
					</Modal.Header>
					<div
						style={{
							backgroundImage:
								currentRaid.selectedFile[0] !== undefined
									? `url(${currentRaid.selectedFile})`
									: 'url(https://images.blz-contentstack.com/v3/assets/blt3452e3b114fab0cd/blt7e63e962dfb8236b/5dbb292e5b809038b2505c21/Bastion_Postcard.jpg?auto=webp&quality=75)',
							backgroundColor: darkMode ? '#333333' : '#fff',
							width: '100%',
							height: '350px',
							backgroundPosition: 'center',
							backgroundSize: 'contain',
							backgroundRepeat: 'no-repeat',
						}}></div>
					<Modal.Body>
						<div className='row'>
							<div
								className='col-6'
								style={{ color: 'rgba(255, 255, 255, 0.7) !important' }}>
								Raid created: <br />
								<span className='raid-message'>
									{moment(currentRaid.createdAt).fromNow()}
								</span>
							</div>
							<div className='col-6 text-end'>
								<span>
									<span>
										Created by: <br />
									</span>
									<span className='raid-message'>{currentRaid.creator}</span>
								</span>
							</div>
						</div>
						<div className='row mt-2'>
							<div className='col-6'>
								Raid Date: <br />
								<span className='raid-message'>{currentRaid.date}</span>
							</div>
							<div className='col-6 text-end'>
								Time of Raid: <br />
								<span className='raid-message'>{currentRaid.time}</span>
							</div>
						</div>
						<div className='row mt-2'>
							<div className='col-6'>
								Guild: <br />
								<span className='raid-message'>{currentRaid.guild}</span>
							</div>
							<div className='col-6 text-end'>
								Realm: <br />
								<span className='raid-message'>
									{userGuild ? userGuild[0].realm : 'Loading Realm...'}
								</span>
							</div>
						</div>

						<div>
							<h3 className='my-3'>Raid Information</h3>
							<p className='raid-message'>{currentRaid.message}</p>
						</div>
						<div>
							<div className='my-3'></div>
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									sx={{ width: '100%' }}
									aria-controls='panel1a-content'
									id='panel1a-header'>
									<Typography>Roster for Raid</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<CurrentRoster />
								</AccordionDetails>
							</Accordion>

							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls='panel2a-content'
									id='panel2a-header'>
									<Typography>Raid Assignments</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<TabbedMenu />

									<div className='d-flex justify-content-end flex-column align-items-end'>
										{(user.role === 'admin' ||
											user.role === 'moderator' ||
											user.role === 'guildMaster') && (
											<Button
												variant='contained'
												color='default'
												disabled={addAssign}
												onClick={() => {
													setAddAssign((prev) => !prev);
												}}>
												<AddCircle />
											</Button>
										)}
										{addAssign && <AssignmentSelector />}
									</div>
								</AccordionDetails>
							</Accordion>

							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls='panel3a-content'
									id='panel3a-header'>
									<Typography>Group Make-up</Typography>
								</AccordionSummary>
								<AccordionDetails>
									{user.role === 'admin' ||
									user.role === 'moderator' ||
									user.role === 'guildMaster' ? (
										<CurrentGroup />
									) : currentRaid.group.length !== 0 ? (
										<>
											<h4 className='mb-4'>Final group make up for the raid</h4>
											<PopulatedGroup />
										</>
									) : (
										<p>
											Currently the groups have not been assigned... please
											contact an officer for more info
										</p>
									)}
								</AccordionDetails>
							</Accordion>
						</div>
					</Modal.Body>
				</Modal>
			</div>
			{editModal && (
				<EditPageOne setEditModal={setEditModal} selectedRaid={raid} />
			)}
		</>
	);
};

export default RaidModal;
