import { isValidObjectId } from './../utils/isValidId';
import { io } from './../app';
import { Response } from 'express';
import Message, { IMessage } from '../models/Message';
import { validateMessageData } from '../validation/validateMessageData';
import Group from '../models/Group';

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

export const getMessages = async (req: any, res: Response) => {
	try {
		const { receiver, group } = req.query;
		const page = req.query.page || 1;
		const limit = req.query.limit || 10;
		const skip = (page - 1) * limit;
		const sender = req.id;
		let messages: IMessage[] = [];
		if (group) {
			if (!isValidObjectId(group)) {
				return res.status(400).json({ message: 'Please provide valid objectId of group' });
			}

			const grp = await Group.findById(group);
			if (!grp) {
				return res.status(400).json({ message: 'No group found for provided group ID' });
			}

			if (!grp.members.includes(req.id)) {
				return res.status(400).json({ message: 'You are not a member of this group' });
			}

			messages = await Message.find({
				group
			})
				.skip(skip)
				.limit(limit)
				.sort({ createdAt: 1 })
				.populate('sender', [
					'username',
					'fullName'
				])
				.populate('receiver', [
					'username',
					'fullName'
				])
				.populate('group', [
					'name'
				]);
		}
		else if (receiver) {
			if (!isValidObjectId(receiver)) {
				return res.status(400).json({ message: 'Please provide valid objectId of other user' });
			}
			messages = await Message.find({
				$or:
					[
						{ sender, receiver },
						{ sender: receiver, receiver: sender }
					]
			})
				.skip(skip)
				.limit(limit)
				.sort({ createdAt: 1 })
				.populate('sender', [
					'username',
					'fullName'
				])
				.populate('receiver', [
					'username',
					'fullName'
				])
				.populate('group', [
					'name'
				]);
		}

		res.json(messages);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};
