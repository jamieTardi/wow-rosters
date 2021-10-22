import guildConfig from '../models/guildConfig.js';
import mongoose from 'mongoose';

export const getGuilds = async (req, res) => {
	try {
		const GuildConfig = await guildConfig.find();
		res.status(200).json(GuildConfig);
	} catch (err) {
		res.status(404).json({ message: err });
	}
};

export const createGuild = async (req, res) => {
	const guildDetails = req.body;
	let { name } = req.body;
	let { realm } = req.body;
	const existingName = await guildConfig.findOne({ name });
	const existingRealm = await guildConfig.findOne({ realm });
	let existingGuild = false;

	if (existingName && existingRealm) {
		existingGuild = true;
	}

	try {
		if (!existingGuild) {
			const newGuild = new guildConfig({
				...guildDetails,
			});
			await newGuild.save();
			res.status(201).json(guildDetails);
		} else {
			return res.status(403).json({
				message:
					'Guild already exists on this realm. Please check the details and try again!',
			});
		}
	} catch (err) {
		return res.status(404).json({ message: 'Something went wrong' });
	}
};

export const updateGuild = async (req, res) => {
	const guildId = req.body._id;
	const guildDetails = req.body;
	if (!mongoose.Types.ObjectId.isValid(guildId)) {
		return res.status(404).send('No Guild with that id');
	}
	try {
		const updateGuild = await guildConfig.findByIdAndUpdate(guildId, {
			...guildDetails,
		});
		res.status(201).json(updateGuild);
	} catch (err) {
		res.status(400).json({ message: 'There was a problem with this request' });
	}
};
