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
		const image = req.file.path;
		const event = new Event({ name, location, image, user: req.id, group, description, date });
		await event.save();
		return res.status(201).json({ event });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};
