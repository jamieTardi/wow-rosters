import React, { useState, useEffect } from 'react';
import { Table } from '@material-ui/core';
import { useSelector } from 'react-redux';
import {
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Button,
} from '@material-ui/core';
import SelectedRaiders from './SelectedRaiders';
import { v4 as uuidv4 } from 'uuid';

const GroupTable = ({ groupTable }) => {
	const raid = useSelector((state) => state.currentRaid);
	const raiders = raid.roster.roster;
	const numberOfColumns = [];
	let groups = [];
	const [selectedGroups, setSelectedGroups] = useState(groups);
	const [addCharacter, setAddCharacter] = useState({
		name: '',
		group: '',
		id: uuidv4(),
	});

	useEffect(() => {
		for (let i = 0; i < groupTable; i++) {
			numberOfColumns.push(i);
		}

		for (let i = 0; i < numberOfColumns.length; i++) {
			groups.push({ group: i + 1, raider: [], id: uuidv4() });
		}
	}, []);

	const handleAddToTable = () => {
		selectedGroups.forEach((el, i) => {
			if (el.group === addCharacter.group) {
				setSelectedGroups(
					[
						...selectedGroups,
						(selectedGroups[el.group - 1].raider = [
							...selectedGroups[el.group - 1].raider,
							addCharacter,
						]),
					].filter((el, i) => i < selectedGroups.length),
				);
			}
		});
	};

	return (
		<div className='row w-100'>
			<div className='col-6'>
				<FormControl className='w-75'>
					<InputLabel>Raider Name</InputLabel>
					<Select>
						{raiders.map((raider) => (
							<MenuItem
								value={raider.name}
								key={raider._id}
								onClick={() => {
									setAddCharacter({ ...addCharacter, name: raider.name });
								}}>
								{raider.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
			<div className='col-6'>
				<FormControl className='w-75 col-6'>
					<InputLabel>Raider Group</InputLabel>
					<Select>
						{selectedGroups.map((item) => (
							<MenuItem
								value={item.group}
								key={item.id}
								onClick={() => {
									setAddCharacter({ ...addCharacter, group: item.group });
								}}>
								{item.group}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
			<div>
				<Button
					variant='contained'
					color='primary'
					className='my-4'
					onClick={handleAddToTable}>
					Add Raider to Table
				</Button>
			</div>
			<SelectedRaiders
				numberOfColumns={numberOfColumns}
				selectedGroups={selectedGroups}
				setSelectedGroups={setSelectedGroups}
			/>
		</div>
	);
};

export default GroupTable;
