import express from 'express';
import {
	getAssignment,
	createAssignment,
	updateAssignment,
	deleteAssignment,
} from '../controllers/assignments.js';

const router = express.Router();

router.get('/', getAssignment);
router.post('/', createAssignment);
router.patch('/:id', updateAssignment);
router.delete('/:id', deleteAssignment);

export default router;
