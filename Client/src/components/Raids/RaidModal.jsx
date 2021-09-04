import React, { useState } from 'react';
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

const RaidModal = ({ expandCard, setExpandCard, selectedRaid }) => {
	const [editModal, setEditModal] = useState(false);
	console.log(editModal);
	return (
		<>
			<div>
				<Modal show={expandCard} size='xl' onHide={() => setExpandCard(false)}>
					<Modal.Header closeButton variant='white'>
						<Modal.Title>{selectedRaid.title}</Modal.Title>
					</Modal.Header>

					<img
						src={selectedRaid.selectedFile[0]}
						alt='raid-image'
						style={{ height: '350px', objectFit: 'contain' }}
					/>

					<Modal.Body>
						<div className='row'>
							<div className='col-6'>
								Raid created {moment(selectedRaid.createdAt).fromNow()}
							</div>
							<div className='col-6 text-end'>
								Created by {selectedRaid.creator}
							</div>
						</div>
						<div>
							<h3>Raid Information</h3>
							<p>{selectedRaid.message}</p>
						</div>
						<div>
							<div className='my-3'>
								<Button
									variant='contained'
									onClick={() => {
										setEditModal((prev) => !prev);
									}}
									color='primary'>
									<EditIcon />
								</Button>
							</div>
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
										<CurrentAssignments selectedRaid={selectedRaid} />
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
