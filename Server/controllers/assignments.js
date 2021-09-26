import mongoose from 'mongoose';
import AssignmentConfig from '../models/assignmentConfig.js';

export const getAssignment = async (req, res) => {
	try {
		const assignmentConfig = await AssignmentConfig.find();
		res.status(200).json(assignmentConfig);
	} catch (e) {
		res.status(404).json({ message: e });
	}
};

export const createAssignment = async (req, res) => {
	const assignment = req.body;

	const newAssignment = new AssignmentConfig({
		...assignment,
	});

	try {
		await newAssignment.save();
		res.status(201).json(newAssignment);
	} catch (err) {
		res.status(409).json({ message: err });
	}
};

export const updateAssignment = async (req, res) => {
	const id = req.body._id;
	const assignment = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return console.log(`This ${id} is not in the DB`);
	}

	try {
		const updatedAssignment = await AssignmentConfig.findByIdAndUpdate(id, {
			id,
			...assignment,
		});
		res.json(updatedAssignment);
	} catch (err) {
		console.log(err);
	}
};

export const deleteAssignment = async (req, res) => {
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return console.log(`This ID is not in the Database. Please Check again!`);
	}

	try {
		const deleteAssign = await AssignmentConfig.findByIdAndDelete(id);
		res.json(deleteAssign);
	} catch (err) {
		console.log(err);
	}
};
