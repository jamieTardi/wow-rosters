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
import EditPageOne from '../EditPages/EditPageOne';
import MoreHorizSharpIcon from '@material-ui/icons/MoreHorizSharp';
import TabbedMenu from '../Assignments/TabbedMenu';
import { imageURL } from '../../constants/general';
import CurrentGroup from '../Groups/CurrentGroup';
import PopulatedGroup from '../Groups/PopulatedGroup';

const RaidModal = ({ expandCard, setExpandCard, selectedRaid }) => {
	const [editModal, setEditModal] = useState(false);
	const darkMode = useSelector((state) => state.darkMode);
	const user = useSelector((state) => state.currentUser);
	const currentRaid = useSelector((state) => state.currentRaid);

	const dateFormatter = () => {
		let newYear = [];
		let newMonth = [];
		let newDay = [];

		let newStr = selectedRaid.date.substring(0, 10);
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
						<Modal.Title>{selectedRaid.title}</Modal.Title>
						{(user.role === 'admin' || user.role === 'moderator') && (
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
								selectedRaid.selectedFile[0] !== undefined
									? `url(${selectedRaid.selectedFile})`
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
									{moment(selectedRaid.createdAt).fromNow()}
								</span>
							</div>
							<div className='col-6 text-end'>
								<span>
									<span>Created by: </span>
									<span className='raid-message'>{selectedRaid.creator}</span>
								</span>
							</div>
						</div>
						<div className='row'>
							<div className='col-6'>
								Raid Date:{' '}
								<span className='raid-message'>{dateFormatter()}</span>
							</div>
							<div className='col-6 text-end'>
								Time of Raid:{' '}
								<span className='raid-message'>{selectedRaid.time}</span>
							</div>
						</div>

						<div>
							<h3 className='my-3'>Raid Information</h3>
							<p className='raid-message'>{selectedRaid.message}</p>
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
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey='2'>
									<Accordion.Header>Group Make-up</Accordion.Header>
									<Accordion.Body>
										{user.role === 'admin' || user.role === 'moderator' ? (
											<CurrentGroup />
										) : currentRaid.group.length !== 0 ? (
											<PopulatedGroup />
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
				<EditPageOne setEditModal={setEditModal} selectedRaid={selectedRaid} />
			)}
		</>
	);
};

export default RaidModal;
