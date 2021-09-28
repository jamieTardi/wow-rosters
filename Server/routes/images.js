import express from 'express';

import multer from 'multer';
import fs from 'fs';
import { promisify } from 'util';
import stream from 'stream';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pipeline = promisify(stream.pipeline);

const router = express.Router();
const upload = multer();

router.post('/', upload.single('file'), async (req, res, next) => {
	const { file } = req;

	if (file.detectedFileExtension !== '.jpg') {
		next(Error('Invalid File Type!'));
	}

	const fileName =
		'image' + Math.floor(Math.random() * 50000) + file.detectedFileExtension;

	try {
		await pipeline(
			file.stream,
			fs.createWriteStream(`${__dirname}/../public/images/${fileName}`),
		);
		res.send(fileName);
	} catch (err) {
		console.log(err);
	}
});

router.delete('/', async (req, res) => {
	const imageDelete = req.body.image;
	try {
		fs.unlink(`${__dirname}/../public/images/${imageDelete}`, (err) => {
			if (err) console.log(err);
			else {
				console.log(`\nDeleted file: ${imageDelete}`);
			}
		});
		res.json('Image has been deleted');
	} catch (err) {
		console.log(err);
	}
});

export default router;
