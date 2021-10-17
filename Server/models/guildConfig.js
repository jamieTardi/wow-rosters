import mongoose from 'mongoose';

const guildSchema = mongoose.Schema({
	name: { type: String },
	image: { type: String },
	realm: { type: String },
	faction: { type: String },
	region: { type: String },
	members: { type: Array },
	info: { type: String },
});

const guildConfig = mongoose.model('Guilds', guildSchema);

export default guildConfig;
