import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import FileBase from 'react-file-base64';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { createRaid } from '../../actions/raids';
import RaidPageOne from './RaidPageOne';
import RaidPageTwo from './RaidPageTwo';
import RaidPageThree from './RaidPageThree';

const RaidForm = () => {
	const showRaid = useSelector((state) => state.raidModal);

	const [isLoading, setIsLoading] = useState(false);
	const [pageNum, setPageNum] = useState(1);

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
	const handleClose = () => dispatch({ type: 'HIDE_RAID_MODAL' });

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('form submitted');

		dispatch(createRaid(raidForm));
		setRaidForm({
			title: '',
			message: '',
			creator: '',
			raiders: [],
			selectedFile: [],
			time: '',
			date: '',
			roster: [],
		});
	};

	function simulateNetworkRequest() {
		return new Promise((resolve) => setTimeout(resolve, 2000));
	}
	const handleSubmitSucess = () => {
		setIsLoading(true);
		simulateNetworkRequest().then(() => setIsLoading(false));
	};

	return (
		<>
			<Modal show={showRaid} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Create a new raid</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form
						onSubmit={(e) => {
							handleSubmit(e);
						}}>
						{pageNum === 1 ? (
							<RaidPageOne setRaidForm={setRaidForm} raidForm={raidForm} />
						) : pageNum === 2 ? (
							<RaidPageTwo setRaidForm={setRaidForm} raidForm={raidForm} />
						) : (
							<RaidPageThree
								isLoading={isLoading}
								handleSubmitSucess={handleSubmitSucess}
							/>
						)}

						<Button
							variant='primary'
							onClick={() => {
								setPageNum(pageNum + 1);
							}}>
							Next page ➡️
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default RaidForm;
