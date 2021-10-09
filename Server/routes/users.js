import express from 'express';

import {
	signin,
	signup,
	getUsers,
	signUpGoogle,
	updateUser,
} from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/users', getUsers);
router.post('/google-sign-up', signUpGoogle);
router.patch('/users/:id', updateUser);

export default router;
