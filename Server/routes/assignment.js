import express from 'express';
import { getAssignment, createAssignment } from '../controllers/assignments.js';

const router = express.Router();

router.get('/', getAssignment);
router.post('/', createAssignment);

export default router;
