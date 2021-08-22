import mongoose from 'mongoose';

const raidSchema = mongoose.Schema({
	title: String,
	message: String,
	creator: String,
	raiders: [String],
	selectedFile: [String],
	date: String,
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const RaidConfig = mongoose.model('PostMessage', raidSchema);

export default RaidConfig;
