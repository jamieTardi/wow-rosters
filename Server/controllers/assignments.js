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
		res.status(201).json(assignment);
	} catch (err) {
		res.status(409).json({ message: err });
	}
};
