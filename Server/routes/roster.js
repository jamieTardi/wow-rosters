import express from 'express';
import { getRoster, createRoster } from '../controllers/roster.js';

const router = express.Router();

router.get('/', getRoster);
router.post('/', createRoster);

export default router;
