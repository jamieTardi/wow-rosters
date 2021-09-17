import mongoose from 'mongoose';

const rosterSchema = mongoose.Schema({
	roster: [Object],
});

const RosterConfig = mongoose.model('PostRoster', rosterSchema);

export default RosterConfig;
