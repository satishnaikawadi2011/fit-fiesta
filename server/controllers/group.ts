import { Request, Response } from 'express';
import Group from '../models/Group';
import User from '../models/User';
import { validateGroupData } from './../validation/validateGroupData';

export const createGroup = async (req: any, res: Response) => {
	try {
		const { name, image, description } = req.body;
		const message = await validateGroupData(req.body);
		if (message) {
			return res.status(400).json({ message });
		}

		const currentUser = await User.findById(req.id);

		if (!currentUser) {
			return res.status(404).json({ message: 'User not found' });
		}

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
