import express from 'express';

import { signin, signup, getUsers, signUpGoogle } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/users', getUsers);
router.post('/google-sign-up', signUpGoogle);

export default router;
