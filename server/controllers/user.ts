import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import { validateRegister } from '../validation/validateRegister';
import { validateLogin } from '../validation/validateLogin';
import mongoose from 'mongoose';
import { validateEditUser } from '../validation/validateEditUser';

export const register = async (req: Request, res: Response) => {
	try {
		const { username, email, password, fullName, location, height, weight, targetWeight } = req.body;
		const message = await validateRegister(req.body);
		if (message) {
			return res.status(400).json({ message });
		}
		const user = new User({ email, password, username, fullName, location, height, weight, targetWeight });
		await user.save();
		const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET as any, { expiresIn: '7d' });
		return res.status(201).json({ user, token });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		let message;
		message = validateLogin(username, password);
		if (message) {
			return res.status(400).json({ message });
		}
		const user: any = await User.findOne({ username });
		if (!user) {
			message = 'No user found with this username!';
			return res.status(400).json({ message });
		}
		if (!await user.matchPassword(password)) {
			message = 'Invalid credentials , try again !';
			return res.status(400).json({ message });
		}
		const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET as any, { expiresIn: '7d' });
		return res.status(200).json({ user, token });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const makeConnectionRequest = async (req: any, res: Response) => {
	try {
		const userId = req.id;
		const connectionId = req.params.connectionId;

		if (userId === connectionId) {
			res.status(400).json({ message: 'Provide valid connectionId !' });
		}

		const sender = await User.findById(userId);
		const recipient = await User.findById(connectionId);

		if (!recipient) {
			return res.status(404).json({ message: 'User not found !' });
		}

		const userConnections = sender!.connections;
		const recipientPendingConnections = recipient.pendingConnections;

		if (userConnections.some((connection) => connection.equals(connectionId))) {
			return res.status(409).json({ message: 'Connection already exists' });
		}

		if (recipientPendingConnections.some((connection) => connection.equals(connectionId))) {
			return res.status(409).json({ message: 'Connection request already sent' });
		}

		sender!.sentConnections.push(recipient._id);
		recipientPendingConnections.push(sender!._id);

		await sender!.save();
		await recipient.save();

		return res.status(200).json({ message: 'Connection request sent' });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const acceptConnection = async (req: any, res: Response) => {
	try {
		const userId = req.id;
		const connectionId = req.params.connectionId;

		const recipient = await User.findById(userId);
		if (!recipient) {
			return res.status(404).json({ message: 'User not found' });
		}
		const sender = await User.findById(connectionId);
		if (!sender) {
			return res.status(404).json({ message: 'Connection not found' });
		}
		if (!recipient.pendingConnections.includes(sender._id)) {
			return res.status(404).json({ message: 'Connection request not found' });
		}
		recipient.pendingConnections = recipient.pendingConnections.filter((conn: mongoose.Types.ObjectId) => {
			return conn.toString() !== sender._id.toString();
		});

		sender.sentConnections = sender.sentConnections.filter((conn: mongoose.Types.ObjectId) => {
			return conn.toString() !== recipient._id.toString();
		});

		recipient.connections.push(sender._id);
		sender.connections.push(recipient._id);

		await recipient.save();
		await sender.save();
		return res.json({ recipient });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const rejectConnection = async (req: any, res: Response) => {
	try {
		const userId = req.id;
		const connectionId = req.params.connectionId;

		const recipient = await User.findById(userId);
		if (!recipient) {
			return res.status(404).json({ message: 'User not found' });
		}
		const sender = await User.findById(connectionId);
		if (!sender) {
			return res.status(404).json({ message: 'Connection not found' });
		}
		if (!recipient.pendingConnections.includes(sender._id)) {
			return res.status(404).json({ message: 'Connection request not found' });
		}
		recipient.pendingConnections = recipient.pendingConnections.filter((conn: mongoose.Types.ObjectId) => {
			return conn.toString() !== sender._id.toString();
		});

		sender.sentConnections = sender.sentConnections.filter((conn: mongoose.Types.ObjectId) => {
			return conn.toString() !== recipient._id.toString();
		});

		await recipient.save();
		await sender.save();
		return res.json({ message: 'Connection request rejected' });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const getConnections = async (req: any, res: Response) => {
	try {
		const userId = req.id;
		const user = await User.findById(userId).populate({ path: 'connections', select: '-password' });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		return res.json({ connections: user.connections });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const getPendingConnections = async (req: any, res: Response) => {
	try {
		const userId = req.id;
		const user = await User.findById(userId).populate({
			path: 'pendingConnections',
			select: '-password'
		});
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		return res.json({ pendingConnections: user.pendingConnections });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const getSentConnections = async (req: any, res: Response) => {
	try {
		const userId = req.id;
		const user = await User.findById(userId).populate({
			path: 'sentConnections',
			select: '-password'
		});

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const sentConnections = user.sentConnections;

		return res.json({ sentConnections });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const getMutualConnections = async (req: any, res: Response) => {
	try {
		const userId = req.id;
		const otherUserId = req.params.otherUserId;

		const currentUser = await User.findById(userId).select('connections');
		if (!currentUser) {
			return res.status(404).json({ message: 'Current user not found' });
		}
		const otherUser = await User.findById(otherUserId).select('connections');
		if (!otherUser) {
			return res.status(404).json({ message: 'Other user not found' });
		}

		const mutualConnections = currentUser.connections.filter((conn: mongoose.Types.ObjectId) => {
			return otherUser.connections.includes(conn);
		});

		const mutualConnectionsUsers = await User.find({
			_id: { $in: mutualConnections }
		}).select('-password');

		return res.json({ mutualConnections: mutualConnectionsUsers });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const removeConnection = async (req: any, res: Response) => {
	try {
		const userId = req.id;
		const otherUserId = req.params.otherUserId;

		const currentUser = await User.findById(userId);
		if (!currentUser) {
			return res.status(404).json({ message: 'Current user not found' });
		}
		const otherUser = await User.findById(otherUserId);
		if (!otherUser) {
			return res.status(404).json({ message: 'Other user not found' });
		}

		currentUser.connections = currentUser.connections.filter((conn) => {
			return otherUser._id.toString() !== conn.toString();
		});

		otherUser.connections = otherUser.connections.filter((conn) => {
			return currentUser._id.toString() !== conn.toString();
		});

		await currentUser.save();
		await otherUser.save();

		return res.json({ message: 'Connection removed successfully!' });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const searchUser = async (req: any, res: Response) => {
	try {
		const searchTerm = req.params.searchTerm;

		const users = await User.find({
			$or:
				[
					{ fullName: { $regex: searchTerm, $options: 'i' } },
					{ username: { $regex: searchTerm, $options: 'i' } },
					{ email: { $regex: searchTerm, $options: 'i' } }
				]
		});
		res.json(users);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const editProfileImage = async (req: any, res: Response) => {
	try {
		const userId = req.id;
		const image =
			req.file ? req.file.path :
			undefined;
		if (!image) {
			return res.status(404).json({ message: 'Please upload a valid file for profile picture!' });
		}
		await User.findByIdAndUpdate(userId, { profileImg: image }, { new: true });
		return res.json({ profileImg: image });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const editCoverImage = async (req: any, res: Response) => {
	try {
		const userId = req.id;
		const image =
			req.file ? req.file.path :
			undefined;
		if (!image) {
			return res.status(404).json({ message: 'Please upload a valid file for cover image!' });
		}
		await User.findByIdAndUpdate(userId, { coverImg: image }, { new: true });
		return res.json({ coverImg: image });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const editUser = async (req: any, res: Response) => {
	try {
		const message = await validateEditUser(req.body);
		if (message) {
			return res.status(400).json({ message });
		}

		const fieldsToUpdate: any = {};
		if (req.body.email) fieldsToUpdate.email = req.body.email;
		if (req.body.fullName) fieldsToUpdate.fullName = req.body.fullName;
		if (req.body.location) fieldsToUpdate.location = req.body.location;
		if (req.body.height) fieldsToUpdate.height = req.body.height;
		if (req.body.weight) fieldsToUpdate.weight = req.body.weight;
		if (req.body.targetWeight) fieldsToUpdate.targetWeight = req.body.targetWeight;
		if (req.body.username) fieldsToUpdate.username = req.body.username;

		const user = await User.findById(req.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		Object.assign(user, fieldsToUpdate);
		await user.save();
		return res.status(200).json({ user });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};
