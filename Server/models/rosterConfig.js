import mongoose from 'mongoose';

const rosterSchema = mongoose.Schema({
	roster: [Array],
});

const RosterConfig = mongoose.model('PostRoster', rosterSchema);

export default RosterConfig;
