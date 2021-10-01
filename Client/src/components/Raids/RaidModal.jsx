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

const RaidModal = ({ expandCard, setExpandCard, selectedRaid }) => {
	const [editModal, setEditModal] = useState(false);
	const darkMode = useSelector((state) => state.darkMode);

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

	console.log(`${selectedRaid.selectedFile}`);

	return (
		<>
			<div>
				<Modal show={expandCard} size='xl' onHide={() => setExpandCard(false)}>
					<Modal.Header closeButton closeVariant={darkMode ? 'white' : 'dark'}>
						<Modal.Title>{selectedRaid.title}</Modal.Title>
						<Button
							variant='outlined'
							color='primary'
							className='edit ms-4'
							onClick={() => {
								setEditModal((prev) => !prev);
							}}
							startIcon={<EditIcon />}>
							Edit
						</Button>
					</Modal.Header>
					<div
						style={{
							backgroundImage: `url(${selectedRaid.selectedFile})`,
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
								Raid created {moment(selectedRaid.createdAt).fromNow()}
							</div>
							<div className='col-6 text-end'></div>
						</div>
						<div className='row'>
							<div className='col-6'>Raid Date: {dateFormatter()}</div>
							<div className='col-6 text-end'>
								Time of Raid: {selectedRaid.time}
							</div>
						</div>
						<div className='d-flex justify-content-end'>
							<span className='mt-3'>
								Created by{' '}
								<span style={{ color: ' rgba(255, 255, 255, 0.7) !important' }}>
									{selectedRaid.creator}
								</span>
							</span>
						</div>
						<div>
							<h3>Raid Information</h3>
							<p>{selectedRaid.message}</p>
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
