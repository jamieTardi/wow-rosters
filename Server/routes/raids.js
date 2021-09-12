import express from 'express';

import {
	getRaids,
	createRaid,
	updateRaid,
	deletedRaid,
} from '../controllers/raids.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getRaids);
router.post('/', auth, createRaid);
router.patch('/:id', auth, updateRaid);
router.delete('/:id', auth, deletedRaid);

export default router;
