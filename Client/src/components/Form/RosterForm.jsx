import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createRoster } from '../../api';
import Roster from '../Roster/Roster';

const RosterForm = () => {
	const [addCharacter, setAddCharacter] = useState({
		role: '',
		name: '',
		role: '',
		notes: '',
	});
	const dispatch = useDispatch();
	const [show, setShow] = useState(true);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [addRoster, setAddRoster] = useState([]);
	const handleAddCharacter = (e) => {
		e.preventDefault();
		setAddRoster([...addRoster, addCharacter]);
	};
	console.log(addRoster);

	return (
		<div className='row'>
			<div className='col-12 col-md-6'>
				<Form
					onSubmit={(e) => {
						handleAddCharacter(e);
					}}>
					<Form.Select
						aria-label='Default select example'
						onChange={(e) => {
							setAddCharacter({ ...addCharacter, role: e.target.value });
						}}>
						<option>Select a role</option>
						<option value='Tank'>Tank</option>
						<option value='DPS'>DPS</option>
						<option value='Healer'>Healer</option>
					</Form.Select>
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label>Character Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Character Name'
							onChange={(e) => {
								setAddCharacter({ ...addCharacter, name: e.target.value });
							}}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label>Class</Form.Label>
						<Form.Control
							type='name'
							placeholder='Warrior, Druid etc'
							onChange={(e) => {
								setAddCharacter({ ...addCharacter, class: e.target.value });
							}}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label>Notes</Form.Label>
						<Form.Control
							type='name'
							placeholder='Leaving early etc..'
							onChange={(e) => {
								setAddCharacter({ ...addCharacter, notes: e.target.value });
							}}
						/>
					</Form.Group>

					<Button variant='primary' type='submit'>
						Add Character to Roster
					</Button>
				</Form>
			</div>
			<div className='col-12 col-md-6'>
				<Roster addRoster={addRoster} />
			</div>
		</div>
	);
};

export default RosterForm;
