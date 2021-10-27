import express from 'express';
import {
	getRoster,
	createRoster,
	updateRoster,
	deleteRoster,
} from '../controllers/roster.js';

const router = express.Router();

router.get('/', getRoster);
router.post('/', createRoster);
router.patch('/:id', updateRoster);
router.delete('/:id', deleteRoster);

export default router;
