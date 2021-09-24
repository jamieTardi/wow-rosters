import express from 'express';
import {
	getRoster,
	createRoster,
	updateRoster,
} from '../controllers/roster.js';

const router = express.Router();

router.get('/', getRoster);
router.post('/', createRoster);
router.patch('/:id', updateRoster);

export default router;
