import { isValidObjectId } from './../utils/isValidId';
import { io } from './../app';
import { Response } from 'express';
import Message, { IMessage } from '../models/Message';
import { validateMessageData } from '../validation/validateMessageData';
import Group from '../models/Group';
import User from '../models/User';

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

		if (receiver) {
			const senderUser = await User.findById(sender);
			const latMsgIdx1 = senderUser!.latestMessages.findIndex((lm) => lm.connection.toString() === receiver);
			if (latMsgIdx1 !== -1) {
				senderUser!.latestMessages[latMsgIdx1] = {
					connection: receiver,
					message: message._id
				};
			}
			else {
				senderUser!.latestMessages.push({
					connection: receiver,
					message: message._id
				});
			}

			const receiverUser = await User.findById(receiver);
			const latMsgIdx2 = receiverUser!.latestMessages.findIndex((lm) => lm.connection.toString() === sender);
			if (latMsgIdx2 !== -1) {
				receiverUser!.latestMessages[latMsgIdx2] = {
					connection: sender,
					message: message._id
				};
			}
			else {
				receiverUser!.latestMessages.push({
					connection: sender,
					message: message._id
				});
			}

			await senderUser!.save();
			await receiverUser!.save();
		}

		if (group) {
			const grp = await Group.findById(group);
			grp!.latestMessage = message._id;
			await grp!.save();
		}

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
