import mongoose from 'mongoose';

const raidSchema = mongoose.Schema({
	title: String,
	message: String,
	creator: String,
	tactics: [Object],
	selectedFile: [String],
	date: String,
	time: String,
	createdAt: {
		type: Date,
		default: new Date(),
	},
	roster: [Object],
});

const RaidConfig = mongoose.model('PostMessage', raidSchema);

export default RaidConfig;
