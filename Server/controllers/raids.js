import mongoose from 'mongoose';
import RaidConfig from '../models/raidConfig.js';

export const getRaids = async (req, res) => {
	try {
		const raidConfig = await RaidConfig.find();
		res.status(200).json(raidConfig);
	} catch (e) {
		res.status(404).json({ message: e });
	}
};

export const createRaid = async (req, res) => {
	const raid = req.body;

	const newRaid = new RaidConfig(raid);
	try {
		await newRaid.save();
		res.status(201).json(raid);
	} catch (err) {
		res.status(409).json({ message: err });
	}
};
