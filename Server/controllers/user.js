import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from '../models/user.js';
import User from '../models/user.js';

export const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser)
			return res.status(404).json({ message: "User dosen't exist" });

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password,
		);

		if (!isPasswordCorrect)
			return res.status(400).json({ message: 'Invalid Details.' });

		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			'test',
			{ expiresIn: '1h' },
		);
		res.status(200).json({ result: existingUser, token });
	} catch (err) {
		res.status(500).json({ message: 'Something went wrong.' });
	}
};

export const signup = async (req, res) => {
	const { email, password, firstName, lastName, confirmPassword } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res.status(400).json({ message: 'User already exist' });
		if (password !== confirmPassword)
			return res.status(400).json({ message: 'Passwords do not match.' });
		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await User.create({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
		});
		// test arg is client secret
		const token = jwt.sign({ email: result.email, id: result._id }, 'test', {
			expiresIn: '1h',
		});

		res.status(200).json({ result: result, token });
	} catch (err) {
		// res.status(500).json({ message: 'Something went wrong.' });
		console.log(err);
	}
};

export const getUsers = async (req, res) => {
	try {
		const userConfig = await user.find();
		res.status(200).json(userConfig);
	} catch (e) {
		res.status(404).json({ message: e });
	}
};

export const signUpGoogle = async (req, res) => {
	const { name, email, id, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res.status(400).json({ message: 'User already exist' });
		const hashedPassword = await bcrypt.hash(password, 12);
		const result = await User.create({
			email,
			id,
			name,
			password: hashedPassword,
		});
		res.status(200).json({ result });
	} catch (err) {
		console.log(err);
	}
};

export const updateUser = async (req, res) => {
	const { _id: id, email, role } = req.body;
	const body = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			if (role === 'admin') {
				res.status(403).json({
					message: 'This user is an admin they cannot be altered.',
				});
			} else {
				const updateUser = await User.findByIdAndUpdate(id, {
					...body,
					role: 'moderator',
				});
				res.status(200).json(updateUser);
			}
		} else {
			res.status(404).json({ message: 'There was no user found.' });
		}
	} catch (err) {
		res.status(404).json({ message: 'Something went wrong' });
	}
};
