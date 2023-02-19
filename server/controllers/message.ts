import { io } from './../app';
import { Response } from 'express';
import Message from '../models/Message';
import { validateMessageData } from '../validation/validateMessageData';

export const sendMessage = async (req: any, res: Response) => {
	try {
		const { content, receiver, group } = req.body;

		const errMsg = await validateMessageData(req);
		if (errMsg) {
			return res.status(400).json({ message: errMsg });
		}

		const sender = req.id;

		const message = new Message({ content, receiver, sender, group });
		await message.save();

		io.emit('message', message);

		return res.status(201).json({ message });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};
