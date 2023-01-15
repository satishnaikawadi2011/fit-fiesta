import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { errorHandler, notFoundRoute } from './middlewares/errorHandlers';
dotenv.config();

import userRouter from './routes/user';
import postRouter from './routes/post';

const app = express();

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

app.get('/', (req, res) => {
	res.send('Hello, World!');
});

mongoose.connect(process.env.MONGO_URI as any, () => console.log('Connected to MongoDB Database!!'));

app.use(notFoundRoute);

app.use(errorHandler);

app.listen(5000, () => {
	console.log('Server started on port 5000');
});
