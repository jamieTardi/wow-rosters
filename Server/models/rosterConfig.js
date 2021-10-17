import mongoose from 'mongoose';

const rosterSchema = mongoose.Schema({
	roster: [Object],
	title: String,
	image: String,
	guild: String,
});

const RosterConfig = mongoose.model('PostRoster', rosterSchema);

export default RosterConfig;
