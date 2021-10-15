import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import raidsRoutes from './routes/raids.js';
import rosterRoutes from './routes/roster.js';
import userRoutes from './routes/users.js';
import assignmentRoutes from './routes/assignment.js';
import imageRoutes from './routes/images.js';
import { fileURLToPath } from 'url';
import { generateUploadURL } from './middleware/images.js';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/raids', raidsRoutes);
app.use('/roster', rosterRoutes);
app.use('/user', userRoutes);
app.use('/create-assignment', assignmentRoutes);
app.use('/uploads', imageRoutes);
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
	res.send('Hello apis');
});
app.get('/s3Url', async (req, res) => {
	const url = await generateUploadURL();
	res.send({ url });
});

const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT;

mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => app.listen(PORT, () => console.log(`server running on ${PORT}`)))
	.catch((e) => console.log(e));

mongoose.set('useFindAndModify', false);
