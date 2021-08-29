import React from 'react';
import { Modal, Accordion } from 'react-bootstrap';
import moment from 'moment';
import Roster from '../Roster/Roster';
import Assignment from '../Assignments/Assignments';
import RosterForm from '../Form/RosterForm';
import { useSelector } from 'react-redux';
import AssignRoster from '../Roster/AssignRoster';
import CurrentRoster from '../Roster/CurrentRoster';

const RaidModal = ({ expandCard, setExpandCard, selectedRaid }) => {
	return (
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
									<Assignment />
								</Accordion.Body>
							</Accordion.Item>
						</Accordion>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default RaidModal;
