import express from 'express';

import {
	getRaids,
	createRaid,
	updateRaid,
	deletedRaid,
} from '../controllers/raids.js';

const router = express.Router();

router.get('/', getRaids);
router.post('/', createRaid);
router.put('/:id', updateRaid);
router.delete('/:id', deletedRaid);

export default router;
