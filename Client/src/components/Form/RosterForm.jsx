import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createRoster } from '../../api';
import Roster from '../Roster/Roster';
import { v4 as uuidv4 } from 'uuid';

const RosterForm = ({ selectedRaid, setRaidForm, raidForm }) => {
	const [addCharacter, setAddCharacter] = useState({
		role: '',
		name: '',
		role: '',
		notes: '',
		id: uuidv4(),
	});
	const dispatch = useDispatch();
	const [show, setShow] = useState(true);
	const [title, setTitle] = useState(false);
	const [assignedRoster, setAssignedRoster] = useState([]);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleAddCharacter = () => {
		setAssignedRoster([...assignedRoster, addCharacter]);
		setAddCharacter({
			role: '',
			name: '',
			role: '',
			notes: '',
			id: uuidv4(),
		});
	};

	return (
		<>
			<div className='row'>
				<div className='col-12 w-100'>
					<Form
						className='row'
						onSubmit={(e) => {
							handleAddCharacter(e);
						}}>
						<Form.Select
							aria-label='Default select example'
							className='col-6 container'
							onChange={(e) => {
								setAddCharacter({ ...addCharacter, role: e.target.value });
							}}>
							<option>Select a role</option>
							<option value='Tank'>Tank</option>
							<option value='DPS'>DPS</option>
							<option value='Healer'>Healer</option>
						</Form.Select>
						<Form.Group className='mb-3 col-6' controlId='formBasicEmail'>
							<Form.Label>Character Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Character Name'
								onChange={(e) => {
									setAddCharacter({ ...addCharacter, name: e.target.value });
								}}
							/>
						</Form.Group>

						<Form.Group className='mb-3 col-6' controlId='formBasicPassword'>
							<Form.Label>Class</Form.Label>
							<Form.Control
								type='name'
								placeholder='Warrior, Druid etc'
								onChange={(e) => {
									setAddCharacter({ ...addCharacter, class: e.target.value });
								}}
							/>
						</Form.Group>
						<Form.Group className='mb-3 col-6' controlId='formBasicPassword'>
							<Form.Label>Notes</Form.Label>
							<Form.Control
								type='name'
								placeholder='Leaving early etc..'
								onChange={(e) => {
									setAddCharacter({ ...addCharacter, notes: e.target.value });
								}}
							/>
						</Form.Group>

						<Button
							variant='secondary'
							type='button'
							onClick={handleAddCharacter}>
							Add Character to Roster
						</Button>
					</Form>
				</div>
				<div className='col-12'>
					<Roster
						selectedRaid={selectedRaid}
						setRaidForm={setRaidForm}
						raidForm={raidForm}
						assignedRoster={assignedRoster}
						setAssignedRoster={setAssignedRoster}
					/>
				</div>
			</div>
		</>
	);
};

export default RosterForm;
