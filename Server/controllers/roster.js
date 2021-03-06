import mongoose from 'mongoose';
import RosterConfig from '../models/rosterConfig.js';

export const getRoster = async (req, res) => {
	try {
		const rosterConfig = await RosterConfig.find();
		res.status(200).json(rosterConfig);
	} catch (e) {
		res.status(404).json({ message: e });
	}
};

export const createRoster = async (req, res) => {
	const roster = req.body;

	const newRoster = new RosterConfig({
		...roster,
	});

	try {
		await newRoster.save();
		res.status(201).json(roster);
	} catch (err) {
		res.status(409).json({ message: err });
	}
};

export const updateRoster = async (req, res) => {
	const id = req.body._id;

	const roster = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send('No Roster with that id');
	}

	const updatedRoster = await RosterConfig.findByIdAndUpdate(id, {
		...roster,
		id,
	});

	res.json(updatedRoster);
};

export const deleteRoster = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send('No Roster with that id');
	}
	try {
		await RosterConfig.findByIdAndDelete(id);
		res.status(204).json({ message: 'Roster deleted correctly.' });
	} catch (err) {
		res.status(404).json({ message: err });
	}
};
