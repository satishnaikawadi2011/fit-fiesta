import { getNotificationMessage, NotificationType } from './../models/Notification';
import { Response } from 'express';
import Group from '../models/Group';
import User from '../models/User';
import Notification from '../models/Notification';
import { validateGroupData } from './../validation/validateGroupData';
import mongoose from 'mongoose';

export const createGroup = async (req: any, res: Response) => {
	try {
		const { name, description } = req.body;
		const message = await validateGroupData(req.body);
		if (message) {
			return res.status(400).json({ message });
		}

		const currentUser = await User.findById(req.id);

		if (!currentUser) {
			return res.status(404).json({ message: 'User not found' });
		}

		const image =
			req.file ? req.file.path :
			undefined;
		const group = await new Group({
			name,
			description,
			profileImg: image,
			members:
				[
					req.id
				],
			admin: req.id
		});
		currentUser.groups.push(group._id);
		await group.save();
		await currentUser.save();
		return res.status(201).json({ group });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const makeJoinRequest = async (req: any, res: Response) => {
	try {
		const userId = req.id;
		const groupId = req.params.groupId;

		const group = await Group.findById(groupId);
		if (!group) {
			return res.status(404).json({ message: 'Group not found' });
		}

		const sender = (await User.findById(userId))!;
		const admin = await User.findById(group.admin)!;

		const senderGroups = sender.groups;
		const adminReceivedRequests = admin!.receivedGroupJoinRequests;

		if (senderGroups.some((g: any) => g.equals(groupId))) {
			return res.status(409).json({ message: 'User is already a member of group' });
		}

		if (adminReceivedRequests.some((r) => r.requestingUser.equals(userId) && r.group.equals(groupId))) {
			return res.status(409).json({ message: 'Join request already sent' });
		}

		sender!.sentGroupJoinRequests.push(group._id);
		adminReceivedRequests.push({ group: group._id, requestingUser: sender!._id });

		await sender!.save();
		await admin!.save();

		const type: NotificationType = 'join_group_request_made';
		const message = getNotificationMessage(type, sender as any, group as any);
		const notification = new Notification({
			recipients:
				[
					admin!._id
				],
			image: sender!.profileImg,
			type,
			message
		});
		await notification.save();

		return res.status(200).json({ message: 'Join request sent' });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const acceptJoinRequest = async (req: any, res: Response) => {
	try {
		const userId = req.id;
		const senderId = req.params.senderId;
		const groupId = req.params.groupId;

		const group = await Group.findById(groupId);
		if (!group) {
			return res.status(404).json({ message: 'Group not found' });
		}

		const adminId = group!.admin;

		if (userId !== adminId!.toString()) {
			return res.status(401).json({ message: 'You are not a admin of this group ' });
		}

		const admin = await User.findById(adminId);
		if (!admin) {
			return res.status(404).json({ message: 'Admin not found' });
		}

		const sender = await User.findById(senderId);
		if (!sender) {
			return res.status(404).json({ message: 'Sender not found' });
		}

		const idx = admin.receivedGroupJoinRequests.findIndex(
			(r) => r.group.equals(groupId) && r.requestingUser.equals(senderId)
		);
		if (idx === -1) {
			return res.status(404).json({ message: 'Join request not found' });
		}

		admin.receivedGroupJoinRequests = admin.receivedGroupJoinRequests.filter((r) => {
			return !r.group.equals(groupId) || !r.requestingUser.equals(senderId);
		});

		sender.sentGroupJoinRequests = sender.sentGroupJoinRequests.filter((r) => {
			return r.toString() !== group._id.toString();
		});

		group.members.push(sender._id);
		sender.groups.push(group._id);

		await group.save();
		await sender.save();
		await admin.save();

		const type: NotificationType = 'join_group_request_accepted';
		const message = getNotificationMessage(type, undefined, group as any);
		const notification = new Notification({
			recipients:
				[
					sender._id
				],
			image: group!.profileImg,
			type,
			message
		});
		await notification.save();

		return res.json({ message: 'Join request accepted successfully' });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const rejectJoinRequest = async (req: any, res: Response) => {
	try {
		const userId = req.id;
		const senderId = req.params.senderId;
		const groupId = req.params.groupId;

		const group = await Group.findById(groupId);
		if (!group) {
			return res.status(404).json({ message: 'Group not found' });
		}

		const adminId = group!.admin;

		if (userId !== adminId!.toString()) {
			return res.status(401).json({ message: 'You are not a admin of this group ' });
		}

		const admin = await User.findById(adminId);
		if (!admin) {
			return res.status(404).json({ message: 'Admin not found' });
		}

		const sender = await User.findById(senderId);
		if (!sender) {
			return res.status(404).json({ message: 'Sender not found' });
		}

		const idx = admin.receivedGroupJoinRequests.findIndex(
			(r) => r.group.equals(groupId) && r.requestingUser.equals(senderId)
		);
		if (idx === -1) {
			return res.status(404).json({ message: 'Join request not found' });
		}

		admin.receivedGroupJoinRequests = admin.receivedGroupJoinRequests.filter((r) => {
			return !r.group.equals(groupId) || !r.requestingUser.equals(senderId);
		});

		sender.sentGroupJoinRequests = sender.sentGroupJoinRequests.filter((r) => {
			return r.toString() !== group._id.toString();
		});

		await admin.save();
		await sender.save();

		const type: NotificationType = 'join_group_request_rejected';
		const message = getNotificationMessage(type, undefined, group as any);
		const notification = new Notification({
			recipients:
				[
					sender._id
				],
			image: group!.profileImg,
			type,
			message
		});
		await notification.save();

		return res.json({ message: 'Join request rejected' });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const withdrawSentJoinGroupRequest = async (req: any, res: Response) => {
	try {
		const userId = req.id;
		const groupId = req.params.groupId;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const group = await Group.findById(groupId);
		if (!group) {
			return res.status(404).json({ message: 'Group not found' });
		}

		const adminId = group!.admin;
		const admin = await User.findById(adminId);
		if (!admin) {
			return res.status(404).json({ message: 'Admin not found' });
		}

		user.sentGroupJoinRequests = user.sentGroupJoinRequests.filter((r) => {
			return group._id.toString() !== r.toString();
		});

		admin.receivedGroupJoinRequests = admin.receivedGroupJoinRequests.filter((r) => {
			return !r.group.equals(groupId) || !r.requestingUser.equals(userId);
		});

		await user.save();
		await admin.save();

		const type: NotificationType = 'join_group_request_withdrawn';
		const message = getNotificationMessage(type, user as any, group as any);
		const notification = new Notification({
			recipients:
				[
					admin._id
				],
			image: user!.profileImg,
			type,
			message
		});
		await notification.save();

		return res.json({ message: 'Join request withdrawn successfully!' });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const searchGroup = async (req: any, res: Response) => {
	try {
		const searchQuery = req.params.query;
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;

		const groups = await Group.aggregate([
			{
				$lookup:
					{
						from: 'users',
						localField: 'admin',
						foreignField: '_id',
						as: 'adminDoc'
					}
			},
			{
				$match:
					{
						$or:
							[
								{ name: { $regex: searchQuery, $options: 'i' } },
								{ description: { $regex: searchQuery, $options: 'i' } },
								{ 'adminDoc.fullName': { $regex: searchQuery, $options: 'i' } },
								{ 'adminDoc.username': { $regex: searchQuery, $options: 'i' } }
							]
					}
			},
			{
				$skip: skip
			},
			{
				$limit: limit
			},
			{
				$sort:
					{
						createdAt: -1
					}
			}
		]);

		const transformedGroups = groups.map((g) => {
			const group = {
				...g,
				admin: g.adminDoc[0]
			};

			delete group.adminDoc;
			return group;
		});

		res.json(transformedGroups);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const getConnectionsFromGroup = async (req: any, res: Response) => {
	try {
		const userId = req.id;
		const groupId = req.params.groupId;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const group = await Group.findById(groupId);
		if (!group) {
			return res.status(404).json({ message: 'Group not found' });
		}

		const connections = await User.find({
			_id: { $in: user.connections },
			groups:
				{
					$in:
						[
							group._id
						]
				}
		});

		return res.status(200).json(connections);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};
