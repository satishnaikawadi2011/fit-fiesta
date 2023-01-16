import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import { validateRegister } from '../validation/validateRegister';
import { validateLogin } from '../validation/validateLogin';
import mongoose from 'mongoose';

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

		const user = await User.findById(userId);
		const connectUser = await User.findById(connectionId);

		if (!connectUser) {
			return res.status(404).json({ message: 'User not found !' });
		}

		const userPendingConnections = user!.pendingConnections;
		const userConnections = user!.connections;

		if (userConnections.some((connection) => connection.equals(connectionId))) {
			return res.status(409).json({ message: 'Connection already exists' });
		}

		if (userPendingConnections.some((connection) => connection.equals(connectionId))) {
			return res.status(409).json({ message: 'Connection request already sent' });
		}

		userPendingConnections.push(connectionId);
		await user!.save();
		await connectUser.save();

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

		const currentUser = await User.findById(userId);
		if (!currentUser) {
			return res.status(404).json({ message: 'User not found' });
		}
		const connection = await User.findById(connectionId);
		if (!connection) {
			return res.status(404).json({ message: 'Connection not found' });
		}
		if (!currentUser.pendingConnections.includes(connection._id)) {
			return res.status(404).json({ message: 'Connection request not found' });
		}
		currentUser.pendingConnections = currentUser.pendingConnections.filter((conn: mongoose.Types.ObjectId) => {
			return conn.toString() !== connection._id.toString();
		});
		currentUser.connections.push(connection._id);
		connection.connections.push(currentUser._id);
		await currentUser.save();
		await connection.save();
		return res.json({ currentUser });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};
