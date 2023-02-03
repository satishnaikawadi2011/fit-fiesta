import { validateEventData } from './../validation/validateEventData';
import { Request, Response } from 'express';
import Event, { IEvent } from '../models/Event';

export const addEvent = async (req: any, res: Response) => {
	try {
		const { date, name, group, location, description } = req.body;
		const message = await validateEventData(req.body);
		if (message) {
			return res.status(400).json({ message });
		}
		const image =
			req.file ? req.file.path :
			undefined;
		let g = undefined;
		if (group != '') g = group;
		const event = new Event({ name, location, image, user: req.id, group: g, description, date });
		await event.save();
		return res.status(201).json({ event });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const searchEvent = async (req: any, res: Response) => {
	try {
		const page = req.query.page || 1;
		const limit = req.query.limit || 10;
		const skip = (page - 1) * limit;
		const searchQuery = req.params.query;
		const events = await Event.find({
			$or:
				[
					{ name: { $regex: searchQuery, $options: 'i' } },
					{ description: { $regex: searchQuery, $options: 'i' } },
					{ location: { $regex: searchQuery, $options: 'i' } }
				]
		})
			.skip(skip)
			.limit(limit)
			.sort({ date: 1 })
			.populate('user', [
				'fullName',
				'username'
			]);
		res.json(events);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const getEvents = async (req: any, res: Response) => {
	try {
		const page = req.query.page || 1;
		const limit = req.query.limit || 10;
		const skip = (page - 1) * limit;
		const events = await Event.find({ date: { $gte: new Date() } })
			.skip(skip)
			.limit(limit)
			.sort({ date: 1 })
			.populate('user', [
				'fullName',
				'username'
			]);
		res.json(events);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};
