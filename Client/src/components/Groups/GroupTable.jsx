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

	console.log(selectedGroups);

	return (
		<div>
			{numberOfColumns.length === 0 && (
				<FormControl className='w-50'>
					<InputLabel>Select the number of columns</InputLabel>
					<Select>
						{numberOfColumns.map((item) => (
							<MenuItem value={item} key={item}>
								{++item}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}

			<FormControl className='w-50'>
				<InputLabel>Select the raider to add</InputLabel>
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
			<div>
				<FormControl className='w-50'>
					<InputLabel>Select the group to add the raider too</InputLabel>
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
