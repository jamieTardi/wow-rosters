import mongoose from 'mongoose';

const assignmentSchema = mongoose.Schema({
	assignedRaiders: [Object],
	title: String,
	image: String,
	guild: String,
});

const AssignmentConfig = mongoose.model('PostAssignment', assignmentSchema);

export default AssignmentConfig;
