import express from 'express';
import { getRaids, createRaid } from '../controllers/raids.js';

const router = express.Router();

router.get('/', getRaids);
router.post('./', createRaid);

export default router;
