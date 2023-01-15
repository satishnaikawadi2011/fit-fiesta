import jwt from 'jsonwebtoken';
import express from 'express';

import User from '../models/User';

export const isAuthenticated = async function(req: any, res: express.Response, next: express.NextFunction) {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];

			const decoded: any = await jwt.verify(token, process.env.JWT_SECRET as any);

			req.user = await User.findById(decoded.id).select('-password');

			next();
		} catch (err) {
			res.status(401);
			const error = new Error('Invalid token!');
			next(error);
		}
	}
	else {
		res.status(401);
		const error = new Error('Not authenticated or No token provided!');
		next(error);
	}
};
