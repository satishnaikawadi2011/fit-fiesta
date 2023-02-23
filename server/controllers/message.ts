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

		const message = new Message({
			content,
			receiver,
			sender,
			group,
			readBy:
				[
					sender
				]
		});
		await message.save();

		const senderUser = await User.findById(sender);

		let responseMessage = {};
		Object.assign(responseMessage, (message as any)._doc);
		Object.assign(responseMessage, {
			sender:
				{
					_id: senderUser!._id,
					username: senderUser!.username,
					fullName: senderUser!.fullName,
					profileImg: senderUser!.profileImg
				}
		});

		io.emit('message', responseMessage);

		if (receiver) {
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

		return res.status(201).json({ message: responseMessage });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const getMessages = async (req: any, res: Response) => {
	try {
		const contactId = req.params.contactId;
		const userId = req.id;
		// const page = req.query.page || 1;
		// const limit = req.query.limit || 10;
		// const skip = (page - 1) * limit;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({ message: 'User not found' });
		}

		if (!isValidObjectId(contactId)) {
			return res.status(400).json({ message: 'Please provide valid contactId' });
		}

		let messages: IMessage[] = [];
		if (user.groups.includes(contactId)) {
			const grp = await Group.findById(contactId);
			if (!grp) {
				return res.status(400).json({ message: 'No group found for provided ID' });
			}

			if (!grp.members.includes(req.id)) {
				return res.status(400).json({ message: 'You are not a member of this group' });
			}

			messages = await Message.find({
				group: contactId
			})
				// .skip(skip)
				// .limit(limit)
				.sort({ createdAt: -1 })
				.populate('sender', [
					'username',
					'fullName',
					'profileImg'
				]);
		}
		else if (user.connections.includes(contactId)) {
			messages = await Message.find({
				$or:
					[
						{ sender: userId, receiver: contactId },
						{ sender: contactId, receiver: userId }
					]
			})
				// .skip(skip)
				// .limit(limit)
				.sort({ createdAt: -1 })
				.populate('sender', [
					'username',
					'fullName',
					'profileImg'
				]);
		}

		res.json(messages);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const markAllMsgsOfContactAsRead = async (req: any, res: Response) => {
	try {
		const contactId = req.params.contactId;
		const userId = req.id;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({ message: 'User not found' });
		}

		if (!isValidObjectId(contactId)) {
			return res.status(400).json({ message: 'Please provide valid contactId' });
		}

		let messages: IMessage[] = [];
		if (user.groups.includes(contactId)) {
			await Message.updateMany(
				{
					group: contactId,
					readBy:
						{
							$nin:
								[
									userId
								]
						}
				},
				{ $push: { readBy: userId } }
			);
		}
		else if (user.connections.includes(contactId)) {
			await Message.updateMany(
				{
					sender: contactId,
					receiver: userId,
					readBy:
						{
							$nin:
								[
									userId
								]
						}
				},
				{ $push: { readBy: userId } }
			);
		}

		res.json(messages);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};
