import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import raidsRoutes from './routes/raids.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/raids', raidsRoutes);

const CONNECTION_URL =
	'mongodb+srv://JamieTardi:Cheesedog69@cluster0.eh9tx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => app.listen(PORT, () => console.log(`server running on ${PORT}`)))
	.catch((e) => console.log(e));

mongoose.set('useFindAndModify', false);
