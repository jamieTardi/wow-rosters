import express from 'express';

import { getRaids, createRaid, updateRaid } from '../controllers/raids.js';

const router = express.Router();

router.get('/', getRaids);
router.post('/', createRaid);
router.put('/', updateRaid);

export default router;
