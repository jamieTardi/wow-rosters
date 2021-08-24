import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import FileBase from 'react-file-base64';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { createRaid } from '../../actions/raids';

const RaidForm = ({ raidModalShow, setRaidModalShow }) => {
	const [startDate, setStartDate] = useState(new Date());

	const [raidForm, setRaidForm] = useState({
		title: '',
		message: '',
		creator: '',
		raiders: [],
		selectedFile: [],
		time: '',
		date: '',
		roster: [],
	});
	const dispatch = useDispatch();
	const handleClose = () => setRaidModalShow(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('form submitted');

		dispatch(createRaid(raidForm));
	};

	return (
		<>
			<Modal show={raidModalShow} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Create a new raid</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form
						onSubmit={(e) => {
							handleSubmit(e);
						}}>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Name of Raid</Form.Label>
							<Form.Control
								type='name'
								placeholder='Gruul etc'
								onChange={(e) => {
									setRaidForm({ ...raidForm, title: e.target.value });
								}}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Date of raid commencing</Form.Label>
							<DatePicker
								selected={startDate}
								onChange={(date) =>
									setRaidForm({ ...raidForm, date: date.toString() })
								}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Time of raid commencing</Form.Label>
							<Form.Control
								type='name'
								placeholder='20:30 ST etc'
								onChange={(e) => {
									setRaidForm({ ...raidForm, time: e.target.value });
								}}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Author</Form.Label>
							<Form.Control
								type='name'
								placeholder='Jeco etc'
								onChange={(e) => {
									setRaidForm({ ...raidForm, creator: e.target.value });
								}}
							/>
						</Form.Group>
						<Form.Group
							className='mb-3'
							controlId='exampleForm.ControlTextarea1'>
							<Form.Label>Additional information</Form.Label>
							<Form.Control
								as='textarea'
								rows={5}
								placeholder='Enter any raid specfic info here'
								onChange={(e) => {
									setRaidForm({ ...raidForm, message: e.target.value });
								}}
							/>
						</Form.Group>

						<Form.Group controlId='formFile' className='mb-3'>
							<Form.Label>Please select some images to upload</Form.Label>
							<FileBase
								type='file'
								multiple={false}
								onDone={({ base64 }) =>
									setRaidForm({ ...raidForm, selectedFile: base64 })
								}
							/>
						</Form.Group>
						<Button variant='primary' type='submit'>
							Create Raid
						</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
				<div></div>
			</Modal>
		</>
	);
};

export default RaidForm;
