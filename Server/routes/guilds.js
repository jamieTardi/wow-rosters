import express from 'express';
import { createGuild, getGuilds, updateGuild } from '../controllers/guilds.js';

const router = express();

router.get('/', getGuilds);
router.post('/', createGuild);
router.patch('/:id', updateGuild);

export default router;
