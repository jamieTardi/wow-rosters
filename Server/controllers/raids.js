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

export const updateRaid = async (req, res) => {
	const { id: _id } = req.params;
	const raid = req.body;

	if (!mongoose.Types.ObjectId.isValid(_id)) {
		return res.status(404).send('No Raid with that id');
	}

	const updatedRaid = await RaidConfig.findByIdAndUpdate(
		_id,
		{ ...raid, id },
		{ new: true },
	);
	res.json(updatedRaid);
};
