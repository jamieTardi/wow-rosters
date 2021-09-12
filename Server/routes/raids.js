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
router.post('/', createRaid);
router.patch('/:id', updateRaid);
router.delete('/:id', deletedRaid);

export default router;
