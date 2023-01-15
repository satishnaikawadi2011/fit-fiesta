import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import { validateRegister } from '../utils/validateRegister';

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
