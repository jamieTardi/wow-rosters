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
		roster: roster,
		title,
		image,
	});

	try {
		await newRoster.save();
		res.status(201).json(roster);
	} catch (err) {
		res.status(409).json({ message: err });
	}
};
