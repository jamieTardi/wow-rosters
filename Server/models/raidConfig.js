import mongoose from 'mongoose';

const raidSchema = mongoose.Schema({
	title: String,
	message: String,
	creator: String,
	tactics: [Object],
	selectedFile: [String],
	date: String,
	guild: String,
	time: String,
	group: [Object],
	createdAt: {
		type: Date,
		default: new Date(),
	},
	roster: Object,
});

const RaidConfig = mongoose.model('CreatedRaids', raidSchema);

export default RaidConfig;
