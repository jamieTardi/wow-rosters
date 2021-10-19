import React, { useState, useEffect } from 'react';
import { Modal, Accordion } from 'react-bootstrap';
import moment from 'moment';
import Roster from '../Roster/Roster';
import Assignment from '../Assignments/Assignments';
import RosterForm from '../Form/RosterForm';
import { useSelector } from 'react-redux';
import AssignRoster from '../Roster/AssignRoster';
import CurrentRoster from '../Roster/CurrentRoster';
import CurrentAssignments from './CurrentAssignments';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddCircle from '@material-ui/icons/AddCircle';
import EditPageOne from '../EditPages/EditPageOne';
import MoreHorizSharpIcon from '@material-ui/icons/MoreHorizSharp';
import TabbedMenu from '../Assignments/TabbedMenu';
import AssignmentSelector from '../Assignments/AssignmentSelector';
import CurrentGroup from '../Groups/CurrentGroup';
import PopulatedGroup from '../Groups/PopulatedGroup';
import { isConstructorDeclaration } from 'typescript';

const RaidModal = ({ expandCard, setExpandCard, raid }) => {
	const [editModal, setEditModal] = useState(false);
	const darkMode = useSelector((state) => state.darkMode);
	const user = useSelector((state) => state.currentUser);
	const currentRaid = useSelector((state) => state.currentRaid);
	const currentUser = useSelector((state) => state.currentUser);
	const raids = useSelector((state) => state.raids);

	const [addAssign, setAddAssign] = useState(false);

	const dateFormatter = () => {
		let newYear = [];
		let newMonth = [];
		let newDay = [];

		let newStr = raid.date.substring(0, 10);
		let splitStr = newStr.split('');
		splitStr.map((number, i) => {
			if (i < 4) {
				newYear.push(number);
			} else if (i > 4 && i < 7) {
				newMonth.push(number);
			} else if (i > 7) {
				newDay.push(number);
			}
		});
		let newDate =
			newDay.join('') + '-' + newMonth.join('') + '-' + newYear.join('');
		return newDate;
	};

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
								Raid created:{' '}
								<span className='raid-message'>
									{moment(currentRaid.createdAt).fromNow()}
								</span>
							</div>
							<div className='col-6 text-end'>
								<span>
									<span>Created by: </span>
									<span className='raid-message'>{currentUser.character}</span>
								</span>
							</div>
						</div>
						<div className='row mt-2'>
							<div className='col-6'>
								Raid Date:{' '}
								<span className='raid-message'>{dateFormatter()}</span>
							</div>
							<div className='col-6 text-end'>
								Time of Raid:{' '}
								<span className='raid-message'>{currentRaid.time}</span>
							</div>
						</div>
						<div className='row mt-2'>
							<div className='col-6'>
								Guild: <span className='raid-message'>{currentRaid.guild}</span>
							</div>
							<div className='col-6 text-end'>
								Realm: <span className='raid-message'>{currentUser.guild}</span>
							</div>
						</div>

						<div>
							<h3 className='my-3'>Raid Information</h3>
							<p className='raid-message'>{currentRaid.message}</p>
						</div>
						<div>
							<div className='my-3'></div>
							<Accordion variant='dark'>
								<Accordion.Item eventKey='0'>
									<Accordion.Header>
										Click to see the weeks roster
									</Accordion.Header>
									<Accordion.Body>
										<CurrentRoster />
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey='1'>
									<Accordion.Header>Raid Assignments</Accordion.Header>
									<Accordion.Body>
										<TabbedMenu />
										<div className='d-flex justify-content-end flex-column align-items-end'>
											{(user.role === 'admin' || user.role === 'moderator') && (
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
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey='2'>
									<Accordion.Header>Group Make-up</Accordion.Header>
									<Accordion.Body>
										{user.role === 'admin' || user.role === 'moderator' ? (
											<CurrentGroup />
										) : currentRaid.group.length !== 0 ? (
											<>
												<h4 className='mb-4'>
													Final group make up for the raid
												</h4>
												<PopulatedGroup />
											</>
										) : (
											<p>
												Currently the groups have not been assigned... please
												contact an officer for more info
											</p>
										)}
									</Accordion.Body>
								</Accordion.Item>
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
