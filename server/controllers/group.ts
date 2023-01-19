import { Request, Response } from 'express';
import Group from '../models/Group';
import User from '../models/User';
import { validateGroupData } from './../validation/validateGroupData';

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

		const image = req.file.path;

		const group = await new Group({
			name,
			description,
			image,
			members:
				[
					req.id
				]
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

export const joinGroup = async (req: any, res: Response) => {
	try {
		const userId = req.id;
		const groupId = req.params.groupId;
		const currentUser = await User.findById(userId);
		if (!currentUser) {
			return res.status(404).json({ message: 'User not found' });
		}
		const group = await Group.findById(groupId);
		if (!group) {
			return res.status(404).json({ message: 'Group not found' });
		}
		if (group.members.includes(currentUser._id)) {
			return res.status(409).json({ message: 'User already a member of this group' });
		}
		group.members.push(currentUser._id);
		currentUser.groups.push(group._id);
		await group.save();
		await currentUser.save();
		return res.json({ group });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};
