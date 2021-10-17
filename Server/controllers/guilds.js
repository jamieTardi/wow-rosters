import mongoose from 'mongoose';
import guildConfig from '../models/guildConfig.js';

export const getGuilds = async (req, res) => {
	try {
		const GuildConfig = await guildConfig.find();
		res.status(200).json(GuildConfig);
	} catch (err) {
		res.status(404).json({ message: err });
	}
};

export const createGuild = async (req, res) => {
	try {
		console.log(req.body);
	} catch (err) {
		res.status(404).json({ message: err });
	}
};
