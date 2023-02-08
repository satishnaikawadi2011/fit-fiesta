import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { errorHandler, notFoundRoute } from './middlewares/errorHandlers';
dotenv.config();

import userRouter from './routes/user';
import postRouter from './routes/post';
import groupRouter from './routes/group';
import resourceRouter from './routes/resource';
import fileRouter from './routes/file';
import eventRouter from './routes/event';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/group', groupRouter);
app.use('/api/resource', resourceRouter);
app.use('/api/file', fileRouter);
app.use('/api/event', eventRouter);

app.get('/', (req, res) => {
	res.send('Hello, World!');
});

mongoose.connect(process.env.MONGO_URI as any, () => console.log('Connected to MongoDB Database!!'));

app.use(notFoundRoute);

app.use(errorHandler);

const server = require('http').Server(app);
export const io = require('socket.io')(server, {
	cors:
		{
			origin: '*'
		}
});

server.listen(5000, () => {
	console.log('Server started on port 5000');
});
