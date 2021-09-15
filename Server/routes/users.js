import express from 'express';

import { signin, signup, getUsers } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/users', getUsers);

export default router;
