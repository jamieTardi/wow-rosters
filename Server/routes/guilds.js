import express from 'express';
import { createGuild, getGuilds } from '../controllers/guilds.js';

const router = express();

router.get('/', getGuilds);
router.post('/', createGuild);

export default router;
