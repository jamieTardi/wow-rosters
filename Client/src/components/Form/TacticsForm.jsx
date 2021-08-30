import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import Assignments from '../Assignments/Assignments';
import { v4 as uuidv4 } from 'uuid';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';

const TacticsForm = ({ raidForm, setRaidForm }) => {
	const [columnSelect, setColoumnSelect] = useState(0);
	const [selectedColumns, setSelectedColumns] = useState([]);
	const dispatch = useDispatch();
	const [tactics, setTactics] = useState({
		image: '',
		assignedRaiders: [],
		id: uuidv4(),
	});
	const [addCharacter, setAddCharacter] = useState({
		role: '',
		name: '',
		target: '',
		notes: '',
		id: uuidv4(),
	});

	const handleAddCharacter = () => {
		setTactics({
			...tactics,
			assignedRaiders: [...tactics.assignedRaiders, addCharacter],
		});
		setAddCharacter({
			role: '',
			name: '',
			target: '',
			notes: '',
			id: uuidv4(),
		});
	};

	const handleSubmit = () => {
		dispatch({ type: 'ADD_ASSIGNMENT', payload: tactics });
		setRaidForm({ ...raidForm, tactics });
	};

	return (
		<div>
			<Form>
				<h3>Assignments Form(optional)</h3>

				<h6>Pick an image for this assignment (optional) </h6>
				<FileBase
					type='file'
					multiple={false}
					onDone={({ base64 }) => setTactics({ ...tactics, image: base64 })}
				/>
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
				<Form.Group className='mb-3 col-12' controlId='formBasicEmail'>
					<Form.Label>Character Name</Form.Label>
					<Form.Control
						type='name'
						value={addCharacter.name}
						placeholder='Character Name'
						onChange={(e) => {
							setAddCharacter({ ...addCharacter, name: e.target.value });
						}}
					/>
				</Form.Group>

				<Form.Group className='mb-3 col-12' controlId='formBasicPassword'>
					<Form.Label>Target</Form.Label>
					<Form.Control
						type='name'
						value={addCharacter.target}
						placeholder='Skull, X etc'
						onChange={(e) => {
							setAddCharacter({ ...addCharacter, target: e.target.value });
						}}
					/>
				</Form.Group>
				<Form.Group className='mb-3 col-12' controlId='formBasicPassword'>
					<Form.Label>Assignment Details</Form.Label>
					<Form.Control
						as='textarea'
						value={addCharacter.notes}
						placeholder='Leaving early etc..'
						onChange={(e) => {
							setAddCharacter({ ...addCharacter, notes: e.target.value });
						}}
					/>
				</Form.Group>

				<Button variant='secondary' type='button' onClick={handleAddCharacter}>
					Add Character to Assignment
				</Button>
				<Assignments tactics={tactics} />
				<Button variant='primary' type='button' onClick={handleSubmit}>
					Submit Table
				</Button>
			</Form>
		</div>
	);
};

export default TacticsForm;
