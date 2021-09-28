import express from 'express';

import multer from 'multer';
import fs from 'fs';
import { promisify } from 'util';
import { Stream } from 'stream';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pipeline = promisify(Stream).pipeline;

const router = express.Router();
const upload = multer();

router.post('/', upload.single('file'), async (req, res, next) => {
	const { file } = req;

	if (file.detectedFileExtension !== '.jpg') {
		next(Error('Invalid File Type!'));
	}

	const fileName =
		'image' + Math.floor(Math.random() * 50000) + file.detectedFileExtension;
	console.log(__dirname);
	try {
		await pipeline(
			file.stream,
			// fs.createWriteStream(dirname(`../Images/${fileName}`)),
		);

		res.send('Image uploaded');
	} catch (err) {
		console.log(err);
	}
});

export default router;
