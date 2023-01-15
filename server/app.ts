import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const app = express();

app.get('/', (req, res) => {
	res.send('Hello, World!');
});

mongoose.connect(process.env.MONGO_URI as any, () => console.log('Connected to MongoDB Database!!'));

app.listen(5000, () => {
	console.log('Server started on port 5000');
});
